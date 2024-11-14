document.addEventListener("DOMContentLoaded", function() {
  // Mantener el código del menú móvil intacto
  const menuButton = document.getElementById("menu-toggle");
  const menuMobile = document.getElementById("menu_mobile");
  const menuCierre = document.getElementById("menu_cierre");

  menuButton.addEventListener("click", function() {
      menuMobile.style.display = menuMobile.style.display === "flex" ? "none" : "flex";
  });

  menuCierre.addEventListener("click", function() {
      menuMobile.style.display = "none";
  });

  // Cargar 15 cócteles específicos
  loadInitialCocktails();

  // Escuchar eventos de búsqueda
  const searchTermDesktop = document.getElementById("navbar_srch");
  const searchTermMobile = document.getElementById("navbar_srch_mobile");
  const searchButtonDesktop = document.querySelector(".search_busqueda");
  const searchButtonMobile = document.querySelector(".srch_mobile + button");

  searchButtonDesktop.addEventListener("click", handleSearch);
  searchButtonMobile.addEventListener("click", handleSearch);
});

function handleSearch() {
  const searchTermDesktop = document.getElementById('navbar_srch').value;
  const searchTermMobile = document.getElementById('navbar_srch_mobile').value;
  const searchTerm = searchTermDesktop || searchTermMobile;
  if (searchTerm) {
    searchCocktail(searchTerm);
    // Actualiza la URL sin recargar la página
    const newUrl = `${window.location.pathname}?query=${encodeURIComponent(searchTerm)}`;
    history.pushState({ path: newUrl }, '', newUrl);
  } else {
    alert("Por favor ingresa un término de búsqueda.");
  }
}

function loadInitialCocktails() {
  const cocktailIDs = [
    11007, 11000, 11008, 11009, 11010, 11011, 11012, 11013, 11014, 11015,
    11016, 11017, 11018, 11019, 11020
  ];
  
  const promises = cocktailIDs.map(id => 
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => data.drinks ? data.drinks[0] : null)  // Manejar la posibilidad de null
  );

  Promise.all(promises)
    .then(results => {
      const cocktails = results.filter(cocktail => cocktail !== null);  // Filtrar nulos
      displayCocktails(cocktails);
    })
    .catch(error => console.error('Error:', error));
}

function searchCocktail(searchTerm) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayCocktails(data.drinks ? data.drinks : [], true))  // Manejar el caso de resultados nulos
    .catch(error => console.error('Error:', error));
}

function translateText(text) {
  const translations = {
    "Ordinary Drink": "Bebida Común",
    "Cocktail": "Cóctel",
    "Alcoholic": "Alcohólico",
    "Non_Alcoholic": "No Alcohólico",
    // Añade más traducciones según sea necesario
  };
  return translations[text] || text;
}

function displayCocktails(cocktails, clearPrevious = false) {
  const resultsDiv = document.getElementById('results');
  if (clearPrevious) {
    resultsDiv.innerHTML = ''; // Limpiar contenido anterior
  }

  if (cocktails.length > 0) {
    cocktails.forEach(cocktail => {
      const cocktailDiv = document.createElement('div');
      cocktailDiv.className = 'cocktail-item';

      cocktailDiv.innerHTML = `
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
        <div class="cocktail-item-content">
          <h3>${cocktail.strDrink}</h3>
          <p><strong>Categoría:</strong> ${translateText(cocktail.strCategory)}</p>
          <p><strong>Tipo:</strong> ${translateText(cocktail.strAlcoholic)}</p>
          <p><strong>Ingredientes:</strong> ${listIngredients(cocktail)}</p>
          <p><strong>Instrucciones:</strong> ${cocktail.strInstructions}</p>
        </div>
      `;

      resultsDiv.appendChild(cocktailDiv);
    });
  } else {
    resultsDiv.innerHTML = '<p>No se encontraron cócteles.</p>';
  }
}

function listIngredients(cocktail) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (cocktail[`strIngredient${i}`]) {
      ingredients.push(`${cocktail[`strIngredient${i}`]} (${cocktail[`strMeasure${i}`] || ''})`);
    } else {
      break;
    }
  }
  return ingredients.join(', ');
}




