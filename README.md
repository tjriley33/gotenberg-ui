# gotenberg-ui

A small web front end for [Gotenberg](https://gotenberg.dev) — lets you use its document-conversion
API by hand from a browser instead of only via scripts/automation.

Backend is a thin FastAPI proxy (`app/main.py`) that turns browser form uploads into the
`multipart/form-data` requests Gotenberg expects, and streams the resulting file straight back.
Frontend is a single static page (`app/static/index.html`, vanilla HTML/CSS/JS, no build step).

## Features

- **Convert to PDF** — Markdown, HTML, or any LibreOffice-readable office format (docx, xlsx,
  pptx, odt, rtf, csv, …) → PDF.
- **Merge PDFs** — combine multiple PDFs in upload order.
- **Split a PDF** — by fixed page intervals, or by specific page ranges.
- **Convert to PDF/A or PDF/UA** — archival/accessibility conversion.
- **Watermark a PDF** — repeating text watermark with adjustable opacity/rotation.

There is intentionally no PDF → text/Markdown extraction here — Gotenberg has no route for that;
a separate tool handles that use case.

## Running

This expects a Gotenberg 8 instance reachable at `GOTENBERG_URL` (default
`http://gotenberg:3000`, i.e. a sibling container on the same Docker network).

```bash
docker compose up -d --build
```

See `compose.yaml` — it joins the external `gotenberg_default` network so it can reach the
`gotenberg` container by name, and publishes the UI on `3003` (Gotenberg itself already owns
`3002` on the host).

No authentication is built into this app. It's meant to sit behind an access-gated reverse proxy
(e.g. Cloudflare Access) — don't expose it directly to the internet.

## API

All endpoints accept `multipart/form-data` and return the converted/merged/split file directly.

| Endpoint | Fields |
|---|---|
| `POST /api/convert` | `file` |
| `POST /api/merge` | `files` (repeated, 2+) |
| `POST /api/split` | `file`, `splitMode` (`intervals`\|`pages`), `splitSpan`, `splitUnify` |
| `POST /api/pdfa` | `file`, `pdfa` (e.g. `PDF/A-2b`), `pdfua` (bool) |
| `POST /api/watermark` | `file`, `text`, `opacity`, `rotation` |
| `GET /api/health` | — |
