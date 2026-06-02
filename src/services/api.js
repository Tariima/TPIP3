const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const obtenerPruebaBackend = async () => {
  const respuesta = await fetch(`${API_URL}/api/prueba`);

  if (!respuesta.ok) {
    throw new Error('No se pudo conectar con el backend');
  }

  return respuesta.json();
};
