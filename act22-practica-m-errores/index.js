//===============================================================================================
import { controladorCrearPedido, validarPedido } from "./pedido.js";

const casos = [
  ["201 · todo bien",        { productoId: "p-01", cantidad: 2,   hora: 10 }],
  ["400 · falta producto",   {                     cantidad: 2,   hora: 10 }],
  ["400 · cantidad cero",    { productoId: "p-01", cantidad: 0,   hora: 10 }],
  ["400 · cantidad texto",   { productoId: "p-01", cantidad: "3", hora: 10 }],
  ["409 · fuera de horario", { productoId: "p-01", cantidad: 2,   hora: 15 }],
  ["404 · no existe",        { productoId: "p-99", cantidad: 2,   hora: 10 }],
  ["409 · agotado",          { productoId: "p-02", cantidad: 2,   hora: 10 }]
];

for (const [etiqueta, body] of casos) {
  console.log("\n=== " + etiqueta + " ===");
  const r = controladorCrearPedido(body);
  console.log("  HTTP " + r.codigoHttp, JSON.stringify(r.ok ? r.data : r.error));
}

// ---------- Paso 6 · el catch vacío ----------
// try { crearPedido({ cantidad: 0 }); } catch (e) { }
// ← Esto esconde la falla por completo: el pedido no se creó y NADIE se entera.
//   El usuario ve la pantalla normal y cree que su pedido está hecho.
//   Un catch o RESUELVE el problema, o INFORMA de él. Callarlo nunca es opción.

// ---------- Reto opcional ----------
//Agrega una guarda que acumule todos los errores de validación en vez de detenerse
// en el primero, y los devuelva juntos en error.detalles.
// Así el frontend puede marcar todos los campos malos de una sola vez:
console.log("\n=== reto: todos los errores juntos ===");
try {
  validarPedido({ cantidad: 0 });
} catch (e) {
  console.log("  HTTP " + e.codigo, JSON.stringify({ mensaje: e.message, detalles: e.detalles }));
}