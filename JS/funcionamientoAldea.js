import { guardarPartida, cargarPersonaje } from "./codigo.js";
import { Arma } from "./Objeto.js";

let personaje;
let seleccionado = null;

document.addEventListener("DOMContentLoaded", () => {
  personaje = cargarPersonaje();

  const btnVolver = document.getElementById("btnVolver");
  const btnTienda = document.getElementById("btnTienda");
  const btnInv = document.getElementById("btnInventario");
  const cont = document.getElementById("contenedorInventario");
  const armaDiv = document.getElementById("armaActual");
  const listaDiv = document.getElementById("listaInventario");
  const btnEquipar = document.getElementById("btnEquipar");
  const btnCerrar = document.getElementById("cerrarInventario");

  btnInv.addEventListener("click", () => {
    [btnVolver, btnTienda, btnInv].forEach(btn => btn.style.display = "none");

    armaDiv.innerHTML = `<strong>Arma equipada:</strong> ${personaje.armaEquipada?.nombre || 'Ninguna'}`;

    const items = personaje.inventario.inventario || [];
    listaDiv.innerHTML = `<h3>Inventario</h3><ul id="inv-list"></ul>`;
    const ul = document.getElementById("inv-list");
    items.forEach((item, idx) => {
      if (item) {
        const li = document.createElement("li");
        li.textContent = item.nombre;
        li.className = "inv-item";
        li.dataset.idx = idx;
        ul.appendChild(li);
      }
    });

    seleccionado = null;
    btnEquipar.disabled = true;

    document.querySelectorAll(".inv-item").forEach(el => {
      el.addEventListener("click", () => {
        document.querySelectorAll(".inv-item").forEach(e => e.classList.remove("selected"));
        el.classList.add("selected");
        const idx = parseInt(el.dataset.idx);
        seleccionado = personaje.inventario.inventario[idx];
        btnEquipar.disabled = !(seleccionado instanceof Arma);
      });
    });

    cont.style.display = "flex";
  });

  btnEquipar.addEventListener("click", () => {
    if (seleccionado instanceof Arma) {
      personaje.equiparArma(seleccionado);
      guardarPartida(personaje);
      btnInv.click();
    }
  });

  btnCerrar.addEventListener("click", () => {
    cont.style.display = "none";
    [btnVolver, btnTienda, btnInv].forEach(btn => btn.style.display = "inline-block");
  });

  btnVolver.addEventListener("click", () => window.location.href = "base.html");
  btnTienda.addEventListener("click", () => window.location.href = "tienda.html");
});