const jwt = require('jsonwebtoken');
const { Rol } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_desarrollo';

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

// NUEVO: Middleware dinámico que recibe un arreglo de roles permitidos
const verificarRol = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      const rol = await Rol.findByPk(req.usuario.rolId);

      if (!rol || !rolesPermitidos.includes(rol.nombre)) {
        return res.status(403).json({ 
          mensaje: `Acceso denegado. Se requiere uno de los siguientes roles: ${rolesPermitidos.join(', ')}` 
        });
      }

      next();
    } catch (error) {
      console.error('Error al verificar el rol:', error);
      return res.status(500).json({ mensaje: 'Error en el servidor al verificar permisos' });
    }
  };
};

module.exports = { verificarToken, verificarRol };
