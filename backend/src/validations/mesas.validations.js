// Validaciones de mesas del backend.
// Se mantiene el mismo criterio que en el frontend para avisar al usuario en caso de error.

// Valida el body de una mesa. Devuelve { error, mensaje }.
const validarMesa = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { numero } = body || {};

  if (numero === undefined || numero === null || numero === '' || isNaN(Number(numero)) || Number(numero) <= 0) {
    resultado.error = true;
    resultado.mensaje = 'El numero de mesa debe ser un numero mayor a 0';
  } else if (!Number.isInteger(Number(numero))) {
    resultado.error = true;
    resultado.mensaje = 'El numero de mesa debe ser un numero entero';
  }

  return resultado;
};

module.exports = {
  validarMesa
};
