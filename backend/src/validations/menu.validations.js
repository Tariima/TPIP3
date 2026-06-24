// Validaciones del menu del backend (productos y categorias).
// Se mantiene el mismo criterio que en el frontend para avisar al usuario en caso de error.

// Valida el body de un producto. Devuelve { error, mensaje }.
const validarProducto = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { nombre, precio, categoriaId } = body || {};

  if (!nombre || !nombre.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre del producto es obligatorio';
  } else if (precio === undefined || precio === null || precio === '' || isNaN(Number(precio)) || Number(precio) <= 0) {
    resultado.error = true;
    resultado.mensaje = 'El precio debe ser un numero mayor a 0';
  } else if (!categoriaId) {
    resultado.error = true;
    resultado.mensaje = 'Debe seleccionar una categoria';
  }

  return resultado;
};

// Valida el body de una categoria. Devuelve { error, mensaje }.
const validarCategoria = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { nombre } = body || {};

  if (!nombre || !nombre.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre de la categoria es obligatorio';
  }

  return resultado;
};

module.exports = {
  validarProducto,
  validarCategoria
};
