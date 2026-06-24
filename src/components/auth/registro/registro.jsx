import React, { useState, useContext, useEffect } from 'react';
import { crearNuevoUsuario } from './registro.services';
import { obtenerRoles } from '../../admin/admin.services';
import { validarUsuario } from '../../admin/usuarios.validations';
import { AuthContext } from '../../../services/auth/auth.context';

const Registro = () => {
  const {token} = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    password: '',
    rolId: '',
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);
  const [roles, setRoles] = useState([]);

  // Traemos del backend solo los roles asignables al personal (sin 'cliente').
  useEffect(() => {
    obtenerRoles()
      .then(setRoles)
      .catch((error) => setMensaje({ texto: error.message, tipo: 'error' }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    // Validacion en el formulario antes de llamar al backend.
    const validacion = validarUsuario(formData);
    if (validacion.error) {
      setMensaje({ texto: validacion.mensaje, tipo: 'error' });
      return;
    }

    setCargando(true);

    formData.rolId = parseInt(formData.rolId, 10);

    try {
      // Llamamos a la función limpia que importamos del servicio
      await crearNuevoUsuario(formData, token);
      
      setMensaje({ texto: 'Usuario creado con éxito', tipo: 'exito' });
      setFormData({ nombreCompleto: '', email: '', password: '', rolId: '' });

    } catch (error) {
      setMensaje({ texto: error.message, tipo: 'error' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Registrar Nuevo Empleado</h2>
      
      {mensaje.texto && (
        <div style={{ color: mensaje.tipo === 'error' ? 'red' : 'green', marginBottom: '15px' }}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nombre Completo:</label><br />
          <input 
            type="text" name="nombreCompleto" value={formData.nombreCompleto} 
            onChange={handleChange} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" name="email" value={formData.email} 
            onChange={handleChange} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Contraseña temporal:</label><br />
          <input 
            type="password" name="password" value={formData.password} 
            onChange={handleChange} required style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Rol del sistema:</label><br />
          <select name="rolId" value={formData.rolId} onChange={handleChange} required style={{ width: '100%', padding: '8px', textTransform: 'capitalize' }}>
            <option value="">Seleccioná un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={cargando} style={{ padding: '10px', backgroundColor: '#4f46e5', color: 'white', cursor: 'pointer' }}>
          {cargando ? 'Guardando...' : 'Crear Usuario'}
        </button>
      </form>
    </div>
  );
};

export default Registro;