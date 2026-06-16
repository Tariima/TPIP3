const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('tpip3-token')}`
});

export const listarMesas = async () => {
  const res = await fetch(`${API_URL}/api/mesas`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Error al obtener las mesas');
  return res.json();
};

export const guardarMesa = async (mesa) => {
  const isEdit = mesa.id;
  const url = isEdit ? `${API_URL}/api/mesas/${mesa.id}` : `${API_URL}/api/mesas`;
  
  const payload = { ...mesa };
  if (!isEdit) {
    payload.numero = parseInt(payload.numero, 10);
  }

  const res = await fetch(url, {
    method: isEdit ? 'PUT' : 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Error al guardar los datos de la mesa');
  return res.json();
};

export const eliminarMesa = async (id) => {
  const res = await fetch(`${API_URL}/api/mesas/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Error al eliminar la mesa');
  return res.json();
};

export const abrirMesa = async (id) => {
  const res = await fetch(`${API_URL}/api/mesas/${id}/abrir`, {
    method: 'POST',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Error al abrir la mesa');
  return res.json();
};

export const cerrarMesa = async (id) => {
  const res = await fetch(`${API_URL}/api/mesas/${id}/cerrar`, {
    method: 'POST',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Error al cerrar la mesa');
  return res.json();
};