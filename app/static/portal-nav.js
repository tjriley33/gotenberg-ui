(function () {
  "use strict";

  var APPS = [{"id":"home-assistant","title":"Home Assistant","url":"https://ha.taylor-riley.com","icon":"house","accent":"#38bdf8"},{"id":"frigate","title":"Frigate","url":"https://frigate.taylor-riley.com","icon":"cctv","accent":"#34d399"},{"id":"notes","title":"Notes","url":"https://notes.taylor-riley.com","icon":"notebook-pen","accent":"#c084fc"},{"id":"brief","title":"Brief","url":"https://brief.taylor-riley.com","icon":"sunrise","accent":"#fbbf24"},{"id":"rec-room","title":"Rec Room","url":"https://steno.taylor-riley.com","icon":"mic","accent":"#f59e0b"},{"id":"uptime-kuma","title":"Uptime Kuma","url":"https://uptime.taylor-riley.com","icon":"activity","accent":"#4ade80"},{"id":"glances","title":"Glances","url":"https://glances.taylor-riley.com","icon":"gauge","accent":"#22d3ee"},{"id":"grafana","title":"Grafana","url":"https://grafana.taylor-riley.com","icon":"chart-line","accent":"#fb923c"},{"id":"paperless","title":"Paperless","url":"https://paperless.taylor-riley.com","icon":"file-text","accent":"#a3e635"},{"id":"folio","title":"Folio","url":"https://docling.taylor-riley.com","icon":"file-input","accent":"#7dd3a8"},{"id":"darkroom","title":"Darkroom","url":"https://darkroom.taylor-riley.com","icon":"image","accent":"#e879f9"},{"id":"portainer","title":"Portainer","url":"https://portainer.taylor-riley.com","icon":"container","accent":"#60a5fa"},{"id":"n8n","title":"n8n","url":"https://n8n.taylor-riley.com","icon":"workflow","accent":"#ea4b71"},{"id":"dockge","title":"Dockge","url":"https://dockge.taylor-riley.com","icon":"layers","accent":"#818cf8"},{"id":"adguard","title":"AdGuard","url":"https://adguard.taylor-riley.com","icon":"shield","accent":"#2dd4bf"},{"id":"spoolman","title":"Spoolman","url":"https://spoolman.taylor-riley.com","icon":"printer","accent":"#f472b6"},{"id":"spoolman-sync","title":"Spoolman Sync","url":"https://spoolman-sync.taylor-riley.com","icon":"refresh-cw","accent":"#fda4af"},{"id":"reolink","title":"Reolink","url":"https://reolink.taylor-riley.com","icon":"video","accent":"#94a3b8"},{"id":"press","title":"Press","url":"https://pdf.taylor-riley.com","icon":"stamp","accent":"#facc15"}];
  var ICONS = {"house":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" /> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />","cctv":"<path d=\"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97\" /> <path d=\"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z\" /> <path d=\"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15\" /> <path d=\"M2 21v-4\" /> <path d=\"M7 9h.01\" />","notebook-pen":"<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" /> <path d=\"M2 6h4\" /> <path d=\"M2 10h4\" /> <path d=\"M2 14h4\" /> <path d=\"M2 18h4\" /> <path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" />","sunrise":"<path d=\"M12 2v8\" /> <path d=\"m4.93 10.93 1.41 1.41\" /> <path d=\"M2 18h2\" /> <path d=\"M20 18h2\" /> <path d=\"m19.07 10.93-1.41 1.41\" /> <path d=\"M22 22H2\" /> <path d=\"m8 6 4-4 4 4\" /> <path d=\"M16 18a4 4 0 0 0-8 0\" />","mic":"<path d=\"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z\" /> <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\" /> <line x1=\"12\" x2=\"12\" y1=\"19\" y2=\"22\" />","activity":"<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\" />","gauge":"<path d=\"m12 14 4-4\" /> <path d=\"M3.34 19a10 10 0 1 1 17.32 0\" />","chart-line":"<path d=\"M3 3v16a2 2 0 0 0 2 2h16\" /> <path d=\"m19 9-5 5-4-4-3 3\" />","file-text":"<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M10 9H8\" /> <path d=\"M16 13H8\" /> <path d=\"M16 17H8\" />","file-input":"<path d=\"M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4\" /> <path d=\"M14 2v4a2 2 0 0 0 2 2h4\" /> <path d=\"M2 15h10\" /> <path d=\"m9 18 3-3-3-3\" />","image":"<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" /> <circle cx=\"9\" cy=\"9\" r=\"2\" /> <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />","container":"<path d=\"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z\" /> <path d=\"M10 21.9V14L2.1 9.1\" /> <path d=\"m10 14 11.9-6.9\" /> <path d=\"M14 19.8v-8.1\" /> <path d=\"M18 17.5V9.4\" />","workflow":"<rect width=\"8\" height=\"8\" x=\"3\" y=\"3\" rx=\"2\" /> <path d=\"M7 11v4a2 2 0 0 0 2 2h4\" /> <rect width=\"8\" height=\"8\" x=\"13\" y=\"13\" rx=\"2\" />","layers":"<path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\" /> <path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\" /> <path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\" />","shield":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />","printer":"<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\" /> <path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\" /> <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\" />","refresh-cw":"<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" /> <path d=\"M21 3v5h-5\" /> <path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" /> <path d=\"M8 16H3v5\" />","video":"<path d=\"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5\" /> <rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\" />","stamp":"<path d=\"M5 22h14\" /> <path d=\"M19.27 13.73A2.5 2.5 0 0 0 17.5 13h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.5c0-.66-.26-1.3-.73-1.77Z\" /> <path d=\"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-3-3c-1.66 0-3 1-3 3s1 2 1 3.5V13\" />"};
  var HOME = { id: "home", title: "Home", url: "https://home.taylor-riley.com", icon: "house", accent: "#c084fc" };

  function iconSvg(name, size) {
    var inner = ICONS[name] || "";
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      inner + "</svg>";
  }

  /** Which app is this? Matched on hostname so one identical file drops
   *  into all five apps with no per-app configuration. */
  function currentApp() {
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
    "a.item svg{color:var(--i);flex:none;}",
    ".sep{height:1px;margin:5px 2px;background:rgba(169,174,200,.14);}",
    ".empty{padding:10px;color:#6d7394;}",
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

    var me = currentApp();
    var root = self.attachShadow({ mode: "open" });

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

    // Home first, then a rule, then every other app. The current app is
    // excluded — it is already named on the pill.
    var entries = [HOME];
    for (var i = 0; i < APPS.length; i++) {
      if (!me || APPS[i].id !== me.id) entries.push(APPS[i]);
    }

    var links = [];
    for (var j = 0; j < entries.length; j++) {
      if (j === 1) {
        var sep = document.createElement("div");
        sep.className = "sep";
        list.appendChild(sep);
      }
      var app = entries[j];
      var a = document.createElement("a");
      a.className = "item";
      a.href = app.url;
      a.setAttribute("role", "menuitem");
      a.style.setProperty("--i", app.accent);
      a.innerHTML = iconSvg(app.icon, 15) + "<span>" + app.title + "</span>";
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
