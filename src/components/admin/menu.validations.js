// Validaciones de los formularios del menu (productos y categorias).
// Mismo criterio que el backend para avisar al usuario en caso de error.

// Valida un producto y devuelve { error, mensaje }.
export const validarProducto = ({ nombre, precio, categoriaId }) => {
  const resultado = { error: false, mensaje: '' };

  if (!nombre || !nombre.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre del producto es obligatorio';
  } else if (precio === '' || precio === null || isNaN(Number(precio)) || Number(precio) <= 0) {
    resultado.error = true;
    resultado.mensaje = 'El precio debe ser un numero mayor a 0';
  } else if (!categoriaId) {
    resultado.error = true;
    resultado.mensaje = 'Seleccioná una categoría';
  }

  return resultado;
};

// Valida una categoria y devuelve { error, mensaje }.
export const validarCategoria = ({ nombre }) => {
  const resultado = { error: false, mensaje: '' };

  if (!nombre || !nombre.trim()) {
    resultado.error = true;
    resultado.mensaje = 'El nombre de la categoría es obligatorio';
  }

  return resultado;
};
