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

// POST /api/usuarios (Alta de ABM de usuarios)
// Crea un nuevo empleado en el sistema
const crearUsuario = async (req, res) => {
  try {

    const { nombreCompleto, email, password, rolId } = req.body;

    // Validación básica (luego pueden sumarla a su archivo de validaciones)
    if (!nombreCompleto || !email || !password) {
      return res.status(400).json({ mensaje: 'Nombre, email y contraseña son obligatorios' });
    }

    // Comprobamos que el correo no esté repetido
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }

    // Sequelize usará el hook beforeSave que vimos antes para encriptar la password
    const nuevoUsuario = await Usuario.create({
      nombreCompleto,
      email,
      password,
      rolId, // Por defecto le asignamos un rol (ej. 2 para mozo), si no lo envían
    });

    return res.status(201).json({
      mensaje: 'Usuario creado con éxito',
      usuario: {
        id: nuevoUsuario.id,
        nombreCompleto: nuevoUsuario.nombreCompleto,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ mensaje: 'Error al registrar el usuario en el servidor' });
  }
};

// Lista todos los usuarios del sistema con sus respectivos roles (para la tabla del admin)
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ['id', 'nombreCompleto', 'email', 'activo', 'rolId'],
      include: { model: Rol, attributes: ['nombre'] }
    });
    return res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// PUT /api/auth/usuarios/:id
// Modifica los datos de un usuario, incluyendo su rol o su estado de activación
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreCompleto, email, rolId, activo } = req.body;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizamos solo los campos que el administrador haya enviado
    if (nombreCompleto) usuario.nombreCompleto = nombreCompleto;
    if (email) usuario.email = email;
    if (rolId) usuario.rolId = rolId;
    if (activo !== undefined) usuario.activo = activo;

    await usuario.save();

    return res.json({
      mensaje: 'Usuario actualizado con éxito',
      usuario: {
        id: usuario.id,
        nombreCompleto: usuario.nombreCompleto,
        email: usuario.email,
        rolId: usuario.rolId,
        activo: usuario.activo
      }
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// DELETE /api/auth/usuarios/:id
// Baja lógica: desactiva un usuario del sistema
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Desactivamos al usuario en vez de borrarlo físicamente
    usuario.activo = false;
    await usuario.save();

    return res.json({ mensaje: 'Usuario desactivado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login, perfil, crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario };
