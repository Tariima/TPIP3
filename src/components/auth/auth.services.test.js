// Prueba unitaria de las validaciones de autenticacion del frontend.
// Framework: Vitest (integrado con Vite).
// Ejecutar con:  npm test     (desde la raiz del proyecto)

import { describe, it, expect } from 'vitest';
import { validarEmail, validarPassword, validarLogin } from './auth.services';

describe('validarEmail', () => {
  it('acepta un email con formato correcto', () => {
    expect(validarEmail('admin@tpip3.com')).toBe(true);
  });

  it('rechaza un email sin arroba ni dominio', () => {
    expect(validarEmail('admin-tpip3.com')).toBe(false);
    expect(validarEmail('admin@tpip3')).toBe(false);
    expect(validarEmail('')).toBe(false);
  });
});

describe('validarPassword', () => {
  it('acepta una contraseña con el largo minimo', () => {
    expect(validarPassword('admin123', 6)).toBe(true);
  });

  it('rechaza una contraseña corta o vacia', () => {
    expect(validarPassword('123', 6)).toBe(false);
    expect(validarPassword('', 6)).toBe(false);
  });
});

describe('validarLogin', () => {
  it('no da error con credenciales validas', () => {
    const resultado = validarLogin({ email: 'admin@tpip3.com', password: 'admin123' });
    expect(resultado.error).toBe(false);
    expect(resultado.mensaje).toBe('');
  });

  it('marca error cuando el email es invalido', () => {
    const resultado = validarLogin({ email: 'correo-malo', password: 'admin123' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('Ingresa un email valido');
  });

  it('marca error cuando la contraseña es muy corta', () => {
    const resultado = validarLogin({ email: 'admin@tpip3.com', password: '123' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('La contraseña debe tener al menos 6 caracteres');
  });
});
