import { useState } from 'react';
import { AuthContext } from './auth.context';

const TOKEN_KEY = 'tpip3-token';
const USUARIO_KEY = 'tpip3-usuario';

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem(USUARIO_KEY);
    return guardado ? JSON.parse(guardado) : null;
  });

  // Guarda token y datos del usuario al iniciar sesion.
  const handleUserLogin = (nuevoToken, datosUsuario) => {
    localStorage.setItem(TOKEN_KEY, nuevoToken);
    localStorage.setItem(USUARIO_KEY, JSON.stringify(datosUsuario));
    setToken(nuevoToken);
    setUsuario(datosUsuario);
  };

  // Limpia la sesion.
  const handleUserLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USUARIO_KEY);
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuario, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
