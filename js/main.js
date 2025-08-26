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
  contenedor.innerHTML = "";//CHEQUEAR SI ESTÁ BIEN
  const destacados = productos.slice(0, 3); // Muestra los primeros 3

  destacados.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>${producto.descripcion}</p>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
      <a href="detalle.html?id=${producto.id}" class="ver-mas">Ver más</a>
      <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
    `;
    contenedor.appendChild(card);
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
  // Cargar destacados solo en la página de inicio
  if (document.getElementById("productos-destacados")) {
    cargarProductos().then(mostrarDestacados);
  }

  // Lógica centralizada para "Agregar al carrito" usando delegación de eventos
  document.body.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("agregar-carrito")) {
      const idProducto = parseInt(evento.target.dataset.id);
      // Usamos window.productos que está disponible globalmente gracias a productos.js
      const producto = window.productos.find(p => p.id === idProducto);

      if (producto) {
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
      }
    }
  });

  // Lógica para el menú hamburguesa
  const hamburger = document.querySelector(".hamburger-menu");
  const navList = document.querySelector(".nav-principal .nav-list");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("activo");
    });
  }

  actualizarContadorCarrito();
});