// Validaciones de los formularios de mesas (alta de mesa y PIN del cliente).
// Mismo criterio que el backend para avisar al usuario en caso de error.

// Valida los datos de una mesa y devuelve { error, mensaje }.
export const validarMesa = ({ numero }) => {
  const resultado = { error: false, mensaje: '' };

  if (numero === '' || numero === null || numero === undefined || isNaN(Number(numero)) || Number(numero) <= 0) {
    resultado.error = true;
    resultado.mensaje = 'El número de mesa debe ser un número mayor a 0';
  } else if (!Number.isInteger(Number(numero))) {
    resultado.error = true;
    resultado.mensaje = 'El número de mesa debe ser un número entero';
  }

  return resultado;
};

// Valida el PIN de acceso del cliente (4 digitos) y devuelve { error, mensaje }.
export const validarPin = (pin) => {
  const resultado = { error: false, mensaje: '' };

  if (!/^\d{4}$/.test(pin || '')) {
    resultado.error = true;
    resultado.mensaje = 'El PIN debe tener 4 dígitos';
  }

  return resultado;
};
