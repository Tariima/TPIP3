import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth/auth.context';
import { obtenerPruebaBackend } from '../../services/api';

function Home() {
  const { usuario, handleUserLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [estadoBackend, setEstadoBackend] = useState('Conectando con el backend...');

  useEffect(() => {
    obtenerPruebaBackend()
      .then((data) => setEstadoBackend(data.mensaje))
      .catch(() => setEstadoBackend('No se pudo conectar con el backend'));
  }, []);

  const cerrarSesion = () => {
    handleUserLogout();
    navigate('/login');
  };

  const esSuperAdmin = usuario && usuario.rol === 'super-admin';

  // validacion de roles administrativos
  const esAdmin = usuario && (usuario.rol === 'super-admin' || usuario.rol === 'admin');

  return (
    <div className="App">
      <header className="App-header">
        <h1>TPIP3</h1>
        <p>Estructura base con React, Node y Express.</p>
      </header>

      <main className="App-main">
        <section>
          <h2>Sesion</h2>
          {usuario && (
            <p>
              Conectado como <strong>{usuario.nombreCompleto}</strong> ({usuario.rol})
            </p>
          )}

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Botón exclusivo para Administradores */}
            {esSuperAdmin && (
              <button 
                onClick={() => navigate('/admin/usuarios')}
                style={{ backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold' }}
              >
                ⚙️ Panel de Gestión de Usuarios
              </button>
            )}

            {/* Mostrar botón solo si es super-admin o admin */}
            {(usuario?.rol === 'super-admin' || usuario?.rol === 'admin') && (
              <>
                <button 
                  onClick={() => navigate('/admin/productos')}
                  style={{ backgroundColor: '#10b981', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  🍔 Gestionar Menú
                </button>
                
                {/* NUEVO BOTÓN: Gestión de Mesas */}
                <button
                  onClick={() => navigate('/admin/mesas')}
                  style={{ backgroundColor: '#f59e0b', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  🪑 Gestionar Mesas
                </button>

                {/* NUEVO BOTÓN: Panel de Pedidos */}
                <button
                  onClick={() => navigate('/admin/pedidos')}
                  style={{ backgroundColor: '#ec4899', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  📋 Panel de Pedidos
                </button>
              </>
            )}

            <button onClick={cerrarSesion}>Cerrar sesion</button>
          </div>
          
        </section>

        <section>
          <h2>Backend</h2>
          <p>{estadoBackend}</p>
        </section>
      </main>

      <footer className="App-footer">
        <p>Programacion 3 - TUP</p>
      </footer>
    </div>
  );
}

export default Home;
