document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu-toggle");
    const menuMobile = document.getElementById("menu_mobile");
    const menuCierre = document.getElementById("menu_cierre");

    menuButton.addEventListener("click", function() {
        menuMobile.style.display = menuMobile.style.display === "flex" ? "none" : "flex";
    });

    menuCierre.addEventListener("click", function() {
        menuMobile.style.display = "none";
    });
});
