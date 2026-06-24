// Validaciones del formulario de usuarios (alta y edicion).
// Mismo criterio que el backend para avisar al usuario en caso de error.

import { validarEmail, validarPassword } from '../auth/auth.services';

// Valida los datos de un usuario y devuelve { error, mensaje }.
// En la edicion no se pide la contraseña, por eso el parametro esEdicion.
export const validarUsuario = ({ nombreCompleto, email, password, rolId }, esEdicion = false) => {
  const resultado = { error: false, mensaje: '' };

  if (!nombreCompleto || !nombreCompleto.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre completo es obligatorio';
  } else if (!email || !validarEmail(email)) {
    resultado.error = true;
    resultado.mensaje = 'Ingresa un email valido';
  } else if (!esEdicion && !validarPassword(password, 6)) {
    resultado.error = true;
    resultado.mensaje = 'La contraseña debe tener al menos 6 caracteres';
  } else if (!rolId) {
    resultado.error = true;
    resultado.mensaje = 'Seleccioná un rol';
  }

  return resultado;
};
