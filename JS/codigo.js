import { Personaje } from "./Personaje.js";


export function guardarPartida(personaje) {   
    debugger;
    localStorage.setItem("nivel", personaje.nivel);
    localStorage.setItem("experiencia", personaje.experiencia);
    localStorage.setItem("experienciaNecesaria", personaje.experienciaNecesaria);
    localStorage.setItem("armaduraBase", personaje.armaduraBase);
    localStorage.setItem("velocidadBase", personaje.velocidadBase);
    localStorage.setItem("oro", personaje.oro);
    localStorage.setItem("inventario",JSON.stringify(personaje.inventario.items));
    localStorage.setItem("armaEquipada", JSON.stringify(personaje.armaEquipada));
    console.log("¡Partida guardada!");
}

export function cargarPersonaje(){
    const datos = {
        nombre: localStorage.getItem("nombre") || "Protagonista Generico",
        nivel: parseInt(localStorage.getItem("nivel")) || 1,
        experiencia: parseInt(localStorage.getItem("experiencia")) || 0,
        experienciaNecesaria: parseInt(localStorage.getItem("experienciaNecesaria")) || 20,
        armaduraBase: parseInt(localStorage.getItem("armaduraBase")) || 2,
        velocidadBase: parseInt(localStorage.getItem("velocidadBase")) || 4,
        oro: parseInt(localStorage.getItem("oro")) || 0,
        inventario: JSON.parse(localStorage.getItem("inventario")),
        armaEquipada: JSON.parse(localStorage.getItem("armaEquipada"))
    };

    if (datos.inventario) {
        const inventario = new Inventario();
        datos.inventario.forEach((item, index) => {
            if (index < inventario.capacidad) {
                inventario.inventario[index] = item;
            }
        });

        datos.inventario = inventario;
    }

    return datos;


}

