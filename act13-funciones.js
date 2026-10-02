// Actividad 13 Funciones y funciones flecha

// -------- PASO 1 Y 2 Funciones normales -------
                                           
function calcularTotal(precio, cantidad=1){
    return precio * cantidad;
} 

 function esPedidoValido(cantidad){
return cantidad>0;
 }

 function formatearPrecio(monto){
    return "$" + monto.toFixed(2);
 }

 console.log("-------- PASO 1 Y 2---------");
 console.log(calcularTotal(35,2));
 console.log(esPedidoValido(0));
 console.log(formatearPrecio(35));




 //  --PASO 3 las mismas funciones pero en flecha -------- 
 const calcularTotal2 = (precio, cantidad=1) => precio * cantidad;
 const esPedidoValido2 = (cantidad) => cantidad >0;
 const formatearPrecio2 = (monto) => "$" + monto.toFixed(2);
 console.log("------- PASO 3 ------")
 console.log(calcularTotal2(35,2));
 console.log(esPedidoValido2(0));
 console.log(formatearPrecio2(35));