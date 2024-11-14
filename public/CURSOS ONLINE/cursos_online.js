

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
  
  
  function redirectToSearch() {
    const searchTerm = document.getElementById('navbar_srch').value;
    if (searchTerm) {
      const searchUrl = `/RECETAS/recetas.html?query=${encodeURIComponent(searchTerm)}`;
      window.location.href = searchUrl;
    } else {
      alert("Por favor ingresa un término de búsqueda.");
    }
  }
  
  function redirectToSearchMobile() {
    const searchTerm = document.getElementById('navbar_srch_mobile').value;
    if (searchTerm) {
      const searchUrl = `/RECETAS/recetas.html?query=${encodeURIComponent(searchTerm)}`;
      window.location.href = searchUrl;
    } else {
      alert("Por favor ingresa un término de búsqueda.");
    }
  }
  



/*PREGUNTAS FRECUENTES*/
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            question.classList.toggle('active');
            const answer = question.nextElementSibling;

            if (question.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '10px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 10px';
            }
        });
    });
});
