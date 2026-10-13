import {readFileSync, writeFileSync, existsSync} from "node:fs";
import { fileURLToPath } from "node:url";
import {dirname, join} from "nodeL:path";

// ruta calculada desde este archivo, no desde donde se ejecuta node
const __dirname = dirname(fileURLToPath(import.meta.url));
export const RUTA_PRODUCTOS = join(__dirname, "productos.json");

export function leer(ruta){
    if(!existsSync(ruta)) return []; // primera vez: todavia no hay archivo
    const texto = readFileSync(ruta, "utf-8");
    return JSON.parse(texto);
}


export function guardar(ruta, datos){
    writeFileSync(ruta, JSON.stringify(datos, null, 2), "utf-8");
}