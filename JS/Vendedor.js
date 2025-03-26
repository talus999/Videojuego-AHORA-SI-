class Vendedor {
    constructor(){
        this.objetos = this.generarObjetos();
        this.inventario = this.generarInventario;
    }

    generarPoolObjetos() {
        return [
            new Arma (2, "Espada Corta", "Una simple espada corta y algo gastada", 15, 2, "Guerrero"),
            new Arma (0.8, "Daga vieja", "Un cuchillo que sirve mas para huntar mantequilla que para matar", 8, 4, "Asesino"),
            new Arma (1, "Bara de madera", "Deberia llamarse palo", 10, 2, "Mago"),
            new Consumible (0.5, "Pocion de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible (0.5, "Pocion de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible (0.5, "Super pocion de salud", "Esto esta mucho mejor", 50, "curarVida", 20),
            new Consumible (0.5, "Pocion de fortaleza", "Con esto las espadas rebotan", 250, "aumentarDefensa", 2),
        ];
    }

    generarInventario(){
        const inventario = [];
        const todosLosObjetos = this.objetos;

        while (inventario.length < 5 && objetosDisponibles.length > 0){
            let indiceRandom = Math.floor(Math.random()*todosLosObjetos.length);
            let objetoParaVender = todosLosObjetos.splice(indiceRandom,1)[0];
            inventario.push(objetoParaVender);
        }

        return inventario;
    }

    vender(){

    }
}