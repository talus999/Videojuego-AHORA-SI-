document.getElementById("btnVolver").addEventListener("click", () => {
    guardarPartida(personaje);
    window.location.href = "base.html";
});

document.getElementById("btnTienda").addEventListener("click", () => {
    window.location.href = "tienda.html";
});