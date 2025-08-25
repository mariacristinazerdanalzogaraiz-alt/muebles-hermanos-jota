document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos");
  const botones = document.querySelectorAll(".filtro-lista button");

  function mostrarProductos(lista) {
    contenedor.innerHTML = "";
    lista.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("producto");
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <button class="agregar-carrito">Agregar al carrito</button>
        <a href="detalle.html?id=${producto.id}" class="ver-mas">Ver más</a>
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

  function actualizarContadorCarrito() {
    const contador = document.getElementById("contador");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contador.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
  }

  mostrarProductos(window.productos); // Mostrar todos al inicio
  actualizarContadorCarrito();

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      // Resaltar botón activo
      botones.forEach(b => b.classList.remove("activo"));
      boton.classList.add("activo");

      const categoria = boton.getAttribute("data-categoria");
      if (categoria === "todos") {
        mostrarProductos(window.productos);
      } else {
        const filtrados = window.productos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
      }
      actualizarContadorCarrito();
    });
  });
});