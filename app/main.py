"""
gotenberg-ui backend

A tiny FastAPI proxy that turns Gotenberg's multipart PDF-conversion API into
something a human can use from a browser. No auth here -- Cloudflare Access
sits in front of this in production.
"""
import os
import re
from pathlib import Path
from typing import Optional

import httpx
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles

GOTENBERG_URL = os.environ.get("GOTENBERG_URL", "http://gotenberg:3000").rstrip("/")

STATIC_DIR = Path(__file__).parent / "static"

app = FastAPI(title="gotenberg-ui")

# Office / LibreOffice-convertible extensions we recognize explicitly (LibreOffice
# actually supports ~100+ formats; this list is just used to route .md/.html
# specially -- everything else falls through to the LibreOffice route).
_MARKDOWN_EXTS = {".md", ".markdown"}
_HTML_EXTS = {".html", ".htm"}

_MD_TEMPLATE = """<!doctype html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 800px; margin: 2.5em auto; line-height: 1.5; color: #1a1a1a; }
pre, code { background: #f3f3f3; border-radius: 4px; padding: 0.15em 0.4em; }
pre code { display: block; padding: 0.8em; overflow-x: auto; }
table { border-collapse: collapse; }
td, th { border: 1px solid #ccc; padding: 0.4em 0.8em; }
blockquote { border-left: 3px solid #ccc; margin-left: 0; padding-left: 1em; color: #555; }
img { max-width: 100%; }
</style></head>
<body>
{{ toHTML "input.md" }}
</body>
</html>
"""


def _safe_name(name: Optional[str], fallback: str) -> str:
    name = (name or fallback).strip().replace("/", "_").replace("\\", "_")
    return name or fallback


async def _proxy(path: str, files: list[tuple[str, tuple[str, bytes, str]]], data: dict | None = None) -> Response:
    """POST a multipart request to Gotenberg and relay the response back."""
    url = f"{GOTENBERG_URL}{path}"
    try:
        async with httpx.AsyncClient(timeout=180) as client:
            resp = await client.post(url, files=files, data=data or {})
    except httpx.ConnectError as exc:
        raise HTTPException(status_code=502, detail=f"Could not reach Gotenberg at {GOTENBERG_URL}: {exc}")
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Gotenberg timed out processing the request")

    if resp.status_code >= 400:
        # Gotenberg's error bodies are plain text and genuinely useful -- surface them.
        detail = resp.text.strip() or f"Gotenberg returned HTTP {resp.status_code}"
        raise HTTPException(status_code=422, detail=detail)

    headers = {}
    content_type = resp.headers.get("content-type", "application/octet-stream")
    disposition = resp.headers.get("content-disposition")
    if disposition:
        headers["content-disposition"] = disposition
    return Response(content=resp.content, media_type=content_type, headers=headers)


@app.get("/", response_class=HTMLResponse)
async def index() -> HTMLResponse:
    return HTMLResponse((STATIC_DIR / "index.html").read_text())


@app.get("/api/health")
async def health():
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.get(f"{GOTENBERG_URL}/health")
        return {"ui": "ok", "gotenberg": resp.json() if resp.status_code == 200 else resp.status_code}
    except Exception as exc:  # noqa: BLE001
        return {"ui": "ok", "gotenberg": f"unreachable: {exc}"}


# ---------------------------------------------------------------------------
# Convert to PDF (office docs via LibreOffice, or Markdown/HTML via Chromium)
# ---------------------------------------------------------------------------
@app.post("/api/convert")
async def convert(file: UploadFile = File(...)):
    name = _safe_name(file.filename, "document")
    ext = Path(name).suffix.lower()
    body = await file.read()

    if ext in _MARKDOWN_EXTS:
        files = [
            ("files", ("index.html", _MD_TEMPLATE.encode(), "text/html")),
            ("files", ("input.md", body, "text/markdown")),
        ]
        return await _proxy("/forms/chromium/convert/markdown", files)

    if ext in _HTML_EXTS:
        files = [("files", ("index.html", body, "text/html"))]
        return await _proxy("/forms/chromium/convert/html", files)

    # Everything else goes through LibreOffice (docx, xlsx, pptx, odt, rtf, csv, ...)
    files = [("files", (name, body, file.content_type or "application/octet-stream"))]
    return await _proxy("/forms/libreoffice/convert", files)


# ---------------------------------------------------------------------------
# Merge PDFs
# ---------------------------------------------------------------------------
@app.post("/api/merge")
async def merge(files: list[UploadFile] = File(...)):
    if len(files) < 2:
        raise HTTPException(status_code=400, detail="Upload at least two PDFs to merge")

    # Gotenberg merges files in alphabetical filename order, so prefix with a
    # zero-padded index to preserve the order the user uploaded them in.
    parts = []
    for i, f in enumerate(files):
        name = _safe_name(f.filename, f"file{i}.pdf")
        body = await f.read()
        parts.append(("files", (f"{i:03d}_{name}", body, "application/pdf")))

    return await _proxy("/forms/pdfengines/merge", parts)


# ---------------------------------------------------------------------------
# Split a PDF
# ---------------------------------------------------------------------------
@app.post("/api/split")
async def split(
    file: UploadFile = File(...),
    splitMode: str = Form(...),      # "intervals" | "pages"
    splitSpan: str = Form(...),      # e.g. "1" (every page) or "1-3,5"
    splitUnify: bool = Form(False),
):
    if splitMode not in ("intervals", "pages"):
        raise HTTPException(status_code=400, detail="splitMode must be 'intervals' or 'pages'")

    name = _safe_name(file.filename, "input.pdf")
    body = await file.read()
    files = [("files", (name, body, "application/pdf"))]
    data = {
        "splitMode": splitMode,
        "splitSpan": splitSpan,
        "splitUnify": "true" if splitUnify else "false",
    }
    return await _proxy("/forms/pdfengines/split", files, data)


# ---------------------------------------------------------------------------
# Bonus: convert a PDF to PDF/A or PDF/UA
# ---------------------------------------------------------------------------
@app.post("/api/pdfa")
async def pdfa(
    file: UploadFile = File(...),
    pdfa: str = Form(""),          # e.g. "PDF/A-2b"; empty to skip
    pdfua: bool = Form(False),
):
    if not pdfa and not pdfua:
        raise HTTPException(status_code=400, detail="Choose a PDF/A level and/or enable PDF/UA")

    name = _safe_name(file.filename, "input.pdf")
    body = await file.read()
    files = [("files", (name, body, "application/pdf"))]
    data = {}
    if pdfa:
        data["pdfa"] = pdfa
    if pdfua:
        data["pdfua"] = "true"
    return await _proxy("/forms/pdfengines/convert", files, data)


# ---------------------------------------------------------------------------
# Bonus: text watermark
# ---------------------------------------------------------------------------
@app.post("/api/watermark")
async def watermark(
    file: UploadFile = File(...),
    text: str = Form(...),
    opacity: float = Form(0.25),
    rotation: int = Form(45),
):
    name = _safe_name(file.filename, "input.pdf")
    body = await file.read()
    files = [("files", (name, body, "application/pdf"))]
    data = {
        "watermarkSource": "text",
        "watermarkExpression": text,
        "watermarkOptions": f'{{"opacity":{opacity},"rotation":{rotation}}}',
    }
    return await _proxy("/forms/pdfengines/watermark", files, data)


app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
