document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");

    if (header && !document.querySelector(".tagline-bar")) {
        const bar = document.createElement("div");
        bar.className = "tagline-bar";
        bar.textContent = "ONE TEAM. MANY EXPERTS. SHARED RESOURCES.";
        header.appendChild(bar);
    }
});