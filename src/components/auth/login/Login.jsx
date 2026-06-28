// pantalla de login del personal, toma email y pass y arranca la sesion
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../services/auth/auth.context';
import { validarLogin } from '../auth.services';
import { loginUsuario } from './login.services';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { handleUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const manejarSubmit = (evento) => {
    evento.preventDefault();
    setError('');

    // validacion en el formulario antes de llamar al backend.
    const validacion = validarLogin({ email, password });
    if (validacion.error) {
      setError(validacion.mensaje);
      return;
    }

    setCargando(true);
    loginUsuario(
      email,
      password,
      (data) => {
        // si el login salio bien guardo token y usuario en el contexto y voy al home
        handleUserLogin(data.token, data.usuario);
        navigate('/');
      },
      (err) => {
        setError(err.message);
        setCargando(false);
      }
    );
  };

  return (
    <div className="login-contenedor">
      <form className="login-form" onSubmit={manejarSubmit}>
        <h1>Iniciar sesion</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@tpip3.com"
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Tu contraseña"
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

export default Login;
