import { Personaje } from "./Personaje.js";
import { Arma, Consumible } from "./Objeto.js";

function reconstruirObjeto(obj) {
    if (!obj || !obj.tipo) return null;
    switch (obj.tipo) {
        case "arma":
            return new Arma(obj.peso, obj.nombre, obj.descripcion, obj.precio, obj.daño);
        case "consumible":
            return new Consumible(obj.peso, obj.nombre, obj.descripcion, obj.precio, obj.tipoEfecto, obj.valorEfecto);
        default:
            return null;
    }
}

export function guardarPartida(personaje) {
    localStorage.setItem("nombre", personaje.nombre);
    localStorage.setItem("nivel", personaje.nivel);
    localStorage.setItem("experiencia", personaje.experiencia);
    localStorage.setItem("experienciaNecesaria", personaje.experienciaNecesaria);
    localStorage.setItem("armaduraBase", personaje.armaduraBase);
    localStorage.setItem("velocidadBase", personaje.velocidadBase);
    localStorage.setItem("oro", personaje.oro);
    

    const rawInv = personaje.inventario.inventario.map(item => {
        if (!item) return null;
        return {
            peso: item.peso,
            nombre: item.nombre,
            descripcion: item.descripcion,
            precio: item.precio,
            ...(item instanceof Arma
                ? { daño: item.daño, tipo: "arma" }
                : item instanceof Consumible
                    ? {
                        tipoEfecto: item.tipoEfecto,
                        valorEfecto: item.valorEfecto,
                        tipo: "consumible"
                      }
                    : { tipo: null }
            )
        };
    });

    localStorage.setItem("inventario", JSON.stringify(rawInv));

    const rawArma = personaje.armaEquipada ? {
            peso: personaje.armaEquipada.peso,
            nombre: personaje.armaEquipada.nombre,
            descripcion: personaje.armaEquipada.descripcion,
            precio: personaje.armaEquipada.precio,
            daño: personaje.armaEquipada.daño,
            tipo: "arma"
        } : null;
    localStorage.setItem("armaEquipada", JSON.stringify(rawArma));

    console.log("¡Partida guardada!");
}

export function cargarPersonaje() {
    const datos = {
        nombre: localStorage.getItem("nombre") || "Protagonista Generico",
        nivel: parseInt(localStorage.getItem("nivel")) || 1,
        experiencia: parseInt(localStorage.getItem("experiencia")) || 0,
        experienciaNecesaria: parseInt(localStorage.getItem("experienciaNecesaria")) || 20,
        armaduraBase: parseFloat(localStorage.getItem("armaduraBase")) || 2,
        velocidadBase: parseFloat(localStorage.getItem("velocidadBase")) || 4,
        oro: parseInt(localStorage.getItem("oro")) || 0,
        inventario: [],
        armaEquipada: null
    };

    const rawInv = JSON.parse(localStorage.getItem("inventario")) || [];
    datos.inventario = rawInv.map(o => reconstruirObjeto(o));

    const rawArma = JSON.parse(localStorage.getItem("armaEquipada"));
    datos.armaEquipada = reconstruirObjeto(rawArma);

    return new Personaje(datos);
}
