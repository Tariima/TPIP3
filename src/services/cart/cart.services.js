import { API_BASE_URL } from "../api";
import { mesaAuthHeader, limpiarSesionMesa } from "../mesa/mesa.session";

// Si el backend rechaza el token de mesa, limpiamos la sesion para forzar el PIN.
const verificarAcceso = (response) => {
  if (response.status === 401 || response.status === 403) {
    limpiarSesionMesa();
  }
};

export const obtenerCarrito = async (cuentaId) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items`, {
    headers: { ...mesaAuthHeader() },
  });
  if (!response.ok) {
    verificarAcceso(response);
    throw new Error("Error al obtener el carrito");
  }
  return response.json();
};

export const agregarAlCarrito = async (cuentaId, productoId, cantidad) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ productoId, cantidad }),
  });
  if (!response.ok) {
    verificarAcceso(response);
    throw new Error("Error al agregar al carrito");
  }
  return response.json();
};

export const actualizarCantidad = async (cuentaId, itemId, cantidad) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ cantidad }),
  });
  if (!response.ok) {
    verificarAcceso(response);
    throw new Error("Error al actualizar cantidad");
  }
  return response.json();
};

export const eliminarDelCarrito = async (cuentaId, itemId) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...mesaAuthHeader() },
  });
  if (!response.ok) {
    verificarAcceso(response);
    throw new Error("Error al eliminar del carrito");
  }
  return response.json();
};
