const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');
const { validarLogin } = require('../validations/auth.validations');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_desarrollo';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '8h';

// POST /api/auth/login
// Valida credenciales, genera un token JWT y devuelve los datos del usuario autenticado.
const login = async (req, res) => {
  try {
    const validacion = validarLogin(req.body);
    if (validacion.error) {
      return res.status(400).json({ mensaje: validacion.mensaje });
    }

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { email },
      include: { model: Rol }
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const passwordOk = await usuario.compararPassword(password);
    if (!passwordOk) {
      return res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, rolId: usuario.rolId },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.json({
      token,
      usuario: {
        id: usuario.id,
        nombreCompleto: usuario.nombreCompleto,
        email: usuario.email,
        rol: usuario.Rol ? usuario.Rol.nombre : null
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// GET /api/auth/perfil  (ruta protegida)
// Devuelve los datos del usuario autenticado a partir del token, para mantener la sesion.
const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: ['id', 'nombreCompleto', 'email', 'activo'],
      include: { model: Rol, attributes: ['nombre'] }
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    return res.json({
      id: usuario.id,
      nombreCompleto: usuario.nombreCompleto,
      email: usuario.email,
      rol: usuario.Rol ? usuario.Rol.nombre : null
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login, perfil };
