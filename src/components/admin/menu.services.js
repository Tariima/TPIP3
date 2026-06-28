// llamadas al backend para el menu: productos y categorias
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// armo los headers con el token guardado asi el backend me deja pasar
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('tpip3-token')}`
});

export const listarCategorias = async () => {
  const res = await fetch(`${API_URL}/api/menu/categorias`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error al obtener categorías');
  return res.json();
};

// si la categoria ya tiene id es edicion (put), si no es alta nueva (post)
export const guardarCategoria = async (categoria) => {
  const isEdit = categoria.id;
  const url = isEdit ? `${API_URL}/api/menu/categorias/${categoria.id}` : `${API_URL}/api/menu/categorias`;
  const res = await fetch(url, {
    method: isEdit ? 'PUT' : 'POST',
    headers: getHeaders(),
    body: JSON.stringify(categoria)
  });
  if (!res.ok) throw new Error('Error al guardar la categoría');
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