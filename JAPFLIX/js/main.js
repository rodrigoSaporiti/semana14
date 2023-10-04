document.addEventListener('DOMContentLoaded', function() {
  const api = "https://japceibal.github.io/japflix_api/movies-data.json";

  async function apiFetch() {
    try {
      let res = await fetch(api);
      let data = await res.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      return [];
    }
  }
  
  let boton = document.getElementById("btnBuscar");
  let contenedorInformacion = document.getElementById("informacion"); // Contenedor para mostrar información adicional
  
  boton.addEventListener("click", async function () {
    let buscar = document.getElementById("inputBuscar").value.toLowerCase();
    let productos = await apiFetch();
  
    let resultados = productos.filter((element) => {
      const title = element.title.toLowerCase();
      const tagline = element.tagline.toLowerCase();
      const genres = element.genres.join(', ').toLowerCase();
      const overview = element.overview.toLowerCase();
  
      return (
        title.includes(buscar) ||
        tagline.includes(buscar) ||
        genres.includes(buscar) ||
        overview.includes(buscar)
      );
    });
  
    mostrarResultados(resultados);
  });
  
  function mostrarResultados(resultados) {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
  
    resultados.forEach((pelicula, index) => {
      let item = document.createElement("li");
      item.classList.add("list-group-item");
  
      // Agregar un evento clic para mostrar la información adicional
      item.addEventListener("click", function () {
        mostrarInformacionAdicional(pelicula);
      });
  
      // Crear un elemento para mostrar el título
      let titulo = document.createElement("h3");
      titulo.textContent = pelicula.title;
      item.appendChild(titulo);
  
      // Crear un elemento para mostrar el tagline
      let tagline = document.createElement("p");
      tagline.textContent = pelicula.tagline;
      item.appendChild(tagline);
  
      // Crear un elemento para mostrar la puntuación en formato de estrellas
      let estrellas = document.createElement("p");
      estrellas.textContent = `Puntuación: ${pelicula.vote_average} ⭐⭐⭐⭐⭐`;
      item.appendChild(estrellas);
  
      lista.appendChild(item);
    });
  }
  
  function mostrarInformacionAdicional(pelicula) {
    contenedorInformacion.innerHTML = ""; // Limpiar el contenido existente
  
    // Crear elementos para mostrar la información adicional
    let titulo = document.createElement("h2");
    titulo.textContent = pelicula.title;
  
    let overview = document.createElement("p");
    overview.textContent = `Resumen: ${pelicula.overview}`;
  
    let genres = document.createElement("p");
    genres.textContent = `Géneros: ${pelicula.genres.join(', ')}`;
  
    contenedorInformacion.appendChild(titulo);
    contenedorInformacion.appendChild(overview);
    contenedorInformacion.appendChild(genres);
  }
  
});
