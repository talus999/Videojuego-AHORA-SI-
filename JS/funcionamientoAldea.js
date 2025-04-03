import { guardarPartida, cargarPersonaje } from "./codigo.js";
import { Personaje } from "./Personaje.js";
import { Vendedor } from "./Vendedor.js";

let personaje;

document.addEventListener("DOMContentLoaded", function(){
    const datos = cargarPersonaje();
    personaje = new Personaje(datos);
});

document.getElementById("btnVolver").addEventListener("click", function()  {
    console.log(personaje)
    guardarPartida(personaje);
    window.location.href = "base.html";
});

document.getElementById("btnTienda").addEventListener("click", function()  {
    window.location.href = "tienda.html";
});