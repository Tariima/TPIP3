import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../services/auth/auth.context';
import { isTokenValid } from '../../auth/auth.helpers';

const AdminProtected = () => {
  const { token, usuario } = useContext(AuthContext);

  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  if (!usuario) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Verificando permisos...</div>;
  }

  // Usamos el valor exacto que descubriste que viene de la base de datos
  const esSuperAdmin = usuario.rol === 'super-admin';

  if (!esSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtected;