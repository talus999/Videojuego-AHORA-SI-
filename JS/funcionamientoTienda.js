import { guardarPartida, cargarPersonaje } from "./codigo.js";
import { Vendedor } from "./Vendedor.js";

let personaje;
let vendedor;
let objetoSeleccionado = null;

document.addEventListener("DOMContentLoaded", () => {
  vendedor = new Vendedor();
  personaje = cargarPersonaje();

  document.getElementById("salir").addEventListener("click", () => {
    console.log("Guardando Partida");
    guardarPartida(personaje);
    window.location.href = "aldea.html";
  });
  document.getElementById("comprar").addEventListener("click", iniciarCompra);
  document.getElementById("vender").addEventListener("click", iniciarVenta);
  document.getElementById("cancelar-compra").addEventListener("click", volverAlMenu);
  document.getElementById("cancelar-venta").addEventListener("click", volverAlMenu);
  document.getElementById("confirmar-compra").addEventListener("click", confirmarCompra);
  document.getElementById("confirmar-venta").addEventListener("click", confirmarVenta);
});

function iniciarCompra() {
  document.getElementById("menu-tienda").style.display = "none";
  document.getElementById("contenedor-compra").style.display = "flex";
  mostrarObjetosVendedor();
}

function iniciarVenta() {
  document.getElementById("menu-tienda").style.display = "none";
  document.getElementById("contenedor-venta").style.display = "flex";
  mostrarInventarioJugador();
}

function volverAlMenu() {
  ["contenedor-compra","contenedor-venta"].forEach(id =>
    document.getElementById(id).style.display = "none"
  );
  document.getElementById("menu-tienda").style.display = "flex";
  objetoSeleccionado = null;
  ["detalles-objeto","detalles-venta"].forEach(id => {
    const d = document.getElementById(id);
    if (d) d.style.display = "none";
  });
}

function mostrarObjetosVendedor() {
  const list = document.getElementById("opciones-compra");
  list.innerHTML = "";
  vendedor.inventario.forEach(obj => {
    const div = document.createElement("div");
    div.className = "objeto";
    div.textContent = obj.nombre;
    div.onclick = () => {
      objetoSeleccionado = obj;
      mostrarDetallesObjeto(obj);
    };
    list.appendChild(div);
  });
}

function mostrarDetallesObjeto(obj) {
  const det = document.getElementById("detalles-objeto");
  det.style.display = "block";
  det.innerHTML = `
    <h3>${obj.nombre}</h3>
    <p>${obj.descripcion}</p>
    <p>Precio: ${obj.precio} oro</p>
  `;
}

function confirmarCompra() {
  if (!objetoSeleccionado) return alert("Selecciona un objeto primero.");
  const exito = vendedor.venderAJugador(personaje, objetoSeleccionado.nombre);
  if (exito) {
    guardarPartida(personaje);
    alert(`Has comprado ${objetoSeleccionado.nombre}.`);
    volverAlMenu();
  } else {
    alert("No tienes suficiente oro.");
  }
}

function mostrarInventarioJugador() {
  const list = document.getElementById("opciones-venta");
  list.innerHTML = "";
  personaje.inventario.inventario.forEach(obj => {
    if (!obj) return;
    const div = document.createElement("div");
    div.className = "objeto";
    div.textContent = obj.nombre;
    div.onclick = () => {
      objetoSeleccionado = obj;
      mostrarDetallesVenta(obj);
    };
    list.appendChild(div);
  });
}

function mostrarDetallesVenta(obj) {
  const det = document.getElementById("detalles-venta");
  det.style.display = "block";
  det.innerHTML = `
    <h3>${obj.nombre}</h3>
    <p>${obj.descripcion}</p>
    <p>Te lo compro por: ${Math.floor(obj.precio/2)} oro</p>
  `;
}

function confirmarVenta() {
  if (!objetoSeleccionado) return alert("Selecciona un objeto primero.");
  const exito = vendedor.comprarDelJugador(personaje, objetoSeleccionado.nombre);
  if (exito) {
    guardarPartida(personaje);
    alert(`Has vendido ${objetoSeleccionado.nombre}.`);
    volverAlMenu();
  } else {
    alert("No se pudo completar la venta.");
  }
}