// middlewares para cuidar las rutas: token de empleado, rol y token de mesa del cliente
const jwt = require('jsonwebtoken');
const { Rol, Mesa, SesionMesa } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_desarrollo';

// verifico el token antes de dejar pasar y guardo los datos del usuario en req
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

//middleware dinamico que recibe un arreglo de roles permitidos
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

// valida el token de mesa del cliente: que sea tipo mesa, que la mesa este ocupada y la sesion abierta
const verificarMesaToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No se proporciono un token de mesa' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const datos = jwt.verify(token, JWT_SECRET);

    if (datos.tipo !== 'mesa') {
      return res.status(401).json({ mensaje: 'Token de mesa invalido' });
    }

    const mesa = await Mesa.findByPk(datos.mesaId);
    if (!mesa || mesa.estado !== 'ocupada') {
      return res.status(403).json({ mensaje: 'La mesa no esta habilitada' });
    }

    const sesionMesa = await SesionMesa.findOne({
      where: {
        id: datos.sesionMesaId,
        mesaId: datos.mesaId,
        estado: 'abierta',
      },
    });

    if (!sesionMesa) {
      return res.status(403).json({ mensaje: 'La sesion de mesa no esta activa' });
    }

    req.mesaCliente = {
      mesaId: datos.mesaId,
      numero: datos.numero,
      sesionMesaId: datos.sesionMesaId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token de mesa invalido o expirado' });
  }
};

module.exports = { verificarToken, verificarRol, verificarMesaToken };
