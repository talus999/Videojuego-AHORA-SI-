import { guardarPartida, cargarPersonaje } from "./codigo.js";

addEventListener("DOMContentLoaded", function(){
    cargarPersonaje()
});

document.getElementById("btnVolver").addEventListener("click", function()  {
    guardarPartida(personaje);
    window.location.href = "../HTML/base.html";
});

document.getElementById("btnTienda").addEventListener("click", function()  {
    window.location.href = "./HTML/tienda.html";
});