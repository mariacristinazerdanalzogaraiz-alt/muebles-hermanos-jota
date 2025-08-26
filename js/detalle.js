document.addEventListener("DOMContentLoaded", () => {
  // 1. Simular carga asíncrona de productos
  function cargarProductos() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(window.productos); // El array debe estar en productos.js y cargado antes
      }, 500); // Simula retardo de red
    });
  }

  // 2. Obtener el ID desde la URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  // 3. Renderizar el detalle del producto
  cargarProductos().then(productos => {
    const producto = productos.find(p => p.id === id);
    const contenedor = document.getElementById("detalle");

    if (producto && contenedor) {
      contenedor.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-img"/>
        <div class="detalle-info">
          <h2>${producto.nombre}</h2>
          <p class="descripcion">${producto.descripcion}</p>
          <ul>
            <li><strong>Medidas:</strong> ${producto.medidas || ""}</li>
            <li><strong>Materiales:</strong> ${producto.materiales || ""}</li>
            <li><strong>Acabado:</strong> ${producto.acabado || ""}</li>
            <li><strong>Peso:</strong> ${producto.peso || ""}</li>
            <li><strong>Capacidad:</strong> ${producto.capacidad || ""}</li>
            <li><strong>Categoría:</strong> ${producto.categoria}</li>
          </ul>
          <p class="precio">$${producto.precio.toLocaleString()}</p>
          <button class="agregar-carrito">Agregar al carrito</button>
        </div>
      `;

      // 4. Evento para agregar al carrito
      const botonCarrito = contenedor.querySelector(".agregar-carrito");
      botonCarrito.addEventListener("click", () => {
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
    } else {
      contenedor.innerHTML = `<p>Producto no encontrado 😢</p>`;
    }
  });

  // 5. Actualizar el contador del carrito en el header
  function actualizarContadorCarrito() {
    const contador = document.getElementById("contador");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contador.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  }

  // 6. Inicializar contador al cargar la página
  actualizarContadorCarrito();
});
