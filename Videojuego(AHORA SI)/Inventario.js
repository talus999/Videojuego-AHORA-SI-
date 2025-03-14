class Inventario {
    constructor(){
        this.capacidad = 5;
        this.items = new Array (this.capacidad).fill(null);
    }

    añadirAInventario(objeto) {
        if (this.items.length < this.capacidad) {
            this.items.push(objeto);
            console.log(`${objeto} se ha añadido al inventario`)
        } else {
            console.log(`Tu inventario esta lleno, idiota.`)
        }
    }

    tirarObjeto(objeto){
        if (this.items.indexOf(objeto) !== -1){
            this.items
        }
    }

}