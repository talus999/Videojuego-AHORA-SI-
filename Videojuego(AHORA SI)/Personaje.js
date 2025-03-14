class Personaje{
    constructor(nombre){
        this.nombre = nombre;
        this.nivel = 1
        this.dañoBase = 4;
        this.vida = 5;
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
        this.vida -= dañoRecibido;
        alert(`${Enemigo.nombre} te ha hecho ${dañoRecibido} puntos de daño. Vida restante: ${this.vida}. `);
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
        this.experienciaNecesaria = Math.floor(this.experienciaNecesaria * 1.5);
        this.calcularEstadisticas(this.nivel);
        console.log(`Has subido de nivel, ${this.nombre}.`)
    }

    calcularEstadisticas(nivel){
        this.vida = 5 + nivel;
        this.dañoBase = 4 + nivel;
        if (this.nivel%2 == 0){
            this.armadura++
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