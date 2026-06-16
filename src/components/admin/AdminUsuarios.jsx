import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarUsuarios, modificarUsuario, desactivarUsuario } from './admin.services'; // <-- Import actualizado a tu estructura

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      const lista = await listarUsuarios();
      setUsuarios(lista);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

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
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Panel de Gestión de Usuarios</h2>

      {/* 3. Botón para ir a crear un usuario nuevo */}
      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button 
          onClick={() => navigate('/registro')} 
          style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Crear Nuevo Usuario
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {exito && <div style={{ color: 'green', marginBottom: '10px' }}>{exito}</div>}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '10px' }}>Nombre</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Rol</th>
            <th style={{ padding: '10px' }}>Estado</th>
            <th style={{ padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{u.nombreCompleto}</td>
              <td style={{ padding: '10px' }}>{u.email}</td>
              <td style={{ padding: '10px', textTransform: 'capitalize' }}>
                {u.Rol ? u.Rol.nombre : `ID: ${u.rolId}`}
              </td>
              <td style={{ padding: '10px' }}>
                <span style={{ color: u.activo ? 'green' : 'red', fontWeight: 'bold' }}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td style={{ padding: '10px', gap: '5px', display: 'flex' }}>
                <button onClick={() => setUsuarioEditando({ ...u })} style={{ cursor: 'pointer', padding: '5px 10px' }}>
                  Editar
                </button>
                {u.activo && (
                  <button onClick={() => handleBaja(u.id)} style={{ backgroundColor: '#ef4444', color: 'white', cursor: 'pointer', padding: '5px 10px', border: 'none', borderRadius: '3px' }}>
                    Eliminar {/* <-- 4. Le cambiamos el nombre visual al botón */}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioEditando && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #4f46e5', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3>Editar Usuario: {usuarioEditando.nombreCompleto}</h3>
          <form onSubmit={handleGuardarCambios} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            
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
            >
              <option value={1}>Super Admin</option>
              <option value={2}>Admin</option>
              <option value={3}>Cliente</option>
            </select>

            <label>Estado de Cuenta:</label>
            <select 
              value={usuarioEditando.activo} 
              onChange={(e) => setUsuarioEditando({ ...usuarioEditando, activo: e.target.value === 'true' })}
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo (Suspendido)</option>
            </select>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{ backgroundColor: '#4f46e5', color: 'white', padding: '8px 15px', cursor: 'pointer' }}>
                Guardar Cambios
              </button>
              <button type="button" onClick={() => setUsuarioEditando(null)} style={{ padding: '8px 15px', cursor: 'pointer' }}>
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