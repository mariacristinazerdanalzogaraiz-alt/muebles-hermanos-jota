// 1. Simular carga asíncrona de productos
function cargarProductos() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(window.productos); // El array debe estar en productos.js y cargado antes
    }, 500);
  });
}

// 2. Renderizar productos destacados
function mostrarDestacados(productos) {
  const contenedor = document.getElementById("productos-destacados");
  contenedor.innerHTML = "";
  const destacados = productos.slice(0, 3); // Muestra los primeros 3

  destacados.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
      <button class="agregar-carrito">Agregar al carrito</button>
      <a href="detalle.js?id=${producto.id}" class="ver-mas">Ver más</a>
    `;
    contenedor.appendChild(card);

    // Evento para agregar al carrito
    const boton = card.querySelector(".agregar-carrito");
    boton.addEventListener("click", () => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const existe = carrito.find(item => item.id === producto.id);

      if (!existe) {
        carrito.push({ ...producto, cantidad: 1 });
      } else {
        existe.cantidad += 1;
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarContadorCarrito();
      alert(`${producto.nombre} fue agregado al carrito 🛒`);
    });
  });
}

// 3. Actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
  const contador = document.getElementById("contador");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contador.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
}

// 4. Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos().then(mostrarDestacados);
  actualizarContadorCarrito();
});