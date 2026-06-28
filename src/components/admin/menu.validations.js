// validaciones de los formularios del menu (productos y categorias).
// mismo criterio que el backend para avisar al usuario en caso de error.

// valida un producto y devuelve { error, mensaje }.
export const validarProducto = ({ nombre, precio, categoriaId }) => {
  const resultado = { error: false, mensaje: '' };

  if (!nombre || !nombre.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre del producto es obligatorio';
  // el precio viene como texto del input, lo convierto y me fijo que sea positivo
  } else if (precio === '' || precio === null || isNaN(Number(precio)) || Number(precio) <= 0) {
    resultado.error = true;
    resultado.mensaje = 'El precio debe ser un numero mayor a 0';
  } else if (!categoriaId) {
    resultado.error = true;
    resultado.mensaje = 'Seleccioná una categoría';
  }

  return resultado;
};

// valida una categoria y devuelve { error, mensaje }.
export const validarCategoria = ({ nombre }) => {
  const resultado = { error: false, mensaje: '' };

  if (!nombre || !nombre.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre de la categoría es obligatorio';
  }

  return resultado;
};
