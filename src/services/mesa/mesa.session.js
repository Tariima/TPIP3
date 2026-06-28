// maneja la sesion de la mesa guardada en sessionStorage (token, id y numero)
import { isTokenValid } from '../../components/auth/auth.helpers';

// claves de la sesion temporal del cliente (se borra al cerrar la pestana).
const MESA_TOKEN_KEY = 'tpip3-mesa-token';
const MESA_ID_KEY = 'tpip3-mesa-id';
const MESA_NUMERO_KEY = 'tpip3-mesa-numero';

// guarda la sesion de mesa al validar el pin.
export const guardarSesionMesa = ({ mesaToken, mesaId, numero }) => {
  sessionStorage.setItem(MESA_TOKEN_KEY, mesaToken);
  sessionStorage.setItem(MESA_ID_KEY, String(mesaId));
  sessionStorage.setItem(MESA_NUMERO_KEY, String(numero));
};

export const obtenerMesaToken = () => sessionStorage.getItem(MESA_TOKEN_KEY);
export const obtenerMesaId = () => sessionStorage.getItem(MESA_ID_KEY);
export const obtenerMesaNumero = () => sessionStorage.getItem(MESA_NUMERO_KEY);

// limpia la sesion (al cerrar la mesa o cuando el token expira/es rechazado).
export const limpiarSesionMesa = () => {
  sessionStorage.removeItem(MESA_TOKEN_KEY);
  sessionStorage.removeItem(MESA_ID_KEY);
  sessionStorage.removeItem(MESA_NUMERO_KEY);
};

// indica si hay un token de mesa presente y todavia no expirado.
export const sesionMesaValida = () => isTokenValid(obtenerMesaToken());

// header de autorizacion para las llamadas protegidas del cliente.
export const mesaAuthHeader = () => ({ Authorization: `Bearer ${obtenerMesaToken()}` });
