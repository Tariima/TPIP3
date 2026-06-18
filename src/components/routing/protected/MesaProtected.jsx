import { Navigate, Outlet, useParams } from 'react-router-dom';
import { sesionMesaValida, obtenerMesaNumero } from '../../../services/mesa/mesa.session';

// Permite el acceso a las rutas del cliente solo si hay una sesion de mesa
// valida y la mesa de la URL coincide con la mesa que se valido por PIN.
// Si no, redirige a la pantalla de PIN de esa mesa.
const MesaProtected = () => {
  const params = useParams();
  const numeroUrl = params.numero ?? params.mesaId;

  if (!sesionMesaValida()) {
    return <Navigate to={`/${numeroUrl}`} replace />;
  }

  if (obtenerMesaNumero() !== String(numeroUrl)) {
    return <Navigate to={`/${numeroUrl}`} replace />;
  }

  return <Outlet />;
};

export default MesaProtected;
