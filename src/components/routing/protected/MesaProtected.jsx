import { useContext } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { MesaContext } from '../../../services/mesa/mesa.context';

// permite el acceso a las rutas del cliente solo si hay una sesion de mesa
// valida y la mesa de la url coincide con la mesa que se valido por pin.
// si no, redirige a la pantalla de pin de esa mesa.
const MesaProtected = () => {
  const params = useParams();
  const numeroUrl = params.numero ?? params.mesaId;
  const { sesionActiva, numero } = useContext(MesaContext);

  if (!sesionActiva) {
    return <Navigate to={`/${numeroUrl}`} replace />;
  }

  // evito que con la sesion de una mesa se cuele a la url de otra mesa distinta
  if (numero !== String(numeroUrl)) {
    return <Navigate to={`/${numeroUrl}`} replace />;
  }

  return <Outlet />;
};

export default MesaProtected;
