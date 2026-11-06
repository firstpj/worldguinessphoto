document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    if (header && !document.querySelector(".tagline-bar")) {
        const bar = document.createElement("div");
        bar.className = "tagline-bar";
        bar.textContent = "ONE TEAM. MANY EXPERTS. SHARED RESOURCES.";
        header.appendChild(bar);
    }
});

// Mobile Navigation Menu

const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", function () {

    mainNav.classList.toggle("active");

    const isOpen = mainNav.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen ? "✕" : "☰";

});

// Close menu after selecting a link

document.querySelectorAll("#main-nav a").forEach(function(link) {

    link.addEventListener("click", function() {

        mainNav.classList.remove("active");

        menuToggle.innerHTML = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});