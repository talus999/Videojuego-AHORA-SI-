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

    document.getElementById("salir").addEventListener("click", () => {
        guardarPartida(personaje);
        window.location.href = "aldea.html";
    });
});

document.getElementById("comprar").addEventListener("click", () => {
    document.getElementById("menu-tienda").style.display = "none";
    document.getElementById("contenedor-compra").style.display = "flex";
    
    mostrarObjetosVendedor();
});

document.getElementById("confirmar-compra").addEventListener("click", () => {
    if (objetoSeleccionado) {
        const resultado = vendedor.venderAJugador(personaje, objetoSeleccionado.nombre);
        if (resultado) {
            volverAlMenu();
        } else {
            alert("No se pudo completar la compra.");
        }
    }
});

document.getElementById("cancelar-compra").addEventListener("click", () => {
    volverAlMenu();
});

function mostrarObjetosVendedor() {
    let listaObjetos = document.getElementById("opciones-compra");
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
    const detalles = document.getElementById("detalles-objeto");
    detalles.style.display = "block";
    detalles.innerHTML = `
        <h3>${objeto.nombre}</h3>
        <p>${objeto.descripcion}</p>
        <p>Precio: ${objeto.precio} oro</p>
    `;
}

document.getElementById("vender").addEventListener("click", () => {
    document.getElementById("menu-tienda").style.display = "none";
    document.getElementById("contenedor-venta").style.display = "flex";
    mostrarInventarioJugador();
});

function mostrarInventarioJugador() {
    let listaVenta = document.getElementById("opciones-venta");
    listaVenta.innerHTML = "";

    personaje.inventario.inventario.forEach(objeto => {
        if (!objeto) return;

        let item = document.createElement("div");
        item.classList.add("objeto");
        item.textContent = objeto.descripcion;

        item.addEventListener("click", () => {
            objetoSeleccionado = objeto;
            mostrarDetallesVenta(objeto);
        });

        listaVenta.appendChild(item);
    });
}

function mostrarDetallesVenta(objeto) {
    let detalles = document.getElementById("detalles-venta");
    detalles.style.display = "block";

    detalles.innerHTML = `
        <h3>${objeto.nombre}</h3>
        <p>${objeto.descripcion}</p>
        <p>Te lo compro por: ${Math.floor(objeto.precio / 2)} oro</p>
    `;
}


document.getElementById("confirmar-venta").addEventListener("click", () => {
    const resultado = vendedor.comprarDelJugador(personaje, objeto.nombre);
    if (resultado) {
        volverAlMenu();
    } else {
        alert("No se pudo completar la venta.");
    }
});

document.getElementById("cancelar-venta").addEventListener("click", () => {
    volverAlMenu();
});

function volverAlMenu() {
    document.getElementById("contenedor-compra").style.display = "none";
    document.getElementById("contenedor-venta").style.display = "none";
    document.getElementById("menu-tienda").style.display = "flex";
    document.getElementById("detalles-objeto").style.display = "none";
    document.getElementById("detalles-venta").style.display = "none";
}