// validaciones de autenticacion del backend.
// se mantiene el mismo criterio que en el frontend para avisar al usuario en caso de error.

// chequeo basico de que el email tenga formato algo@algo.algo
const validarEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validarPassword = (password, minLength) => {
  if (!password) {
    return false;
  }
  if (minLength && password.length < minLength) {
    return false;
  }
  return true;
};

// valida el body del login. devuelve { error, mensaje }.
const validarLogin = (body) => {
  const resultado = {
    error: false,
    mensaje: ''
  };

  const { email, password } = body || {};

  if (!email || !validarEmail(email)) {
    resultado.error = true;
    resultado.mensaje = 'El email es invalido';
  } else if (!validarPassword(password, 6)) {
    resultado.error = true;
    resultado.mensaje = 'La contraseña es invalida';
  }

  return resultado;
};

module.exports = {
  validarEmail,
  validarPassword,
  validarLogin
};
