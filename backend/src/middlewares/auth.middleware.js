const jwt = require('jsonwebtoken');
const { Rol } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_desarrollo';

// Verifica el token JWT enviado en el header Authorization: Bearer <token>.
// Si es valido, agrega los datos del usuario a req.usuario y continua.
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No se proporciono un token de acceso' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const datos = jwt.verify(token, JWT_SECRET);
    req.usuario = datos;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token invalido o expirado' });
  }
};

// Permite el paso solo si el usuario autenticado tiene el rol super-admin.
// Se apoya en req.usuario (lo deja verificarToken), por lo que debe usarse SIEMPRE despues de el.
// Busca el rol por id en la base en lugar de hardcodear el numero, asi no se rompe si cambia el orden del seed.
const soloSuperAdmin = async (req, res, next) => {
  try {
    const rol = await Rol.findByPk(req.usuario.rolId);

    if (!rol || rol.nombre !== 'super-admin') {
      return res.status(403).json({ mensaje: 'Acceso restringido: se requiere rol super-admin' });
    }

    next();
  } catch (error) {
    console.error('Error al verificar el rol:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { verificarToken, soloSuperAdmin };
