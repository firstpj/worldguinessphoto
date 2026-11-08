// Paystack checkout.
// 1) Put your PUBLIC key below (pk_test_... or pk_live_...). Never use a secret key (sk_...).
// 2) While the placeholder is still here, the page runs in DEMO MODE: a pretend checkout
//    that takes no money, so you can test the whole flow. Do not publish the site in demo mode.
var PAYSTACK_PUBLIC_KEY = "pk_test_YOUR_PUBLIC_KEY";

(function () {
  var form = document.getElementById("pay-form");
  var status = document.getElementById("pay-status");
  var demo = PAYSTACK_PUBLIC_KEY.indexOf("YOUR_PUBLIC_KEY") !== -1;

  if (demo) {
    var note = document.createElement("p");
    note.textContent = "DEMO MODE: no real payment is taken. Add your Paystack public key in to go live.";
    note.style.cssText = "background:#FFF4CC;border:1px solid #B8962E;padding:10px 12px;border-radius:6px;margin-bottom:12px;font-weight:600";
    form.parentNode.insertBefore(note, form);
  }

  function demoCheckout(email, amount, onDone, onCancel) {
    var ref = "DEMO-" + Date.now();
    var ov = document.createElement("div");
    ov.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px";
    ov.innerHTML = '<div style="background:#fff;border-radius:8px;max-width:380px;width:100%;padding:24px;font-family:inherit">' +
      '<p style="font-weight:700;color:#B8962E;margin-bottom:6px">DEMO CHECKOUT (not real)</p>' +
      '<h2 style="font-size:22px;margin-bottom:8px">Pay NGN ' + amount.toLocaleString() + '</h2>' +
      '<p style="margin-bottom:16px;color:#52615A">' + email.replace(/</g, "&lt;") + '<br>No card details are collected and no money moves.</p>' +
      '<button class="btn" id="demo-ok" type="button">Simulate successful payment</button> ' +
      '<button class="btn btn-gold" id="demo-no" type="button">Cancel</button></div>';
    document.body.appendChild(ov);
    ov.querySelector("#demo-ok").onclick = function () { ov.remove(); onDone(ref); };
    ov.querySelector("#demo-no").onclick = function () { ov.remove(); onCancel(); };
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("pay-name").value.trim();
    var email = document.getElementById("pay-email").value.trim();
    var amount = Number(document.getElementById("pay-amount").value);
    if (!name || !email || !(amount >= 100)) { status.textContent = "Enter your name, a valid email and an amount of at least NGN 100."; return; }

    function done(ref) {
      status.textContent = (demo ? "DEMO ONLY, no money was taken. " : "Payment received. ") + "Your reference is " + ref + ". Please keep it.";
      form.reset();
    }
    function cancelled() { status.textContent = "Payment window closed. No payment was made."; }

    if (demo) { demoCheckout(email, amount, done, cancelled); return; }
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
      callback: function (res) { done(res.reference); },
      onClose: cancelled
    }).openIframe();
  });
})();
