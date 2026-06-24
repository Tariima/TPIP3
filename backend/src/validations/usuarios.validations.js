// Validaciones de usuarios del backend (alta y edicion).
// Se mantiene el mismo criterio que en el frontend para avisar al usuario en caso de error.

const { validarEmail, validarPassword } = require('./auth.validations');

// Valida el body del alta de usuario. Devuelve { error, mensaje }.
const validarCrearUsuario = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { nombreCompleto, email, password, rolId } = body || {};

  if (!nombreCompleto || !nombreCompleto.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre completo es obligatorio';
  } else if (!email || !validarEmail(email)) {
    resultado.error = true;
    resultado.mensaje = 'El email es invalido';
  } else if (!validarPassword(password, 6)) {
    resultado.error = true;
    resultado.mensaje = 'La contraseña debe tener al menos 6 caracteres';
  } else if (!rolId) {
    resultado.error = true;
    resultado.mensaje = 'Debe seleccionar un rol';
  }

  return resultado;
};

// Valida el body de la edicion de usuario (no se modifica la contraseña).
const validarActualizarUsuario = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { nombreCompleto, email } = body || {};

  if (!nombreCompleto || !nombreCompleto.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre completo es obligatorio';
  } else if (!email || !validarEmail(email)) {
    resultado.error = true;
    resultado.mensaje = 'El email es invalido';
  }

  return resultado;
};

module.exports = {
  validarCrearUsuario,
  validarActualizarUsuario
};
