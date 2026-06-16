import { API_BASE_URL } from "../api";

export const obtenerCarrito = async (cuentaId) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items`);
  if (!response.ok) throw new Error("Error al obtener el carrito");
  return response.json();
};

export const agregarAlCarrito = async (cuentaId, productoId, cantidad) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productoId, cantidad }),
  });
  if (!response.ok) throw new Error("Error al agregar al carrito");
  return response.json();
};

export const actualizarCantidad = async (cuentaId, itemId, cantidad) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });
  if (!response.ok) throw new Error("Error al actualizar cantidad");
  return response.json();
};

export const eliminarDelCarrito = async (cuentaId, itemId) => {
  const response = await fetch(`${API_BASE_URL}/cuentas/${cuentaId}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar del carrito");
  return response.json();
};
