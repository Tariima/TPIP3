// llamadas al backend para administrar usuarios y roles del personal
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// si no hay token mando el authorization vacio en vez de un "bearer null"
const obtenerConfigHeaders = () => {
  const token = localStorage.getItem('tpip3-token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const obtenerRoles = async () => {
  const response = await fetch(`${API_URL}/api/auth/roles`, {
    method: 'GET',
    headers: obtenerConfigHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || 'Error al obtener roles');
  return data;
};

export const listarUsuarios = async () => {
  const response = await fetch(`${API_URL}/api/auth/usuarios`, {
    method: 'GET',
    headers: obtenerConfigHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || 'Error al obtener usuarios');
  return data;
};

export const modificarUsuario = async (id, datosActualizados) => {
  const response = await fetch(`${API_URL}/api/auth/usuarios/${id}`, {
    method: 'PUT',
    headers: obtenerConfigHeaders(),
    body: JSON.stringify(datosActualizados)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || 'Error al actualizar usuario');
  return data;
};

// es baja logica: el delete deja el usuario inactivo, no lo borra de la base
export const desactivarUsuario = async (id) => {
  const response = await fetch(`${API_URL}/api/auth/usuarios/${id}`, {
    method: 'DELETE',
    headers: obtenerConfigHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || 'Error al desactivar usuario');
  return data;
};