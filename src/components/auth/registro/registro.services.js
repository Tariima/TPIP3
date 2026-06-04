const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const crearNuevoUsuario = async (formData, token) => {

  // const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/auth/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

      'Authorization': `Bearer ${token}`

    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al registrar el usuario en el servidor');
  }

  return data;
};