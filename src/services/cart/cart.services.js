import { API_BASE_URL } from "../api";
import { mesaAuthHeader } from "../mesa/mesa.session";

// Construye el error de la respuesta; si el backend rechazo el token de mesa
// (401/403) lo marca como sesionExpirada para que el componente cierre la
// sesion a traves del contexto y redirija al PIN.
const errorDeRespuesta = (response, mensaje) => {
  const error = new Error(mensaje);
  if (response.status === 401 || response.status === 403) {
    error.sesionExpirada = true;
  }
  return error;
};

export const obtenerCarrito = async (cuentaId) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items`, {
    headers: { ...mesaAuthHeader() },
  });
  if (!response.ok) throw errorDeRespuesta(response, "Error al obtener el carrito");
  return response.json();
};

export const agregarAlCarrito = async (cuentaId, productoId, cantidad) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ productoId, cantidad }),
  });
  if (!response.ok) throw errorDeRespuesta(response, "Error al agregar al carrito");
  return response.json();
};

export const actualizarCantidad = async (cuentaId, itemId, cantidad) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ cantidad }),
  });
  if (!response.ok) throw errorDeRespuesta(response, "Error al actualizar cantidad");
  return response.json();
};

export const eliminarDelCarrito = async (cuentaId, itemId) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...mesaAuthHeader() },
  });
  if (!response.ok) throw errorDeRespuesta(response, "Error al eliminar del carrito");
  return response.json();
};

// Confirma el carrito y lo convierte en un pedido para el personal.
export const confirmarPedido = async (cuentaId, notas) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/confirmar`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...mesaAuthHeader() },
    body: JSON.stringify({ notas }),
  });
  if (!response.ok) throw errorDeRespuesta(response, "Error al confirmar el pedido");
  return response.json();
};
