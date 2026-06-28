import { useState } from 'react';
import { MesaContext } from './mesa.context';
import {
  guardarSesionMesa,
  limpiarSesionMesa,
  obtenerMesaToken,
  obtenerMesaId,
  obtenerMesaNumero,
} from './mesa.session';
import { isTokenValid } from '../../components/auth/auth.helpers';

// maneja como estado global la sesion activa de la mesa (token + datos).
// la persistencia vive en mesa.session (sessionStorage); este provider mantiene
// el estado de React sincronizado y es la unica via para iniciar/cerrar la sesion.
export const MesaContextProvider = ({ children }) => {
  // arranco leyendo lo que haya en sessionStorage asi si recarga la pagina no pierde la mesa
  const [mesaToken, setMesaToken] = useState(() => obtenerMesaToken());
  const [mesaId, setMesaId] = useState(() => obtenerMesaId());
  const [numero, setNumero] = useState(() => obtenerMesaNumero());

  // inicia la sesion al validar el pin: persiste y actualiza el estado global.
  const iniciarSesionMesa = (sesion) => {
    guardarSesionMesa(sesion);
    setMesaToken(sesion.mesaToken);
    setMesaId(String(sesion.mesaId));
    setNumero(String(sesion.numero));
  };

  // cierra la sesion (al cerrar la mesa o cuando el token expira/es rechazado).
  const cerrarSesionMesa = () => {
    limpiarSesionMesa();
    setMesaToken(null);
    setMesaId(null);
    setNumero(null);
  };

  // hay sesion activa si el token de mesa existe y todavia no expiro.
  const sesionActiva = isTokenValid(mesaToken);

  return (
    <MesaContext.Provider
      value={{ mesaId, numero, sesionActiva, iniciarSesionMesa, cerrarSesionMesa }}
    >
      {children}
    </MesaContext.Provider>
  );
};
