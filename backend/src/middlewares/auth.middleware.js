const jwt = require('jsonwebtoken');

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

module.exports = { verificarToken };
