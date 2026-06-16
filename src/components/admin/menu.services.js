const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('tpip3-token')}`
});

export const listarCategorias = async () => {
  const res = await fetch(`${API_URL}/api/menu/categorias`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
};

export const crearCategoria = async (datos) => {
  const res = await fetch(`${API_URL}/api/menu/categorias`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  });
  if (!res.ok) throw new Error('Error al crear categoría');
  return res.json();
};

export const listarProductos = async () => {
  const res = await fetch(`${API_URL}/api/menu/productos`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};

export const guardarProducto = async (producto) => {
  const isEdit = producto.id;
  const url = isEdit ? `${API_URL}/api/menu/productos/${producto.id}` : `${API_URL}/api/menu/productos`;
  const res = await fetch(url, {
    method: isEdit ? 'PUT' : 'POST',
    headers: getHeaders(),
    body: JSON.stringify(producto)
  });
  if (!res.ok) throw new Error('Error al guardar el producto');
  return res.json();
};

export const eliminarProducto = async (id) => {
  const res = await fetch(`${API_URL}/api/menu/productos/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
};