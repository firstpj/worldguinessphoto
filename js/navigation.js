// Shared header and footer, so the menu only has to be edited here.
(function () {
  var pages = [
    ["index.html", "Home"],
    ["modular-business.html", "Modular Business"],
    ["modular-business.html#exportation", "Exportation"],
    ["diaspora-eye.html", "Diaspora Eye"],
    ["diaspora-eye.html#real-estate", "Real Estate"],
    ["additional-services.html", "Additional Services"],
    ["gallery.html", "Media Gallery"],
    ["about.html", "About Us"],
    ["contact.html", "Contact"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";
  var links = pages.map(function (p) {
    var cur = p[0] === here ? ' aria-current="page"' : "";
    return '<li><a href="' + p[0] + '"' + cur + ">" + p[1] + "</a></li>";
  }).join("");

  document.getElementById("site-header").innerHTML =
    '<header class="site-header"><div class="tagline-bar">One Team. Many Experts. Shared Success.</div><div class="container">' +
    '<a class="brand" href="index.html"><img src="images/logo.png" alt="">' +
    "<div><strong>DE WORLD GUINNESS</strong><span>PHOTO NIG. LTD</span></div></a>" +
    '<button class="menu-toggle" id="menu-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="main-nav">&#9776;</button>' +
    '<nav class="nav" id="main-nav" aria-label="Main"><ul>' + links + "</ul></nav></div></header>";

  document.getElementById("site-footer").innerHTML =
    '<footer class="site-footer"><div class="container"><div class="grid">' +
    "<div><h3>DE WORLD GUINNESS PHOTO NIG. LTD</h3><p>One Team. Many Experts. Shared Success.</p></div>" +
    "<div><h3>Explore</h3>" + pages.map(function (p) { return '<a href="' + p[0] + '">' + p[1] + "</a>"; }).join("") + '<a href="payment.html">Make a Payment</a></div>' +
    '<div><h3>Contact</h3><a href="tel:+2348138688252">+234 813 868 8252</a><a href="tel:+2349115192689">+234 911 519 2689</a><a href="tel:+2348083117248">+234 808 311 7248</a><p>Lagos State, Nigeria</p></div>' +
    '</div><p class="copy">&copy; 2026 DE WORLD GUINNESS PHOTO NIG. LTD. All rights reserved.</p></div></footer>' +
    '<a class="whatsapp" href="https://wa.me/2348138688252" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">&#128172;</a>';

  var toggle = document.getElementById("menu-toggle"), nav = document.getElementById("main-nav");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open ? "&#10005;" : "&#9776;";
  });
})();
