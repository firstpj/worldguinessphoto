// Paystack checkout. Put your PUBLIC key below (starts with pk_test_ or pk_live_).
// Never put your secret key (sk_...) anywhere in this website.
var PAYSTACK_PUBLIC_KEY = "pk_test_YOUR_PUBLIC_KEY";

(function () {
  var form = document.getElementById("pay-form");
  var status = document.getElementById("pay-status");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("pay-name").value.trim();
    var email = document.getElementById("pay-email").value.trim();
    var amount = Number(document.getElementById("pay-amount").value);
    if (!name || !email || !(amount >= 100)) { status.textContent = "Enter your name, a valid email and an amount of at least NGN 100."; return; }
    if (PAYSTACK_PUBLIC_KEY.indexOf("YOUR_PUBLIC_KEY") !== -1) { status.textContent = "Payments are not switched on yet: add the Paystack public key in js/payment.js."; return; }
    if (typeof PaystackPop === "undefined") { status.textContent = "Could not load Paystack. Check your internet connection and try again."; return; }
    PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: Math.round(amount * 100),
      currency: "NGN",
      metadata: { custom_fields: [
        { display_name: "Name", variable_name: "name", value: name },
        { display_name: "Phone", variable_name: "phone", value: document.getElementById("pay-phone").value },
        { display_name: "Payment for", variable_name: "payment_for", value: document.getElementById("pay-for").value }
      ] },
      callback: function (res) { status.textContent = "Payment received. Your reference is " + res.reference + ". Please keep it."; form.reset(); },
      onClose: function () { status.textContent = "Payment window closed. No payment was made."; }
    }).openIframe();
  });
})();
