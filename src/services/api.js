import { mesaAuthHeader, limpiarSesionMesa } from "./mesa/mesa.session";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const API_BASE_URL = `${API_URL}/api`;

// Si el backend rechaza el token de mesa, limpiamos la sesion para forzar el PIN.
const verificarAcceso = (response) => {
  if (response.status === 401 || response.status === 403) {
    limpiarSesionMesa();
  }
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
  const respuesta = await fetch(`${API_BASE_URL}/mesas/${mesaId}/cuentas`, {
    headers: { ...mesaAuthHeader() },
  });
  if (!respuesta.ok) {
    verificarAcceso(respuesta);
    throw new Error("Error al obtener cuentas");
  }
  return respuesta.json();
};

export const crearCuentaMesa = async (mesaId, nombre) => {
  const respuesta = await fetch(`${API_BASE_URL}/mesas/${mesaId}/cuentas`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ nombre }),
  });
  
  if (!respuesta.ok) {
    verificarAcceso(respuesta);
    throw new Error("Error al crear cuenta");
  }
  return respuesta.json();
};

export const listarMisPedidos = async () => {
  const respuesta = await fetch(`${API_BASE_URL}/pedidos/cliente`, {
    method: "GET",
    headers: { ...mesaAuthHeader() },
  });
  
  if (!respuesta.ok) {
    verificarAcceso(respuesta);
    throw new Error("Error al obtener los pedidos");
  }
  
  return respuesta.json();
};