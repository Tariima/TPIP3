// Prueba unitaria de las validaciones del menu (productos y categorias).
// Framework: Vitest (integrado con Vite).
// Ejecutar con:  npm test     (desde la raiz del proyecto)

import { describe, it, expect } from 'vitest';
import { validarProducto, validarCategoria } from './menu.validations';

describe('validarProducto', () => {
  it('no da error con un producto valido', () => {
    const resultado = validarProducto({ nombre: 'Pizza', precio: '1500', categoriaId: '2' });
    expect(resultado.error).toBe(false);
    expect(resultado.mensaje).toBe('');
  });

  it('marca error cuando falta el nombre', () => {
    const resultado = validarProducto({ nombre: '', precio: '1500', categoriaId: '2' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('El nombre del producto es obligatorio');
  });

  it('marca error cuando el precio no es mayor a 0', () => {
    const resultado = validarProducto({ nombre: 'Pizza', precio: '0', categoriaId: '2' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('El precio debe ser un numero mayor a 0');
  });

  it('marca error cuando no se eligio categoria', () => {
    const resultado = validarProducto({ nombre: 'Pizza', precio: '1500', categoriaId: '' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('Seleccioná una categoría');
  });
});

describe('validarCategoria', () => {
  it('no da error con un nombre valido', () => {
    const resultado = validarCategoria({ nombre: 'Bebidas' });
    expect(resultado.error).toBe(false);
  });

  it('marca error cuando el nombre esta vacio', () => {
    const resultado = validarCategoria({ nombre: '   ' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('El nombre de la categoría es obligatorio');
  });
});
