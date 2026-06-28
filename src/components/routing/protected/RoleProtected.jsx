// deja pasar a una ruta solo si el rol del usuario esta en la lista de permitidos
import React, { useContext } from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../../../services/auth/auth.context';
import { isTokenValid } from '../../auth/auth.helpers';

const RoleProtected = ({ rolesPermitidos = [] }) => {
  const { token, usuario } = useContext(AuthContext);

  // 1. si no hay token valido, al login
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  // 2. esperamos a que el usuario cargue
  if (!usuario) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Verificando permisos...</div>;
  }

  // 3. si el rol del usuario no esta permitido, avisamos en vez de redirigir en silencio
  if (!rolesPermitidos.includes(usuario.rol)) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Acceso denegado</h2>
        <p>No tenés permiso para acceder a esta sección.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  // si esta autorizado, mostramos la ruta
  return <Outlet />;
};

export default RoleProtected;