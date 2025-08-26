document.addEventListener('DOMContentLoaded', () => {
  if (typeof productos === 'undefined' || !document.getElementById('productos')) {
    console.error("El array 'productos' no está definido o no se encuentra el contenedor de productos.");
    return;
  }

  const busquedaInput = document.getElementById('busqueda');
  const productosContainer = document.getElementById('productos');
  const filtroBotones = document.querySelectorAll('.filtro-lista button');

  let categoriaActual = 'todos';
  let terminoBusqueda = '';

  // --- FUNCIÓN PARA RENDERIZAR PRODUCTOS ---
  const renderizarProductos = (lista) => {
    productosContainer.innerHTML = '';
    if (lista.length === 0) {
      productosContainer.innerHTML = '<p class="sin-resultados">No se encontraron productos que coincidan con tu búsqueda.</p>';
      return;
    }
    lista.forEach(producto => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>${producto.descripcion}</p>
        <p class="precio">$${producto.precio}</p>
        <a href="detalle.html?id=${producto.id}" class="ver-mas">Ver más</a>
        <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
      `;
      productosContainer.appendChild(productoDiv);
    });
  };

  // --- LÓGICA DE FILTRADO ---

  const aplicarFiltros = () => {
    let productosFiltrados = productos;

    // 1. Filtrar por categoría
    if (categoriaActual !== 'todos') {
      productosFiltrados = productosFiltrados.filter(p => p.categoria === categoriaActual);
    }

    // 2. Filtrar por término de búsqueda
    if (terminoBusqueda) {
      productosFiltrados = productosFiltrados.filter(p => p.nombre.toLowerCase().includes(terminoBusqueda));
    }

    renderizarProductos(productosFiltrados);
  };

  // --- EVENT LISTENERS ---

  // Listener para el input de búsqueda (se activa con cada letra que se escribe)
  busquedaInput.addEventListener('input', (e) => {
    terminoBusqueda = e.target.value.toLowerCase().trim();
    aplicarFiltros();
  });

  // Listeners para los botones de categoría
  filtroBotones.forEach(boton => {
    boton.addEventListener('click', (e) => {
      filtroBotones.forEach(b => b.classList.remove('filtro-activo'));
      e.target.classList.add('filtro-activo');
      categoriaActual = e.target.dataset.categoria;
      aplicarFiltros();
    });
  });

  // --- RENDER INICIAL ---
  document.querySelector('.filtro-lista button[data-categoria="todos"]').classList.add('filtro-activo');
  renderizarProductos(productos);
});