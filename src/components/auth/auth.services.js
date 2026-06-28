// validaciones de los formularios de autenticacion (mismo criterio que el backend).

export const validarEmail = (email) => {
  // regex basico que pide algo@algo.algo sin espacios
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validarPassword = (password, minLength) => {
  if (!password) {
    return false;
  }
  // si me pasan un minimo de largo chequeo que la pass lo cumpla
  if (minLength && password.length < minLength) {
    return false;
  }
  return true;
};

// valida los datos del login y devuelve { error, mensaje }.
export const validarLogin = ({ email, password }) => {
  const resultado = { error: false, mensaje: '' };

  if (!email || !validarEmail(email)) {
    resultado.error = true;
    resultado.mensaje = 'Ingresa un email valido';
  } else if (!validarPassword(password, 6)) {
    resultado.error = true;
    resultado.mensaje = 'La contraseña debe tener al menos 6 caracteres';
  }

  return resultado;
};
