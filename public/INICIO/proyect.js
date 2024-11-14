

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




/* comentarios datos  */
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('comentarioForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita el envío del formulario tradicional

    const data = {
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value,
      correo: document.getElementById('correo').value,
      telefono: document.getElementById('telefono').value,
      tipo: document.getElementById('tipo').value,
      calificacion: document.getElementById('calificacion').value,
      entidad_id: document.getElementById('entidad_id').value,
      comentario: document.getElementById('comentario').value
    };

    try {
      const response = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('Comentario enviado correctamente.');
        document.getElementById('comentarioForm').reset(); // Limpiar el formulario
      } else {
        const errorMessage = await response.text();
        alert('Error al enviar el comentario: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el comentario.');
    }
  });
});
