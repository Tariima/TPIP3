// prueba unitaria de las validaciones de mesas (numero de mesa y pin del cliente).
// framework: Vitest (integrado con Vite).
// ejecutar con:  npm test     (desde la raiz del proyecto)

import { describe, it, expect } from 'vitest';
import { validarMesa, validarPin } from './mesas.validations';

describe('validarMesa', () => {
  it('no da error con un numero valido', () => {
    const resultado = validarMesa({ numero: '5' });
    expect(resultado.error).toBe(false);
    expect(resultado.mensaje).toBe('');
  });

  it('marca error cuando el numero es 0 o negativo', () => {
    const resultado = validarMesa({ numero: '0' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('El número de mesa debe ser un número mayor a 0');
  });

  it('marca error cuando el numero esta vacio', () => {
    const resultado = validarMesa({ numero: '' });
    expect(resultado.error).toBe(true);
  });
});

describe('validarPin', () => {
  it('acepta un PIN de 4 digitos', () => {
    expect(validarPin('1234').error).toBe(false);
  });

  it('rechaza un PIN con menos de 4 digitos o con letras', () => {
    expect(validarPin('123').error).toBe(true);
    expect(validarPin('12ab').error).toBe(true);
    expect(validarPin('').error).toBe(true);
  });
});
