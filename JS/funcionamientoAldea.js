import { guardarPartida, cargarPersonaje } from "./codigo.js";
import { Personaje } from "./Personaje.js";
import { Vendedor } from "./Vendedor.js";

let personaje;

document.addEventListener("DOMContentLoaded", function() {
    const datos = cargarPersonaje();
    personaje = new Personaje(datos);

    document.getElementById("btnInventario").addEventListener("click", function () {
        document.getElementById("btnVolver").style.display = "none";
        document.getElementById("btnTienda").style.display = "none";
        document.getElementById("btnInventario").style.display = "none";
    
        const contenedor = document.getElementById("contenedorInventario");
        const arma = document.getElementById("armaActual");
        const lista = document.getElementById("listaInventario");
    
        const objetos = personaje.inventario.inventario || [];
    
        arma.innerHTML = "<h3>Arma equipada</h3><p>" + (personaje.armaEquipada?.nombre || "Ninguna") + "</p>";
        lista.innerHTML = "<h3>Inventario</h3><ul>" +
            objetos
                .filter(obj => obj !== null)
                .map(obj => `<li>${obj.nombre}</li>`)
                .join('') +
            "</ul>";
    
        contenedor.style.display = "flex";
    });

    document.getElementById("cerrarInventario").addEventListener("click", function () {
        document.getElementById("contenedorInventario").style.display = "none";
        document.getElementById("btnVolver").style.display = "inline-block";
        document.getElementById("btnTienda").style.display = "inline-block";
        document.getElementById("btnInventario").style.display = "inline-block";
    });

    document.getElementById("btnVolver").addEventListener("click", function()  {
        console.log(personaje);
        guardarPartida(personaje);
        window.location.href = "base.html";
    });

    document.getElementById("btnTienda").addEventListener("click", function()  {
        window.location.href = "tienda.html";
    });
});