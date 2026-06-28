// validaciones de usuarios del backend (alta y edicion).
// se mantiene el mismo criterio que en el frontend para avisar al usuario en caso de error.

const { validarEmail, validarPassword } = require('./auth.validations');

// valida el body del alta de usuario. devuelve { error, mensaje }.
const validarCrearUsuario = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { nombreCompleto, email, password, rolId } = body || {};

  // para dar de alta pido nombre, email valido, password de 6 o mas y un rol
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

// valida el body de la edicion de usuario (no se modifica la contrasena).
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
