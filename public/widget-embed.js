(function () {
  if (window.__imuniWidgetInit) return;
  window.__imuniWidgetInit = true;

  var WIDGET_URL = "https://imunisinos.vercel.app/widget";

  function addStyles() {
    if (document.getElementById("imuni-widget-styles")) return;
    var style = document.createElement("style");
    style.id = "imuni-widget-styles";
    style.textContent =
      "#imuni-widget-container{position:fixed;bottom:40px;right:40px;z-index:1001;display:flex;align-items:center;gap:10px}" +
      "#imuni-widget-badge{background:#222;color:#fff;font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:6px 12px;border-radius:20px;white-space:nowrap;box-shadow:0 2px 10px rgba(0,0,0,.25)}" +
      "#imuni-widget-button{width:64px;height:64px;flex-shrink:0;background-color:#79bb30;background-repeat:no-repeat;background-position:center;background-size:28px 28px;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.6'%3E%3Crect x='5' y='9' width='14' height='10' rx='2.5'/%3E%3Cpath stroke-linecap='round' d='M12 9V6m0 0a1.5 1.5 0 1 0-1.5-1.5'/%3E%3Ccircle cx='9' cy='14' r='1' fill='white' stroke='none'/%3E%3Ccircle cx='15' cy='14' r='1' fill='white' stroke='none'/%3E%3Cpath stroke-linecap='round' d='M9 17h6M3 12h2M19 12h2'/%3E%3C/svg%3E\");border-radius:50px;box-shadow:0 4px 20px rgba(121,187,48,.4);cursor:pointer;transition:all .3s ease}" +
      "#imuni-widget-button:hover{background-color:#5d9224;transform:scale(1.1);box-shadow:0 6px 25px rgba(121,187,48,.6)}" +
      "#imuni-widget-button.is-open{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M6 6l12 12M18 6L6 18'/%3E%3C/svg%3E\")}" +
      "#imuni-widget-panel{display:none;position:fixed;bottom:116px;right:40px;width:380px;height:600px;max-height:calc(100vh - 176px);border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.25);z-index:1001}" +
      "#imuni-widget-panel iframe{width:100%;height:100%;border:0}" +
      "@media (max-width:768px){#imuni-widget-container{bottom:20px;right:20px}#imuni-widget-badge{font-size:10px;padding:5px 9px}#imuni-widget-button{width:56px;height:56px;background-size:24px 24px}#imuni-widget-panel{bottom:105px;top:60px;left:12px;right:12px;width:auto;height:auto;max-height:none}}";
    document.head.appendChild(style);
  }

  function ensureMarkup() {
    if (!document.getElementById("imuni-widget-container")) {
      var container = document.createElement("div");
      container.id = "imuni-widget-container";
      container.innerHTML =
        '<span id="imuni-widget-badge">Assistente virtual</span>' +
        '<div id="imuni-widget-button" aria-label="Conversar com a Imuni assistente virtual" role="button" tabindex="0"></div>';
      document.body.appendChild(container);
    }

    if (!document.getElementById("imuni-widget-panel")) {
      var panel = document.createElement("div");
      panel.id = "imuni-widget-panel";
      panel.innerHTML =
        '<iframe id="imuni-widget-iframe" title="Imuni Assistente virtual da Imunisinos" data-no-lazy="1" data-no-optimize="1"></iframe>';
      document.body.appendChild(panel);
    }
  }

  function init() {
    addStyles();
    ensureMarkup();

    var button = document.getElementById("imuni-widget-button");
    var panel = document.getElementById("imuni-widget-panel");
    var iframe = document.getElementById("imuni-widget-iframe");
    if (!button || !panel || !iframe || button.getAttribute("data-imuni-bound") === "1") return;

    button.setAttribute("data-imuni-bound", "1");
    iframe.setAttribute("data-no-lazy", "1");
    iframe.setAttribute("data-no-optimize", "1");
    iframe.setAttribute("loading", "eager");
    if (!iframe.getAttribute("src")) iframe.src = WIDGET_URL;

    var isOpen = false;

    function toggle() {
      isOpen = !isOpen;
      if (!iframe.getAttribute("src")) iframe.src = WIDGET_URL;
      panel.style.display = isOpen ? "block" : "none";
      button.className = isOpen ? "is-open" : "";
    }

    button.addEventListener("click", toggle);
    button.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });

    window.addEventListener("message", function (event) {
      var origin = event.origin || "";
      var fromVercel =
        origin === "https://imunisinos.vercel.app" || origin.indexOf(".vercel.app") !== -1;
      if (!fromVercel) return;
      if (!event.data || event.data.source !== "imuni" || !event.data.event) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: event.data.event });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
