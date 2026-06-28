// prueba unitaria de las validaciones del formulario de usuarios.
// framework: Vitest (integrado con Vite).
// ejecutar con:  npm test     (desde la raiz del proyecto)

import { describe, it, expect } from 'vitest';
import { validarUsuario } from './usuarios.validations';

describe('validarUsuario', () => {
  it('no da error con datos validos en el alta', () => {
    const resultado = validarUsuario({
      nombreCompleto: 'Juan Perez',
      email: 'juan@tpip3.com',
      password: 'clave123',
      rolId: '2'
    });
    expect(resultado.error).toBe(false);
    expect(resultado.mensaje).toBe('');
  });

  it('marca error cuando falta el nombre', () => {
    const resultado = validarUsuario({ nombreCompleto: '', email: 'juan@tpip3.com', password: 'clave123', rolId: '2' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('El nombre completo es obligatorio');
  });

  it('marca error cuando la contraseña es corta en el alta', () => {
    const resultado = validarUsuario({ nombreCompleto: 'Juan', email: 'juan@tpip3.com', password: '123', rolId: '2' });
    expect(resultado.error).toBe(true);
    expect(resultado.mensaje).toBe('La contraseña debe tener al menos 6 caracteres');
  });

  it('no pide contraseña cuando es una edicion', () => {
    const resultado = validarUsuario({ nombreCompleto: 'Juan', email: 'juan@tpip3.com', rolId: '2' }, true);
    expect(resultado.error).toBe(false);
  });
});
