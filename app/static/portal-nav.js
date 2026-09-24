(function () {
  "use strict";

  var APPS = [{"id":"home-assistant","title":"Home Assistant","url":"https://ha.taylor-riley.com","icon":"house","accent":"#38bdf8"},{"id":"frigate","title":"Frigate","url":"https://frigate.taylor-riley.com","icon":"cctv","accent":"#34d399"},{"id":"notes","title":"Notes","url":"https://notes.taylor-riley.com","icon":"notebook-pen","accent":"#c084fc"},{"id":"brief","title":"Brief","url":"https://brief.taylor-riley.com","icon":"sunrise","accent":"#fbbf24"},{"id":"news","title":"News","url":"https://home.taylor-riley.com/news","icon":"newspaper","accent":"#f472b6"},{"id":"rec-room","title":"Rec Room","url":"https://steno.taylor-riley.com","icon":"mic","accent":"#f59e0b"},{"id":"uptime-kuma","title":"Uptime Kuma","url":"https://uptime.taylor-riley.com","icon":"activity","accent":"#4ade80"},{"id":"glances","title":"Glances","url":"https://glances.taylor-riley.com","icon":"gauge","accent":"#22d3ee"},{"id":"grafana","title":"Grafana","url":"https://grafana.taylor-riley.com","icon":"chart-line","accent":"#fb923c"},{"id":"orangutan","title":"LAN Orangutan","url":"https://orangutan.taylor-riley.com","icon":"radar","accent":"#d97706"},{"id":"paperless","title":"Paperless","url":"https://paperless.taylor-riley.com","icon":"file-text","accent":"#a3e635"},{"id":"folio","title":"Folio","url":"https://docling.taylor-riley.com","icon":"file-input","accent":"#7dd3a8"},{"id":"darkroom","title":"Darkroom","url":"https://darkroom.taylor-riley.com","icon":"image","accent":"#e879f9"},{"id":"comfyui","title":"ComfyUI","url":"https://comfy.taylor-riley.com","icon":"palette","accent":"#d946ef"},{"id":"personal-db","title":"Personal DB","url":"https://db.taylor-riley.com","icon":"database","accent":"#e11d48"},{"id":"actual-budget","title":"Actual Budget","url":"https://budget.taylor-riley.com","icon":"wallet","accent":"#10b981"},{"id":"portainer","title":"Portainer","url":"https://portainer.taylor-riley.com","icon":"container","accent":"#60a5fa"},{"id":"n8n","title":"n8n","url":"https://n8n.taylor-riley.com","icon":"workflow","accent":"#ea4b71"},{"id":"newsgator","title":"NewsGator","url":"https://news.taylor-riley.com","icon":"rss","accent":"#fb7185"},{"id":"dockge","title":"Dockge","url":"https://dockge.taylor-riley.com","icon":"layers","accent":"#818cf8"},{"id":"adguard","title":"AdGuard","url":"https://adguard.taylor-riley.com","icon":"shield","accent":"#2dd4bf"},{"id":"spoolman","title":"Spoolman","url":"https://spoolman.taylor-riley.com","icon":"printer","accent":"#f472b6"},{"id":"spoolman-sync","title":"Spoolman Sync","url":"https://spoolman-sync.taylor-riley.com","icon":"refresh-cw","accent":"#fda4af"},{"id":"reolink","title":"Reolink","url":"https://reolink.taylor-riley.com","icon":"video","accent":"#94a3b8"},{"id":"press","title":"Press","url":"https://press.taylor-riley.com","icon":"stamp","accent":"#b23a2e"},{"id":"diff","title":"Diff","url":"https://diff.taylor-riley.com","icon":"file-diff","accent":"#38bdf8"}];
  var ICONS = {"house":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />","cctv":"<path d=\"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97\" /> <path d=\"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z\" /> <path d=\"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15\" /> <path d=\"M2 21v-4\" /> <path d=\"M7 9h.01\" />","notebook-pen":"<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /> <path d=\"M2 6h4\" /> <path d=\"M2 10h4\" /> <path d=\"M2 14h4\" /> <path d=\"M2 18h4\" /> <path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" />","sunrise":"<path d=\"M12 2v8\" /> <path d=\"m4.93 10.93 1.41 1.41\" /> <path d=\"M2 18h2\" /> <path d=\"M20 18h2\" /> <path d=\"m19.07 10.93-1.41 1.41\" /> <path d=\"M22 22H2\" /> <path d=\"m8 6 4-4 4 4\" /> <path d=\"M16 18a4 4 0 0 0-8 0\" />","newspaper":"<path d=\"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2\" /> <path d=\"M18 14h-8\" /> <path d=\"M15 18h-5\" /> <path d=\"M10 6h8v4h-8V6Z\" />","mic":"<path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\" /> <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" /> <line x1=\"12\" x2=\"12\" y1=\"19\" y2=\"22\" />","activity":"<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" />","gauge":"<path d=\"m12 14 4-4\" /> <path d=\"M3.34 19a10 10 0 1 1 17.32 0\" />","chart-line":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\" /> <path d=\"m19 9-5 5-4-4-3 3\" />","radar":"<path d=\"M19.07 4.93A10 10 0 0 0 6.99 3.34\" /> <path d=\"M4 6h.01\" /> <path d=\"M2.29 9.62A10 10 0 1 0 21.31 8.35\" /> <path d=\"M16.24 7.76A6 6 0 1 0 8.23 16.67\" /> <path d=\"M12 18h.01\" /> <path d=\"M17.99 11.66A6 6 0 0 1 15.77 16.67\" /> <circle cx=\"12\" cy=\"12\" r=\"2\" /> <path d=\"m13.41 10.59 5.66-5.66\" />","file-text":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />","file-input":"<path d=\"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M2 15h10\" /> <path d=\"m9 18 3-3-3-3\" />","image":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />","palette":"<circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" /> <circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\" /> <path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\" />","database":"<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\" /> <path d=\"M3 5V19A9 3 0 0 0 21 19V5\" /> <path d=\"M3 12A9 3 0 0 0 21 12\" />","wallet":"<path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\" /> <path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\" />","container":"<path d=\"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z\" /> <path d=\"M10 21.9V14L2.1 9.1\" /> <path d=\"m10 14 11.9-6.9\" /> <path d=\"M14 19.8v-8.1\" /> <path d=\"M18 17.5V9.4\" />","workflow":"<rect width=\"8\" height=\"8\" x=\"3\" y=\"3\" rx=\"2\" /> <path d=\"M7 11v4a2 2 0 0 0 2 2h4\" /> <rect width=\"8\" height=\"8\" x=\"13\" y=\"13\" rx=\"2\" />","rss":"<path d=\"M4 11a9 9 0 0 1 9 9\" /> <path d=\"M4 4a16 16 0 0 1 16 16\" /> <circle cx=\"5\" cy=\"19\" r=\"1\" />","layers":"<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /> <path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /> <path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />","shield":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />","printer":"<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\" /> <path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\" /> <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\" />","refresh-cw":"<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /> <path d=\"M21 3v5h-5\" /> <path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /> <path d=\"M8 16H3v5\" />","video":"<path d=\"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5\" /> <rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\" />","stamp":"<path d=\"M5 22h14\" /> <path d=\"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z\" /> <path d=\"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13\" />","file-diff":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M9 10h6\" /> <path d=\"M12 13V7\" /> <path d=\"M9 17h6\" />"};
  var HOME = { id: "home", title: "Home", url: "https://home.taylor-riley.com", icon: "house", accent: "#c084fc" };

  function iconSvg(name, size) {
    var inner = ICONS[name] || "";
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner + "</svg>";
  }

  /** Which app is this? Matched on current attribute or hostname. */
  function currentApp(self) {
    var cur = self ? (self.getAttribute("current") || "").toLowerCase().trim() : "";
    // The homepage itself: the `news` registry entry lives on the same hostname, so
    // without this the pill on home.taylor-riley.com would read "News".
    if (cur === HOME.id) return HOME;
    if (cur) {
      for (var i = 0; i < APPS.length; i++) {
        if (APPS[i].id.toLowerCase() === cur) return APPS[i];
      }
    }
    var host = location.hostname;
    for (var i = 0; i < APPS.length; i++) {
      try {
        if (new URL(APPS[i].url).hostname === host) return APPS[i];
      } catch (e) { /* malformed url in the registry; skip it */ }
    }
    return null;
  }

  var CSS = [
    ":host{all:initial;position:fixed;top:max(12px,env(safe-area-inset-top));",
    "left:max(12px,env(safe-area-inset-left));z-index:2147483000;",
    "font-family:'Schibsted Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;",
    "font-size:13px;line-height:1.4;-webkit-font-smoothing:antialiased;}",
    "*{box-sizing:border-box;margin:0;padding:0;}",
    ".pill{display:flex;align-items:center;gap:7px;height:34px;padding:0 11px;",
    "border-radius:999px;border:1px solid rgba(169,174,200,.22);",
    "background:rgba(16,19,33,.72);-webkit-backdrop-filter:blur(14px);",
    "backdrop-filter:blur(14px);color:#eef0fa;cursor:pointer;",
    "box-shadow:0 8px 24px -12px rgba(0,0,0,.8);transition:background .15s ease,border-color .15s ease;}",
    ".pill:hover{background:rgba(30,35,58,.85);border-color:rgba(169,174,200,.4);}",
    ".pill:focus-visible{outline:2px solid var(--dot);outline-offset:2px;}",
    ".pill svg{color:var(--dot);flex:none;}",
    ".pill .chev{color:#6d7394;margin-left:1px;}",
    ".name{font-weight:500;letter-spacing:.01em;white-space:nowrap;}",
    ".panel{position:absolute;top:42px;left:0;width:268px;padding:8px;",
    "border-radius:16px;border:1px solid rgba(169,174,200,.18);",
    "background:rgba(14,17,32,.94);-webkit-backdrop-filter:blur(20px);",
    "backdrop-filter:blur(20px);box-shadow:0 24px 64px -24px rgba(0,0,0,.9);",
    "max-height:min(70vh,520px);display:flex;flex-direction:column;}",
    ".filter{width:100%;height:32px;padding:0 10px;margin-bottom:6px;border-radius:9px;",
    "border:1px solid rgba(169,174,200,.16);background:rgba(23,27,46,.7);",
    "color:#eef0fa;font:inherit;outline:none;}",
    ".filter::placeholder{color:#6d7394;}",
    ".filter:focus{border-color:rgba(169,174,200,.4);}",
    ".list{overflow-y:auto;display:flex;flex-direction:column;gap:1px;}",
    "a.item{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:9px;",
    "color:#a9aec8;text-decoration:none;white-space:nowrap;}",
    "a.item:hover,a.item:focus-visible{background:rgba(46,52,84,.6);color:#eef0fa;outline:none;}",
    "a.item.active{background:rgba(255,255,255,.07);color:#eef0fa;font-weight:500;}",
    "a.item svg{color:var(--i);flex:none;}",
    ".sep{height:1px;margin:5px 2px;background:rgba(169,174,200,.14);}",
    ".empty{padding:10px;color:#6d7394;}",
    ".badge{margin-left:auto;font-size:10px;padding:1px 5px;border-radius:4px;background:rgba(255,255,255,.08);color:#94a3b8;}",
    // Light variant, used when the host page itself is light (see isLightPage).
    ":host([data-theme=light]) .pill{background:rgba(255,255,255,.78);border-color:rgba(20,24,40,.14);color:#1a1d2e;box-shadow:0 8px 24px -14px rgba(20,24,40,.35);}",
    ":host([data-theme=light]) .pill:hover{background:rgba(255,255,255,.95);border-color:rgba(20,24,40,.26);}",
    ":host([data-theme=light]) .pill .chev,:host([data-theme=light]) .empty,:host([data-theme=light]) .filter::placeholder{color:#8a8fa8;}",
    ":host([data-theme=light]) .panel{background:rgba(250,251,255,.96);border-color:rgba(20,24,40,.12);box-shadow:0 24px 64px -24px rgba(20,24,40,.4);}",
    ":host([data-theme=light]) .filter{background:rgba(236,238,246,.9);border-color:rgba(20,24,40,.12);color:#1a1d2e;}",
    ":host([data-theme=light]) .filter:focus{border-color:rgba(20,24,40,.3);}",
    ":host([data-theme=light]) a.item{color:#4a4f68;}",
    ":host([data-theme=light]) a.item:hover,:host([data-theme=light]) a.item:focus-visible{background:rgba(20,24,40,.06);color:#10131f;}",
    ":host([data-theme=light]) a.item.active{background:rgba(20,24,40,.07);color:#10131f;}",
    ":host([data-theme=light]) .sep{background:rgba(20,24,40,.1);}",
    ":host([data-theme=light]) .badge{background:rgba(20,24,40,.07);color:#64748b;}",
    "[hidden]{display:none!important;}",
    "@media (prefers-reduced-motion:reduce){.pill{transition:none;}}",
    // Phones: the page uses the full width, so there is no free margin to float
    // over -- every one of these apps puts a title or a search box at top-left.
    // Join the flow instead and push the page down by exactly the pill's height.
    // Desktop keeps the floating pill, which sits in the margin.
    "@media (max-width:720px){",
    // !important is load-bearing, not laziness: a host page's `*{padding:0}`
    // reset targets the host element from the outer document, and per spec
    // outer-document rules beat :host rules. Rec Room and Darkroom both have
    // exactly that reset, which flattened the pill against the screen edge.
    ":host{position:relative!important;display:block!important;top:auto;left:auto;",
    "padding:calc(10px + env(safe-area-inset-top)) 0 6px max(12px,env(safe-area-inset-left))!important;}",
    ".pill{position:static;}",
    ".panel{position:absolute;top:100%;left:max(12px,env(safe-area-inset-left));",
    "width:min(268px,calc(100vw - 24px));}",
    "}"
  ].join("");

  /**
   * Is the page this nav sits on light? Read from the page's own painted
   * background rather than prefers-color-scheme: Home, Notes and Brief follow
   * the OS theme, but Rec Room, Darkroom, Glances and the rest are dark-only,
   * and a light pill floating on a dark page is worse than no theming at all.
   */
  function isLightPage() {
    var els = [document.body, document.documentElement];
    for (var i = 0; i < els.length; i++) {
      if (!els[i]) continue;
      var m = getComputedStyle(els[i]).backgroundColor.match(/[\d.]+/g);
      if (!m || m.length < 3 || (m.length > 3 && +m[3] === 0)) continue;
      var lum = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
      return lum > 0.5;
    }
    return false; // nothing painted: keep the original dark look
  }

  function applyTheme(self) {
    // An explicit theme="light|dark" on the element wins over detection.
    var forced = (self.getAttribute("theme") || "").toLowerCase();
    var light = forced ? forced === "light" : isLightPage();
    self.setAttribute("data-theme", light ? "light" : "dark");
  }

  // A fine pointer means a physical keyboard is almost certainly attached.
  var WANTS_AUTOFOCUS = !!(window.matchMedia &&
    window.matchMedia("(pointer:fine)").matches);

  var CHEVRON = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" class="chev" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

  // Nothing transpiles this file and every browser that can run a Safari web
  // app supports classes, so no ES5 custom-element shim is needed.
  class PortalNav extends HTMLElement {
    connectedCallback() {
      buildInto(this);
    }
  }

  function buildInto(self) {
    if (self._built) return;
    self._built = true;

    var me = currentApp(self);
    var root = self.attachShadow({ mode: "open" });

    applyTheme(self);
    // The page repaints after the OS theme flips; re-read once it has.
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: light)");
      var again = function () { requestAnimationFrame(function () { applyTheme(self); }); };
      if (mq.addEventListener) mq.addEventListener("change", again);
      else if (mq.addListener) mq.addListener(again);
    }
    // A stylesheet injected late (Vite in dev) can paint the page after us.
    if (document.readyState !== "complete") {
      window.addEventListener("load", function () { applyTheme(self); }, { once: true });
    }

    var style = document.createElement("style");
    style.textContent = CSS;
    root.appendChild(style);

    var label = me ? me.title : HOME.title;
    var accent = me ? me.accent : HOME.accent;
    var glyph = me ? me.icon : HOME.icon;

    var pill = document.createElement("button");
    pill.className = "pill";
    pill.type = "button";
    pill.style.setProperty("--dot", accent);
    pill.setAttribute("aria-haspopup", "menu");
    pill.setAttribute("aria-expanded", "false");
    pill.setAttribute("aria-label", "Switch application. Currently " + label);
    pill.innerHTML = iconSvg(glyph, 15) +
      '<span class="name">' + label + "</span>" + CHEVRON;
    root.appendChild(pill);

    var panel = document.createElement("div");
    panel.className = "panel";
    panel.setAttribute("role", "menu");
    panel.hidden = true;
    root.appendChild(panel);

    var filter = document.createElement("input");
    filter.className = "filter";
    filter.type = "text";
    filter.placeholder = "Filter…";
    filter.setAttribute("aria-label", "Filter applications");
    filter.autocomplete = "off";
    filter.spellcheck = false;
    panel.appendChild(filter);

    var list = document.createElement("div");
    list.className = "list";
    panel.appendChild(list);

    // Home first, then a rule, then all registered apps.
    var entries = [HOME];
    for (var i = 0; i < APPS.length; i++) {
      entries.push(APPS[i]);
    }

    var links = [];
    for (var j = 0; j < entries.length; j++) {
      if (j === 1) {
        var sep = document.createElement("div");
        sep.className = "sep";
        list.appendChild(sep);
      }
      var app = entries[j];
      var isCurrent = me && app.id === me.id;
      var a = document.createElement("a");
      a.className = "item" + (isCurrent ? " active" : "");
      a.href = app.url;
      a.setAttribute("role", "menuitem");
      if (isCurrent) a.setAttribute("aria-current", "page");
      a.style.setProperty("--i", app.accent);
      var badge = isCurrent ? '<span class="badge">current</span>' : "";
      a.innerHTML = iconSvg(app.icon, 15) + "<span>" + app.title + "</span>" + badge;
      a._title = app.title.toLowerCase();
      list.appendChild(a);
      links.push(a);
    }

    var empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No matches";
    empty.hidden = true;
    list.appendChild(empty);

    function applyFilter() {
      var q = filter.value.trim().toLowerCase();
      var shown = 0;
      for (var k = 0; k < links.length; k++) {
        var hit = q === "" || links[k]._title.indexOf(q) !== -1;
        links[k].hidden = !hit;
        if (hit) shown++;
      }
      empty.hidden = shown > 0;
    }

    function open() {
      panel.hidden = false;
      pill.setAttribute("aria-expanded", "true");
      filter.value = "";
      applyFilter();
      // Only autofocus where a keyboard is already present. On touch this would
      // throw up the on-screen keyboard when the intent is almost always just
      // to tap an app.
      if (WANTS_AUTOFOCUS) filter.focus();
      document.addEventListener("click", onOutside, true);
    }

    function close(refocus) {
      panel.hidden = true;
      pill.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", onOutside, true);
      if (refocus) pill.focus();
    }

    function onOutside(e) {
      // Composed path so a click inside the shadow tree is not "outside".
      var path = e.composedPath ? e.composedPath() : [];
      if (path.indexOf(self) === -1) close(false);
    }

    pill.addEventListener("click", function () {
      if (panel.hidden) open(); else close(true);
    });

    filter.addEventListener("input", applyFilter);

    filter.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        for (var k = 0; k < links.length; k++) {
          if (!links[k].hidden) { location.href = links[k].href; return; }
        }
      }
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !panel.hidden) {
        e.stopPropagation();
        close(true);
      }
    });
  }

  if (!customElements.get("portal-nav")) {
    customElements.define("portal-nav", PortalNav);
  }
})();
