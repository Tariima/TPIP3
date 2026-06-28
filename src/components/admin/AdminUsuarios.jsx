// pantalla del admin para ver, editar y dar de baja usuarios del personal
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarUsuarios, modificarUsuario, desactivarUsuario, obtenerRoles } from './admin.services';
import { validarUsuario } from './usuarios.validations';
import './AdminLayout.css';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      const lista = await listarUsuarios();
      setUsuarios(lista);
    } catch (err) {
      setError(err.message);
    }
  };

  // al entrar traigo la lista de usuarios y los roles para el select de edicion
  useEffect(() => {
    cargarUsuarios();
    obtenerRoles().then(setRoles).catch((err) => setError(err.message));
  }, []);

  // pido confirmacion antes de desactivar para no hacerlo por error
  const handleBaja = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas desactivar este usuario?')) return;
    try {
      await desactivarUsuario(id);
      setExito('Usuario desactivado con éxito');
      cargarUsuarios();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    setError('');

    // validacion en el formulario antes de llamar al backend (en edicion no se pide contrasena).
    const validacion = validarUsuario(usuarioEditando, true);
    if (validacion.error) {
      setError(validacion.mensaje);
      return;
    }

    try {
      await modificarUsuario(usuarioEditando.id, {
        nombreCompleto: usuarioEditando.nombreCompleto,
        email: usuarioEditando.email,
        rolId: parseInt(usuarioEditando.rolId, 10),
        activo: usuarioEditando.activo
      });
      setExito('Usuario actualizado correctamente');
      setUsuarioEditando(null);
      cargarUsuarios();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page admin-page-narrow">
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Gestion de usuarios</h2>
          <p className="admin-subtitle">Administra accesos y roles del personal.</p>
        </div>

        <div className="admin-actions">
          <button
            onClick={() => navigate('/')}
            className="admin-button admin-button-secondary"
          >
            ← Volver al inicio
          </button>
          {/* 3. boton para ir a crear un usuario nuevo */}
          <button
            onClick={() => navigate('/registro')}
            className="admin-button admin-button-primary"
          >
            Crear usuario
          </button>
        </div>
      </header>

      {error && <div className="admin-message admin-message-error">{error}</div>}
      {exito && <div className="admin-message admin-message-success">{exito}</div>}

      <div className="admin-card admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombreCompleto}</td>
              <td>{u.email}</td>
              <td style={{ textTransform: 'capitalize' }}>
                {u.Rol ? u.Rol.nombre : `ID: ${u.rolId}`}
              </td>
              <td>
                <span className={`admin-badge ${u.activo ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <div className="admin-actions">
                <button onClick={() => setUsuarioEditando({ ...u })} className="admin-button admin-button-secondary">
                  Editar
                </button>
                {u.activo && (
                  <button onClick={() => handleBaja(u.id)} className="admin-button admin-button-danger">
                    Eliminar 
                  </button>
                )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* el formulario aparece solo cuando toco editar y hay un usuario cargado */}
      {usuarioEditando && (
        <div className="admin-card" style={{ marginTop: '22px' }}>
          <h3>Editar Usuario: {usuarioEditando.nombreCompleto}</h3>
          <form onSubmit={handleGuardarCambios} className="admin-form" style={{ maxWidth: '420px' }}>
            
            <label>Nombre Completo:</label>
            <input 
              type="text" 
              value={usuarioEditando.nombreCompleto} 
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, nombreCompleto: e.target.value })}
              required
            />

            <label>Email:</label>
            <input 
              type="email" 
              value={usuarioEditando.email} 
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, email: e.target.value })}
              required
            />

            <label>Rol del Sistema:</label>
            <select
              value={usuarioEditando.rolId}
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, rolId: e.target.value })}
              style={{ textTransform: 'capitalize' }}
            >
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>{rol.nombre}</option>
              ))}
            </select>

            <label>Estado de Cuenta:</label>
            <select 
              value={usuarioEditando.activo} 
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, activo: e.target.value === 'true' })}
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo (Suspendido)</option>
            </select>

            <div className="admin-form-row">
              <button type="submit" className="admin-button admin-button-primary">
                Guardar Cambios
              </button>
              <button type="button" onClick={() => setUsuarioEditando(null)} className="admin-button admin-button-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUsuarios;
