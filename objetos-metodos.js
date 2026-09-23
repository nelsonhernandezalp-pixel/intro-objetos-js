// ejemplo de objeto con metodos

// datos de un producto
const producto = {
    id:"p-07",
    nombre:"Agua de horchata",
    precio:15,
    categoria:"bebida",
    disponible:true,

    // metodos
    resumen() {
        return this.nombre + " - $" + this.precio + " (" + this.categoria + ")";
    },
    estadisponible(){
        return this.disponible;
    }

}

// paso uno mostrando el objeto
console.log("---objeto completo")
console.log(producto);