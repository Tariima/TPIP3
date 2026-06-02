export const crearNuevoUsuario = async (formData) => {
  const response = await fetch('http://localhost:3001/api/auth/registro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensaje || 'Error al registrar el usuario en el servidor');
  }

  return data;
};