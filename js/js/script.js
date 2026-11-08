// Gallery lightbox: any image inside .gallery-grid opens full size.
(function () {
  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Enlarged photo");
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  var big = box.querySelector("img");
  function close() { box.classList.remove("open"); }
  document.addEventListener("click", function (e) {
    var img = e.target.closest(".gallery-grid img");
    if (img) { big.src = img.src; big.alt = img.alt; box.classList.add("open"); }
    else if (box.classList.contains("open")) close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
})();
