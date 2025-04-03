import { guardarPartida, cargarPersonaje } from "./codigo.js";
import { Personaje } from "./Personaje.js";
import { Vendedor } from "./Vendedor.js";
import { Inventario } from "./Inventario.js";

let personaje;
let vendedor;
let objetoSeleccionado = null;

document.addEventListener("DOMContentLoaded", function(){
    vendedor = new Vendedor();
    const datos = cargarPersonaje();
    personaje = new Personaje(datos);
});

document.getElementById("salir").addEventListener("click", () => {
    guardarPartida(personaje);
    window.location.href = "aldea.html";
});

document.getElementById("comprar").addEventListener("click", () => {
    document.getElementById("menu-tienda").style.display = "none";
    document.getElementById("contenedor-compra").style.display = "flex";
    
    mostrarObjetosVendedor();
});

document.getElementById("confirmar-compra").addEventListener("click", () => {
    if (objetoSeleccionado && personaje.oro >= objetoSeleccionado.precio) {
        personaje.oro -= objetoSeleccionado.precio;
        personaje.inventario.añadirAInventario(objetoSeleccionado);
        console.log(`Has comprado ${objetoSeleccionado.descripcion}.`);

        volverAlMenu();
    } else {
        alert("No tienes suficiente oro o no has seleccionado un objeto.");
    }
});

function mostrarObjetosVendedor() {
    let listaObjetos = document.getElementById("lista-objetos");
    listaObjetos.innerHTML = ""; // Limpiar lista

    vendedor.inventario.forEach(objeto => {
        let item = document.createElement("div");
        item.classList.add("objeto");
        item.textContent = objeto.descripcion;
        
        item.addEventListener("click", () => {
            objetoSeleccionado = objeto;
            mostrarDetallesObjeto(objeto);
        });

        listaObjetos.appendChild(item);
    });
}

function mostrarDetallesObjeto(objeto) {
    let detalles = document.getElementById("detalles-objeto");
    detalles.style.display = "block";

    document.getElementById("descripcion-objeto").textContent = objeto.descripcion;
    document.getElementById("precio-objeto").textContent = `Precio: ${objeto.precio} oro`;
}

document.getElementById("vender").addEventListener("click", () => {

});

function volverAlMenu() {
    document.getElementById("contenedor-compra").style.display = "none";
    document.getElementById("menu-tienda").style.display = "flex";
    document.getElementById("detalles-objeto").style.display = "none";
}