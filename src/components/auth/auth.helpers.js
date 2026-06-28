// funciones auxiliares para chequear los tokens jwt
import { jwtDecode } from 'jwt-decode';

// indica si el token existe y todavia no expiro.
export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    // paso a segundos porque el exp del jwt viene en segundos y comparo si todavia no vencio
    const ahora = Date.now() / 1000;
    return ahora < decoded.exp;
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return false;
  }
};
