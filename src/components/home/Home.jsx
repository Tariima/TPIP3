// panel principal del bar, desde aca el admin entra a las distintas secciones
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth/auth.context';
import { obtenerPruebaBackend } from '../../services/api';
import '../admin/AdminLayout.css';

function Home() {
  const { usuario, handleUserLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [estadoBackend, setEstadoBackend] = useState('Conectando con el backend...');

  // pego al backend al cargar para chequear que este conectado
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
    <div className="admin-page admin-page-narrow">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">Panel del Bar</h1>
          <p className="admin-subtitle">Gestion de menu, mesas, pedidos y usuarios.</p>
        </div>
      </header>

      <main className="admin-card">
        <section>
          <h2>Sesion</h2>
          {usuario && (
            <p>
              Conectado como <strong>{usuario.nombreCompleto}</strong> ({usuario.rol})
            </p>
          )}

          <div className="admin-actions">
            {/* gestionar usuarios solo lo ve el super-admin */}
            {/* boton exclusivo para administradores */}
            {esSuperAdmin && (
              <button 
                onClick={() => navigate('/admin/usuarios')}
                className="admin-button admin-button-primary"
              >
                Gestionar usuarios
              </button>
            )}

            {/* mostrar boton solo si es super-admin o admin */}
            {(usuario?.rol === 'super-admin' || usuario?.rol === 'admin') && (
              <>
                <button 
                  onClick={() => navigate('/admin/productos')}
                  className="admin-button admin-button-primary"
                >
                  Gestionar menu
                </button>
                
                {/* nuevo boton: gestion de mesas */}
                <button
                  onClick={() => navigate('/admin/mesas')}
                  className="admin-button admin-button-primary"
                >
                  Gestionar mesas
                </button>

                {/* nuevo boton: panel de pedidos */}
                <button
                  onClick={() => navigate('/admin/pedidos')}
                  className="admin-button admin-button-primary"
                >
                  Panel de pedidos
                </button>
              </>
            )}

            <button className="admin-button admin-button-secondary" onClick={cerrarSesion}>
              Cerrar sesion
            </button>
          </div>
          
        </section>

        <section>
          <h2>Backend</h2>
          <p className="admin-muted">{estadoBackend}</p>
        </section>
      </main>
    </div>
  );
}

export default Home;
