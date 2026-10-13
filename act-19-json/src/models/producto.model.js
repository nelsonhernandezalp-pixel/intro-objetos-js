import { leer, guardar, RUTA_PRODUCTOS} from "../data/almacen.js"

// se lee una vez al arrancar apartir de aqui se trabaja en memoria y se guarda
// el arreglo completo0 cada vez que algo cambia.

let productos = leer(RUTA_PRODUCTOS);

// --------- Solo lee, no guardan -----
export const listar = () => productos;
export const listarDisponibles = () => productos.filter((p) => p.disponible);