import React, { useEffect, useState } from 'react';
import { listarProductos, listarCategorias, guardarProducto, eliminarProducto, crearCategoria } from './menu.services';
import { validarProducto, validarCategoria } from './menu.validations';
import './AdminLayout.css';

const MenuAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  
  // Estados para formularios
  const [productoEditando, setProductoEditando] = useState(null);
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: '', descripcion: '' });

  const cargarDatos = async () => {
    try {
      const [prods, cats] = await Promise.all([listarProductos(), listarCategorias()]);
      setProductos(prods);
      setCategorias(cats);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => { cargarDatos(); }, []);

const handleGuardarProducto = async (e) => {
    e.preventDefault();
    setError('');

    // Validacion en el formulario antes de llamar al backend.
    const validacion = validarProducto(productoEditando);
    if (validacion.error) {
      setError(validacion.mensaje);
      return;
    }

    try {
      // Aseguramos que los IDs y valores numéricos no viajen como texto
      const productoFormateado = {
        ...productoEditando,
        categoriaId: parseInt(productoEditando.categoriaId, 10),
        precio: parseFloat(productoEditando.precio)
      };

      await guardarProducto(productoFormateado);
      setProductoEditando(null);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEliminarProducto = async (id) => {
    if (!window.confirm('¿Seguro que querés eliminar este producto?')) return;
    try {
      await eliminarProducto(id);
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCrearCategoria = async (e) => {
    e.preventDefault();
    setError('');

    // Validacion en el formulario antes de llamar al backend.
    const validacion = validarCategoria(nuevaCategoria);
    if (validacion.error) {
      setError(validacion.mensaje);
      return;
    }

    try {
      await crearCategoria(nuevaCategoria);
      setNuevaCategoria({ nombre: '', descripcion: '' });
      cargarDatos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Gestion del menu</h2>
          <p className="admin-subtitle">Carga productos, categorias, precios e imagenes.</p>
        </div>
      </header>
      {error && <div className="admin-message admin-message-error">{error}</div>}

      <div className="admin-layout">
        {/* TABLA DE PRODUCTOS */}
        <div className="admin-card">
          <div className="admin-section-header">
            <h3>Productos</h3>
            <button 
              onClick={() => setProductoEditando({ nombre: '', descripcion: '', precio: '', categoriaId: '', disponible: true, imagen: '' })}
              className="admin-button admin-button-primary">
              Nuevo producto
            </button>
          </div>
          <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.imagen ? (
                      <img src={p.imagen} alt={p.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#e5e7eb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#6b7280' }}>Sin foto</div>
                    )}
                  </td>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{categorias.find(c => c.id === p.categoriaId)?.nombre || `ID guardado: ${p.categoriaId}`}</td>
                  <td>
                    <span className={`admin-badge ${p.disponible ? 'admin-badge-success' : 'admin-badge-danger'}`}>
                      {p.disponible ? 'Disponible' : 'Agotado'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button onClick={() => setProductoEditando(p)} className="admin-button admin-button-secondary">Editar</button>
                      <button onClick={() => handleEliminarProducto(p.id)} className="admin-button admin-button-danger">Borrar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* PANEL LATERAL: FORMULARIOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Formulario Producto */}
          {productoEditando && (
            <div className="admin-card">
              <h4>{productoEditando.id ? 'Editar Producto' : 'Nuevo Producto'}</h4>
              <form onSubmit={handleGuardarProducto} className="admin-form">
                <input type="text" placeholder="Nombre" value={productoEditando.nombre} onChange={(e) => setProductoEditando({...productoEditando, nombre: e.target.value})} required />
                <input type="number" placeholder="Precio" value={productoEditando.precio} onChange={(e) => setProductoEditando({...productoEditando, precio: e.target.value})} required />
                <input type="text" placeholder="URL de la imagen (ej: https://...)" value={productoEditando.imagen || ''} onChange={(e) => setProductoEditando({...productoEditando, imagen: e.target.value})} />
                <textarea placeholder="Descripción" value={productoEditando.descripcion} onChange={(e) => setProductoEditando({...productoEditando, descripcion: e.target.value})} />
                
                <select value={productoEditando.categoriaId} onChange={(e) => setProductoEditando({...productoEditando, categoriaId: e.target.value})} required>
                  <option value="">Seleccioná Categoría</option>
                  {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>

                <label style={{ display: 'flex', gap: '5px' }}>
                  <input type="checkbox" checked={productoEditando.disponible} onChange={(e) => setProductoEditando({...productoEditando, disponible: e.target.checked})} />
                  Disponible
                </label>

                <div className="admin-form-row">
                  <button type="submit" className="admin-button admin-button-primary">Guardar</button>
                  <button type="button" onClick={() => setProductoEditando(null)} className="admin-button admin-button-secondary">Cancelar</button>
                </div>
              </form>
            </div>
          )}

          {/* Formulario Categoría */}
          <div className="admin-card">
            <h4>Nueva Categoría</h4>
            <form onSubmit={handleCrearCategoria} className="admin-form">
              <input type="text" placeholder="Nombre" value={nuevaCategoria.nombre} onChange={(e) => setNuevaCategoria({...nuevaCategoria, nombre: e.target.value})} required />
              <button type="submit" className="admin-button admin-button-primary">Crear categoría</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;
