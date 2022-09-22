const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
});

let url = "../stockjson.json";
let stock = [];

fetch(url)
  .then((resp) => resp.json())
  .then((stockProductos) => {
    stock = stockProductos;
    mostrarProductos(stock);
  })
  .catch((error) => {
    console.info("que error? ", error);
  });

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stock.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  console.log(carrito);
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;
  console.log(carrito);
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
};

document.getElementById("btnFinalizarCompra").onclick = () => {
  Swal.fire(
    "Tu compra fue realizada con exito!",
    "has click para continuar",
    "success"
  );
};

const buscar = document.getElementById("buscar");

buscar.addEventListener(`keydown`, (e) => {
  let filterstock = stock.filter((producto) => {
    if (e.target.value == "") {
      return true;
    }

    return producto.tipo.includes(e.target.value)||producto.nombre.includes(e.target.value);
  });
  mostrarProductos(filterstock);
});

function mostrarProductos(stockProductos) {
  contenedorProductos.innerHTML = "";
  stockProductos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src=${producto.foto} alt= "">
      <h3>${producto.nombre}</h3>
      <p>${producto.desc}</p>
      <p>Talle: ${producto.talle}</p>
      <p class="precioProducto">Precio:$ ${producto.precio}</p>
      <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
      `;
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
}