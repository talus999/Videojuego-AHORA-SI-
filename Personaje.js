class Personaje{
    constructor(nombre){
        this.nombre = nombre;
        this.nivel = 1
        this.dañoBase = 4;
        this.vida = 5;
        this.vidaPerdida = 0;
        this.velocidad = 4;
        this.armadura = 2;
        this.experiencia = 0;
        this.experienciaNecesaria= 20;
        this.oro = 0;
        this.inventario = new Inventario();
        this.armaEquipada = null;
    }

    recibirDaño(Enemigo){
        let dañoRecibido =  Enemigo.daño - this.armadura
        this.vidaPerdida += dañoRecibido;
        alert(`${Enemigo.nombre} te ha hecho ${dañoRecibido} puntos de daño. Vida restante: ${this.vida-this.vidaPerdida}. `);
    }

    atacar(Enemigo){
        Enemigo.recibirDaño(this);

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
            this.armadura = 2 +nivel/2
        }
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

}

class Guerrero extends Personaje {
    constructor(nombre){
        super(nombre);
        this.plusExperiencia = 1.2;
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
        this.velocidad = 6;
        this.armadura = 2;
        this.probCritico = 25;
    }

    calcularEstadisticas(nivel){
        this.vida = 3 + nivel;
        this.dañoBase = 7 + nivel;
        if (this.nivel%2 == 0){
            this.armadura = 2 + nivel/2
        }
        if (this.nivel%3 == 0){
            this.velocidad = 6 + nivel/3
        }
    }
}

class Mago extends Personaje {
    constructor(nombre) {
        super(nombre);
        this.vida = 4;
        this.dañoBase = 6;  
        this.velocidad = 5;  
        this.armadura = 1;   
        this.mana = 10;      
    }

    calcularEstadisticas(nivel){
        this.vida = 4 + nivel;
        this.dañoBase = 6 + nivel;
        if (this.nivel%2 == 0){
            this.armadura = 1 + nivel/2
            this.mana = 10 + nivel/2
        }
    }

    lanzarHechizo(Enemigo) {
        if (this.mana >= 3) {
            let daño = this.daño * 1.5;
            Enemigo.recibirDaño({ nombre: "Hechizo", daño });
            this.mana -= 3;
            console.log(`Lanzas un hechizo a ${Enemigo.nombre}.`);
        } else {
            console.log(`No tienes suficiente maná, estupido/a.`);
        }
    }
}