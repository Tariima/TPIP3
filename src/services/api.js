// aca junto todas las llamadas al backend (categorias, productos, mesas, cuentas)
import { mesaAuthHeader } from "./mesa/mesa.session";

// si hay VITE_API_URL la uso; si no, vacio = url relativa y el proxy de vite la manda al backend
export const API_URL = import.meta.env.VITE_API_URL || "";
export const API_BASE_URL = `${API_URL}/api`;

// construye el error de la respuesta; si el backend rechazo el token de mesa
// (401/403) lo marca como sesionExpirada para que el componente cierre la
// sesion a traves del contexto y redirija al pin.
const errorDeRespuesta = (response, mensaje) => {
  const error = new Error(mensaje);
  if (response.status === 401 || response.status === 403) {
    error.sesionExpirada = true;
  }
  return error;
};

export const obtenerPruebaBackend = async () => {
  const respuesta = await fetch(`${API_BASE_URL}/prueba`);
  if (!respuesta.ok) throw new Error("No se pudo conectar con el backend");
  return respuesta.json();
};

export const obtenerCategorias = async () => {
  const respuesta = await fetch(`${API_BASE_URL}/categorias`);
  if (!respuesta.ok) throw new Error("No se pudieron obtener las categorias");
  return respuesta.json();
};

export const obtenerProductos = async () => {
  const respuesta = await fetch(`${API_BASE_URL}/productos`);
  if (!respuesta.ok) throw new Error("No se pudieron obtener los productos");
  return respuesta.json();
};

export const obtenerMesaPorNumero = async (numero) => {
  const respuesta = await fetch(`${API_BASE_URL}/mesas/numero/${numero}`);
  if (!respuesta.ok) throw new Error("Mesa no encontrada");
  return respuesta.json();
};

export const obtenerCuentasMesa = async (mesaId) => {
  // mando el token de mesa en el header porque esta ruta esta protegida
  const respuesta = await fetch(`${API_BASE_URL}/mesas/${mesaId}/cuentas`, {
    headers: { ...mesaAuthHeader() },
  });
  if (!respuesta.ok) throw errorDeRespuesta(respuesta, "Error al obtener cuentas");
  return respuesta.json();
};

export const crearCuentaMesa = async (mesaId, nombre) => {
  const respuesta = await fetch(`${API_BASE_URL}/mesas/${mesaId}/cuentas`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ nombre }),
  });
  if (!respuesta.ok) throw errorDeRespuesta(respuesta, "Error al crear cuenta");
  return respuesta.json();
};

// trae solo los pedidos del cliente segun el token de su mesa
export const listarMisPedidos = async () => {
  const respuesta = await fetch(`${API_BASE_URL}/pedidos/cliente`, {
    method: "GET",
    headers: { ...mesaAuthHeader() },
  });
  if (!respuesta.ok) throw errorDeRespuesta(respuesta, "Error al obtener los pedidos");
  return respuesta.json();
};
