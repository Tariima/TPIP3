import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../services/auth/auth.context';
import { isTokenValid } from '../../auth/auth.helpers';

const RoleProtected = ({ rolesPermitidos }) => {
  const { token, usuario } = useContext(AuthContext);

  // 1. Si no hay token válido, al login
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  // 2. Esperamos a que el usuario cargue
  if (!usuario) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Verificando permisos...</div>;
  }

  // 3. Verificamos si el rol del usuario está dentro del arreglo de roles permitidos
  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  // Si está autorizado, mostramos la ruta
  return <Outlet />;
};

export default RoleProtected;