const express = require('express');
const { login, perfil, crearUsuario, obtenerRoles, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/auth.controller');
const { verificarToken, soloSuperAdmin } = require('../middlewares/auth.middleware');

const router = express.Router();

// Login: valida credenciales y devuelve un token.
router.post('/login', login);

// Perfil: ruta protegida, devuelve el usuario autenticado a partir del token.
router.get('/perfil', verificarToken, perfil);

// --- ABM de usuarios (solo super-admin) ---
// Todas pasan primero por verificarToken (sesion valida) y luego por soloSuperAdmin (rol correcto).
router.get('/roles', verificarToken, soloSuperAdmin, obtenerRoles);              // Roles para el combo
router.post('/registro', verificarToken, soloSuperAdmin, crearUsuario);          // Alta
router.get('/usuarios', verificarToken, soloSuperAdmin, obtenerUsuarios);        // Listar todos
router.put('/usuarios/:id', verificarToken, soloSuperAdmin, actualizarUsuario);  // Editar datos y rol
router.delete('/usuarios/:id', verificarToken, soloSuperAdmin, eliminarUsuario); // Baja logica (desactivar)

module.exports = router;
