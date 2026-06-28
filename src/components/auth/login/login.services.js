// servicio que habla con el backend para hacer el login
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// llama al endpoint de login del backend. usa callbacks onSuccess / onError.
export const loginUsuario = (email, password, onSuccess, onError) => {
  fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        // si el back responde con error tiro el mensaje que mando para mostrarlo
        throw new Error(data.mensaje || 'Hubo un error en el servidor');
      }
      return data;
    })
    .then(onSuccess)
    .catch(onError);
};
