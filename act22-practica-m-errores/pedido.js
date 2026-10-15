// ======================================
// Ejercicio para manejo de errores - rompe el pedido a proposito - REFERENCIA
// =========================================

// ---------- Paso 1 · Nuestro error, con código HTTP ----------
export class AppError extends Error {
  constructor(mensaje, codigo = 400) {
    super(mensaje);
    this.name = "AppError";
    this.codigo = codigo;
  }
}
// PASO 2 --------- Datos de prueba 
const productos = [
    {id:"p-01", nombre:"Molletes", precio:30, disponible:true},
    {id:"p-02", nombre:"Jugo de naranja", precio:18, disponible:false}, // agotado
    {id:"p-03", nombre:"Gelatina", precio:12, disponible:true},
];

const HORA_CORTE = 13 ;
// PASO 3 -------- Las 5 guardas
export function crearPedido({productoId, cantidad, hora}){
    if(!productoId){
        throw new AppError("Falta indicar el producto", 400);
    }
    if(!Number.isInteger(cantidad) || cantidad <= 0){
        throw new AppError("La cantidad debe ser un numero entero mayor que cero", 400)
    }
    if(hora>HORA_CORTE){
        throw new AppError("Ya cerro el horario de pedidos", 400)
    }


// hay que ir a buscar
const producto = producto.find ((p) => p.id== productoId);
if(!producto){
    throw new AppError("Producto No encontrado", 404);
}
if(!producto.disponible){
    throw new AppError("El producto esta agotado", 409)
}

// Creando return para leer facil
return {
    folio: "PR-" + Math.floor(Math.random() * 10000),
    producto: producto.nombre,
    cantidad,
    total: producto.precio * cantidad
    };
}

// ---------- Paso 4 · El controlador atrapa y traduce ----------
export function controladorCrearPedido(body) {
  try {
    const pedido = crearPedido(body);
    return { ok: true, codigoHttp: 201, data: pedido };
  } catch (error) {
    // Siempre queda registro para MÍ, en mi consola
    console.error("  [log interno]", error.name + ":", error.message);

    if (error instanceof AppError) {
      // Error que yo lancé a propósito: el mensaje es seguro de mostrar
      return {
        ok: false,
        codigoHttp: error.codigo,
        error: { mensaje: error.message, detalles: [] }
      };
    }

    // Error inesperado: NUNCA se le enseña el mensaje original al cliente,
    // puede traer rutas de archivos u otros detalles internos.
    return {
      ok: false,
      codigoHttp: 500,
      error: { mensaje: "Error interno del servidor", detalles: [] }
    };
  }
}

// ---------- Reto opcional: acumular todos los errores ----------
export function validarPedido({ productoId, cantidad }) {
  const detalles = [];
  if (!productoId) detalles.push("Falta indicar el producto");
  if (!Number.isInteger(cantidad) || cantidad <= 0)
    detalles.push("La cantidad debe ser un número entero mayor que cero");

  if (detalles.length > 0) {
    const e = new AppError("Datos inválidos", 400);
    e.detalles = detalles;
    throw e;
  }
  return true;
}