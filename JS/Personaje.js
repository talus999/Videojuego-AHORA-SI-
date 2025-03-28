export class Personaje{
        constructor(datos) {
            if (typeof datos === "string") {
                this.nombre = datos;
                this.nivel = 1;
                this.experiencia = 0;
                this.experienciaNecesaria = 20;
                this.oro = 0;
                this.inventario = new Inventario();
                this.armaEquipada = null;
    
            } else if (typeof datos === "object") {
                this.nombre = datos.nombre || "Protagonista Genérico";
                this.nivel = datos.nivel || 1;
                this.experiencia = datos.experiencia || 0;
                this.experienciaNecesaria = datos.experienciaNecesaria || 20;
                this.oro = datos.oro || 0;
                this.inventario = new Inventario();
                this.armaEquipada = datos.armaEquipada || null;
    
                if (datos.inventario) {
                    try {
                        let items = JSON.parse(datos.inventario);
                        if (Array.isArray(items)) {
                            this.inventario.items = items;
                        }
                    } catch (error) {
                        console.error("Error al cargar el inventario:", error);
                    }
                }
            }
            this.calcularEstadisticas(this.nivel);
            this.actualizarDaño();
        }
    



    equiparArma(arma) {
        if (this.inventario.items.includes(arma)) {
            this.armaEquipada = arma;
            this.actualizarDaño();
            console.log(`Te has equipado ${arma.descripcion}.`);
        } else {
            console.log("¿Que te quieres equipar? ¿El aire?");
        }
    }

    actualizarDaño(){
        if (this.armaEquipada != null){
            this.daño = this.dañoBase + this.armaEquipada.daño;
        } else {
            this.daño = this.dañoBase;
        }
    }

    recibirDaño(Enemigo){
        let dañoRecibido =  Enemigo.daño - this.armadura
        this.vidaPerdida += dañoRecibido;
        alert(`${Enemigo.nombre} te ha hecho ${dañoRecibido} puntos de daño. Vida restante: ${this.vida-this.vidaPerdida}. `);
    }

    atacar(Enemigo){
        Enemigo.recibirDaño(this.daño);

        if (Enemigo.vida <= 0){
            this.ganarExperiencia(Enemigo.exp);
            this.oro += Enemigo.oro;
        }
    }

    ganarExperiencia(experienciaGanada){
        this.experiencia += experienciaGanada;
        console.log(`Has conseguido ${experienciaGanada} puntos de XP... ¿Qué? ¿Quieres una chapa?`)

        while(this.experiencia >= this.experienciaNecesaria){
            this.experiencia -= this.experienciaNecesaria;
            this.subirNivel();
        }
    }
    
    subirNivel(){
        this.nivel++
        this.experienciaNecesaria = Math.floor(this.experienciaNecesaria * 2);
        this.calcularEstadisticas(this.nivel);
        console.log(`Has subido de nivel, ${this.nombre}.`)
    }

    calcularEstadisticas(nivel){
        this.vida = 5 + nivel;
        this.dañoBase = 4 + nivel;
        if (this.nivel%2 == 0){
            this.armadura = this.armaduraBase + nivel/2
        }
    }

    usarObjeto(){
        let objeto = this.inventario.buscarObjeto(nombreObjeto);

        if (objeto) {
            if (objeto instanceof Consumible) {
                objeto.usar(this);
            } else {
                console.log("Este objeto no se puede usar en combate.");
            }
        } else {
            console.log("El objeto no está en tu inventario.");
        }
    }

}
/**
 * class Guerrero extends Personaje {
    constructor(nombre){
        super(nombre);
        this.plusExperiencia = 1.8;
    }

    ganarExperiencia(experienciaGanada){
        this.experiencia += experienciaGanada * this.plusExperiencia;
        console.log(`Has conseguido ${experienciaGanada} puntos de XP... ¿Qué? ¿Quieres una chapa?`)

        while(this.experiencia >= this.experienciaNecesaria){
            this.experiencia -= this.experienciaNecesaria;
            this.subirNivel();
        }
    }
}

class Asesino extends Personaje {
    constructor (nombre){
        super(nombre);
        this.vida = 3;
        this.dañoBase = 7;
        this.velocidadBase = 6;
        this.armaduraBase = 2;
        this.probCritico = 25;
        this.dañoCritico = 2;
    }

    calcularEstadisticas(nivel){
        this.vida = 3 + nivel;
        this.dañoBase = 7 + nivel;
        if (this.nivel%2 == 0){
            this.armadura = this.armaduraBase + Math.floor(nivel / 2)
        }
        if (this.nivel%3 == 0){
            this.velocidad = this.velocidadBase + Math.floor(nivel / 3)
        }
    }

    atacar(Enemigo){
        let esCritico = Math.random() * 100 < this.probCritico;
        let dañoFinal = this.dañoBase;

        if (esCritico) {
            dañoFinal *= this.dañoCritico;
        }
        
        Enemigo.recibirDaño(dañoFinal);

        if (Enemigo.vida <= 0){
            this.ganarExperiencia(Enemigo.exp);
            this.oro += Enemigo.oro;
        }
    }
}

class Mago extends Personaje {
    constructor(nombre) {
        super(nombre);
        this.vida = 4;
        this.dañoBase = 6;  
        this.velocidadBase = 5;  
        this.armaduraBase = 1;   
        this.manaMaximo = 10; 
        this.manaActual = this.manaMaximo;     
    }

    calcularEstadisticas(nivel){
        this.vida = 4 + nivel;
        this.dañoBase = 6 + nivel;
        if (this.nivel%2 == 0){
            this.armadura = this.armaduraBase + Math.floor(nivel / 2);
            this.manaMaximo = 10 + nivel/2;
        }
    }

    lanzarHechizo(Enemigo) {
        if (this.manaActual >= 3) {
            let daño = this.daño * 1.5;
            Enemigo.recibirDaño({ nombre: "Hechizo", daño });
            this.manaActual -= 3;
            console.log(`Lanzas un hechizo a ${Enemigo.nombre}.`);
        } else {
            console.log(`No tienes suficiente maná, estupido/a.`);
        }
    }
}
 */
