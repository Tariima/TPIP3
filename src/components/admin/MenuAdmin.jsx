import React, { useEffect, useState } from 'react';
import { listarProductos, listarCategorias, guardarProducto, eliminarProducto, crearCategoria } from './menu.services';
import { validarProducto, validarCategoria } from './menu.validations';

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
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Gestión del Menú</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* TABLA DE PRODUCTOS */}
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3>Productos</h3>
            <button 
              onClick={() => setProductoEditando({ nombre: '', descripcion: '', precio: '', categoriaId: '', disponible: true, imagen: '' })}
              style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              + Nuevo Producto
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: '10px' }}>Imagen</th>
                <th style={{ padding: '10px' }}>Nombre</th>
                <th style={{ padding: '10px' }}>Precio</th>
                <th style={{ padding: '10px' }}>Categoría</th>
                <th style={{ padding: '10px' }}>Estado</th>
                <th style={{ padding: '10px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>
                    {p.imagen ? (
                      <img src={p.imagen} alt={p.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '50px', height: '50px', backgroundColor: '#e5e7eb', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#6b7280' }}>Sin foto</div>
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>{p.nombre}</td>
                  <td style={{ padding: '10px' }}>${p.precio}</td>
                  <td style={{ padding: '10px' }}>{categorias.find(c => c.id === p.categoriaId)?.nombre || `ID guardado: ${p.categoriaId}`}</td>
                  <td style={{ padding: '10px', color: p.disponible ? 'green' : 'red', fontWeight: 'bold' }}>
                    {p.disponible ? 'Disponible' : 'Agotado'}
                  </td>
                  <td style={{ padding: '10px', display: 'flex', gap: '5px' }}>
                    <button onClick={() => setProductoEditando(p)} style={{ cursor: 'pointer' }}>Editar</button>
                    <button onClick={() => handleEliminarProducto(p.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>Borrar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PANEL LATERAL: FORMULARIOS */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Formulario Producto */}
          {productoEditando && (
            <div style={{ padding: '15px', border: '1px solid #4f46e5', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
              <h4>{productoEditando.id ? 'Editar Producto' : 'Nuevo Producto'}</h4>
              <form onSubmit={handleGuardarProducto} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '8px', flex: 1, cursor: 'pointer' }}>Guardar</button>
                  <button type="button" onClick={() => setProductoEditando(null)} style={{ padding: '8px', flex: 1, cursor: 'pointer' }}>Cancelar</button>
                </div>
              </form>
            </div>
          )}

          {/* Formulario Categoría */}
          <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h4>Nueva Categoría</h4>
            <form onSubmit={handleCrearCategoria} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="Nombre" value={nuevaCategoria.nombre} onChange={(e) => setNuevaCategoria({...nuevaCategoria, nombre: e.target.value})} required />
              <button type="submit" style={{ backgroundColor: '#282c34', color: 'white', border: 'none', padding: '8px', cursor: 'pointer' }}>Crear Categoría</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;