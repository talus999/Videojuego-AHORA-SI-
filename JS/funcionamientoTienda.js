import { guardarPartida, cargarPersonaje } from "./codigo.js";
import { Personaje } from "./Personaje.js";

let personaje;

document.addEventListener("DOMContentLoaded", function(){
    const datos = cargarPersonaje();
    personaje = new Personaje(datos);
});

document.getElementById("salir").addEventListener("click", () => {
    guardarPartida(personaje);
    window.location.href = "aldea.html";
});

document.getElementById("comprar").addEventListener("click", () => {
    
});

document.getElementById("vender").addEventListener("click", () => {

});