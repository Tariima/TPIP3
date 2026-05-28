import { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // estado que guarda los datos del usuario
  const [user, setUser] = useState(null);
  //guarda el token y busca si ya hay uno guardado
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // se ejecuta una sola vez cuando el usuario entra en la pag
  useEffect(() => {
    if (token) {
      // Más adelante, aquí podrías hacer una petición al backend para validar el token
      // y traer el nombre o rol del usuario. Por ahora simulamos que está autenticado:
      setUser({ autenticado: true }); 
    }
  }, [token]);

  // Función que llamaremos desde el formulario de Login
  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken); // Guardamos el token en el navegador
    setToken(newToken); //actualiza el estado del token
    setUser(userData); // Guardamos la info del usuario en el estado de React
  };

  const logout = () => {
    localStorage.removeItem('token'); // Borramos el token para cerrar sesión
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};