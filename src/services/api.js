const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const obtenerPruebaBackend = async () => {
  const respuesta = await fetch(`${API_URL}/api/prueba`);

  if (!respuesta.ok) {
    throw new Error("No se pudo conectar con el backend");
  }

  return respuesta.json();
};

export const obtenerCategorias = async () => {
  const respuesta = await fetch(`${API_URL}/api/categorias`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las categorias");
  }

  return respuesta.json();
};

export const obtenerProductos = async () => {
  const respuesta = await fetch(`${API_URL}/api/productos`);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return respuesta.json();
};
