// Carrusel automático
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slider-track img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Slide automático cada 5 segundos
setInterval(nextSlide, 5000);


// Filtro de productos
function filtrar(tipo) {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(prod => {
    if (tipo === 'todos' || prod.dataset.tipo === tipo) {
      prod.style.display = 'block';
    } else {
      prod.style.display = 'none';
    }
  });
}

function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

function verDetalleProducto(nombre, descripcion, imagen, precio) {
    const producto = { nombre, descripcion, imagen, precio };
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'producto.html';
}


function getProductPage(id, nombre) {
  window.location.href = `/producto.html#/${id}`
}

// Read from Json
const prodContainer = document.getElementById('productos');
fetch('/json/data.json')
  .then(response => response.json())
  .then(data => {
    if (data.length === 0) {
      prodContainer.innerHTML = "No hay productos en la tienda"
    } else {
      data.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.setAttribute('data-tipo', `${prod.tipo}`);
        div.innerHTML = `
          <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
        `

        prodContainer.append(div)

        div.addEventListener('click', () => getProductPage(prod.id, prod.nombre))
      });
    }
    
  });