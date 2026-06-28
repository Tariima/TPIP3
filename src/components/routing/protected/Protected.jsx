import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../../services/auth/auth.context';
import { isTokenValid } from '../../auth/auth.helpers';

// permite el acceso solo si hay un token valido; si no, redirige al login.
const Protected = () => {
  const { token } = useContext(AuthContext);

  // si no hay token o esta vencido lo saco al login
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default Protected;
