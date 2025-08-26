document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-contenido");
  const total = document.getElementById("total");
  const vaciarBtn = document.getElementById("vaciar-carrito");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function mostrarCarrito() {
    contenedor.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0){
        contenedor.innerHTML = "<p>Tu carrito está vacío🧺<p>"
        total.textContent = "";
        return;
    }

    carrito.forEach(producto => {
      const item = document.createElement("div");
      item.classList.add("producto");
      item.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>$${producto.precio.toLocaleString()} x ${producto.cantidad}</p>
        <button class="sumar" data-id="${producto.id}">+</button>
        <button class="restar" data-id="${producto.id}">−</button>
        <button class="eliminar" data-id="${producto.id}">Eliminar</button>
      `;
      contenedor.appendChild(item);
      sumaTotal += producto.precio * producto.cantidad;
    });

    total.textContent = `Total: $${sumaTotal.toLocaleString()}`;
  }

  contenedor.addEventListener("click", e => {
    const id = parseInt(e.target.getAttribute("data-id"));
    const producto = carrito.find(p => p.id === id);

    if (e.target.classList.contains("sumar")) {
      producto.cantidad += 1;
    }

    if (e.target.classList.contains("restar")) {
      producto.cantidad -= 1;
      if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
      }
    }

    if (e.target.classList.contains("eliminar")) {
      carrito = carrito.filter(p => p.id !== id);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  });

  vaciarBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });

  mostrarCarrito();
});