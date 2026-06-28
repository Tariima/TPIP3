// validaciones del menu del backend (productos y categorias).
// se mantiene el mismo criterio que en el frontend para avisar al usuario en caso de error.

// valida el body de un producto. devuelve { error, mensaje }.
const validarProducto = (body) => {
  const resultado = { error: false, mensaje: '' };
  const { nombre, precio, categoriaId } = body || {};

  // pido nombre, un precio que sea numero mayor a 0 y que tenga categoria
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

// valida el body de una categoria. devuelve { error, mensaje }.
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
