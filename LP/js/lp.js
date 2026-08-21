document.querySelectorAll(".js-wa").forEach(function (el) {
  el.addEventListener("click", function () {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lp_whatsapp_click",
      lp_servico: document.body.getAttribute("data-servico") || "insetos",
    });
  });
});
