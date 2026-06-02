import { jwtDecode } from 'jwt-decode';

// Indica si el token existe y todavia no expiro.
export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    const ahora = Date.now() / 1000;
    return ahora < decoded.exp;
  } catch (error) {
    console.error('Error al decodificar el token', error);
    return false;
  }
};
