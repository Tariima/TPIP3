// llamadas al backend para listar pedidos y cambiarles el estado
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// headers con el token para que el backend autorice la peticion
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('tpip3-token')}`
});

// estados posibles de un pedido (deben coincidir con los del backend).
export const ESTADOS_PEDIDO = ['pendiente', 'en preparacion', 'listo', 'entregado', 'cancelado'];

export const listarPedidos = async () => {
  const res = await fetch(`${API_URL}/api/pedidos`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error al obtener los pedidos');
  return res.json();
};

// uso patch porque solo toco el estado y no el pedido entero
export const actualizarEstadoPedido = async (id, estado) => {
  const res = await fetch(`${API_URL}/api/pedidos/${id}/estado`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ estado })
  });
  if (!res.ok) throw new Error('Error al actualizar el estado del pedido');
  return res.json();
};

export const eliminarPedido = async (id) => {
  const res = await fetch(`${API_URL}/api/pedidos/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Error al eliminar el pedido');
  return res.json();
};
