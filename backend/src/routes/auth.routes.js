const express = require('express');
const { login, perfil, crearUsuario, obtenerRoles, obtenerUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/auth.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware'); // <-- Import actualizado

const router = express.Router();

router.post('/login', login);
router.get('/perfil', verificarToken, perfil);

// --- Rutas protegidas por Roles ---
// Usamos verificarRol(['super-admin']) para que solo ellos pasen
router.get('/roles', verificarToken, verificarRol(['super-admin']), obtenerRoles);
router.post('/registro', verificarToken, verificarRol(['super-admin']), crearUsuario);
router.get('/usuarios', verificarToken, verificarRol(['super-admin']), obtenerUsuarios);
router.put('/usuarios/:id', verificarToken, verificarRol(['super-admin']), actualizarUsuario);
router.delete('/usuarios/:id', verificarToken, verificarRol(['super-admin']), eliminarUsuario);

module.exports = router;
