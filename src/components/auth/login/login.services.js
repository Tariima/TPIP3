const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Llama al endpoint de login del backend. Usa callbacks onSuccess / onError.
export const loginUsuario = (email, password, onSuccess, onError) => {
  fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.mensaje || 'Hubo un error en el servidor');
      }
      return data;
    })
    .then(onSuccess)
    .catch(onError);
};
