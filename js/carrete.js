document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll(".carrete-img");
  let index = 0;

  function mostrarSiguiente() {
    imagenes.forEach(img => img.classList.remove("activo"));
    index = (index + 1) % imagenes.length;
    imagenes[index].classList.add("activo");
  }

  // Mostrar la primera imagen al cargar
  if (imagenes.length > 0) {
    imagenes[0].classList.add("activo");
    setInterval(mostrarSiguiente, 4000); // Cambia cada 4 segundos
  }
});
