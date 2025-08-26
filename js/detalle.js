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
      const specsList = [
        { label: 'Medidas', value: producto.medidas },
        { label: 'Materiales', value: producto.materiales },
        { label: 'Acabado', value: producto.acabado },
        { label: 'Peso', value: producto.peso },
        { label: 'Capacidad', value: producto.capacidad },
        { label: 'Categoría', value: producto.categoria }
      ]
      .filter(spec => spec.value) // Filtrar especificaciones sin valor
      .map(spec => `<li><strong>${spec.label}:</strong> ${spec.value}</li>`)
      .join('');

      contenedor.innerHTML = `
        <div class="detalle-grid">
          <div class="detalle-imagen-container">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="detalle-img"/>
          </div>
          <div class="detalle-info-container">
            <h2>${producto.nombre}</h2>
            <p class="descripcion">${producto.descripcion}</p>
            <ul class="detalle-specs">${specsList}</ul>
            <div class="precio-accion">
              <p class="precio">$${producto.precio.toLocaleString()}</p>
              <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    } else {
      contenedor.innerHTML = `<p>Producto no encontrado 😢</p>`;
    }
  });
});
