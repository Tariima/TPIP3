const { Producto, Categoria } = require('../models');
const { validarProducto, validarCategoria } = require('../validations/menu.validations');

// CATEGORÍAS
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías' });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const validacion = validarCategoria(req.body);
    if (validacion.error) {
      return res.status(400).json({ mensaje: validacion.mensaje });
    }

    const { nombre, descripcion, imagen } = req.body;
    const nuevaCategoria = await Categoria.create({ nombre, descripcion, imagen });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear categoría' });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const validacion = validarCategoria(req.body);
    if (validacion.error) {
      return res.status(400).json({ mensaje: validacion.mensaje });
    }

    const { nombre, descripcion, imagen } = req.body;

    const categoria = await Categoria.findByPk(id);
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });

    await categoria.update({ nombre, descripcion, imagen });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar categoría' });
  }
};

// PRODUCTOS
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: { model: Categoria, attributes: ['nombre'] }
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos' });
  }
};

const crearProducto = async (req, res) => {
  try {
    const validacion = validarProducto(req.body);
    if (validacion.error) {
      return res.status(400).json({ mensaje: validacion.mensaje });
    }

    const { nombre, descripcion, precio, categoriaId, imagen } = req.body;
    const nuevoProducto = await Producto.create({ nombre, descripcion, precio, categoriaId, imagen });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto' });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const validacion = validarProducto(req.body);
    if (validacion.error) {
      return res.status(400).json({ mensaje: validacion.mensaje });
    }

    const { nombre, descripcion, precio, disponible, categoriaId, imagen } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    await producto.update({ nombre, descripcion, precio, disponible, categoriaId, imagen });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto' });
  }
};

module.exports = {
  obtenerCategorias, crearCategoria, actualizarCategoria,
  obtenerProductos, crearProducto, actualizarProducto, eliminarProducto
};