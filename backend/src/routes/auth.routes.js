const express = require('express');
const { login, perfil, crearUsuario, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// Login: valida credenciales y devuelve un token.
router.post('/login', login);

// Perfil: ruta protegida, devuelve el usuario autenticado a partir del token.
router.get('/perfil', verificarToken, perfil);

// Registro: nueva ruta para el Alta del ABM de usuarios.
router.post('/registro', verificarToken, crearUsuario);

router.get('/usuarios', verificarToken, obtenerUsuarios);         // Listar todos
router.put('/usuarios/:id', verificarToken, actualizarUsuario);    // Editar datos y Rol
router.delete('/usuarios/:id', verificarToken, eliminarUsuario);  // Baja lógica (Desactivar)

module.exports = router;
