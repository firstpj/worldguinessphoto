// No server needed yet: forms open WhatsApp with the message already written.
// Replace this with a form service or Supabase endpoint later.
(function () {
  var NUMBER = "2348138688252";
  document.querySelectorAll("form[data-subject]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = ["*" + form.dataset.subject + "*"];
      form.querySelectorAll("input,select,textarea").forEach(function (f) {
        if (f.value.trim()) lines.push(f.dataset.label + ": " + f.value.trim());
      });
      window.open("https://wa.me/" + NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
      form.querySelector(".form-status").textContent = "WhatsApp is opening with your message. Press send there to reach us.";
    });
  });
})();
