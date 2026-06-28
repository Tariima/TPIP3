const express = require('express');
const {
  obtenerCategorias, crearCategoria, actualizarCategoria,
  obtenerProductos, crearProducto, actualizarProducto, eliminarProducto
} = require('../controllers/menu.controller');
const { verificarToken, verificarRol } = require('../middlewares/auth.middleware');

const router = express.Router();

// Middleware aplicado a todas las rutas de este archivo
router.use(verificarToken, verificarRol(['super-admin', 'admin']));

router.get('/categorias', obtenerCategorias);
router.post('/categorias', crearCategoria);
router.put('/categorias/:id', actualizarCategoria);

router.get('/productos', obtenerProductos);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

module.exports = router;