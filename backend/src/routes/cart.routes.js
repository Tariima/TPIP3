const express = require("express");
const { Cuenta, Producto, CarritoItem } = require("../models");

const router = express.Router();

// 1. Obtener todos los productos en el carrito de una cuenta específica
router.get("/cuentas/:cuentaId/items", async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const items = await CarritoItem.findAll({
      where: { cuentaId },
      include: [{ model: Producto }], // Incluimos los datos del producto (nombre, precio, etc.)
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los items del carrito", error: error.message });
  }
});

// 2. Agregar un producto al carrito
router.post("/cuentas/:cuentaId/items", async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const { productoId, cantidad } = req.body;

    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    // Buscamos si el producto ya existe en el carrito de esta cuenta
    let item = await CarritoItem.findOne({
      where: { cuentaId, productoId },
    });

    const cantAgregar = cantidad || 1;

    if (item) {
      // Si ya existe, aumentamos la cantidad y recalculamos el subtotal
      item.cantidad += cantAgregar;
      item.subtotal = item.cantidad * item.precioUnitario;
      await item.save();
    } else {
      // Si no existe, creamos el registro nuevo
      item = await CarritoItem.create({
        cuentaId,
        productoId,
        cantidad: cantAgregar,
        precioUnitario: producto.precio,
        subtotal: cantAgregar * producto.precio,
      });
    }

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al agregar al carrito", error: error.message });
  }
});

// 3. Actualizar la cantidad de un item (ej: botones + o -)
router.patch("/cuentas/:cuentaId/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { cantidad } = req.body;

    const item = await CarritoItem.findByPk(itemId);
    if (!item) {
      return res.status(404).json({ mensaje: "Item no encontrado" });
    }

    if (cantidad <= 0) {
      await item.destroy();
      return res.json({ mensaje: "Item eliminado por cantidad zero" });
    }

    item.cantidad = cantidad;
    item.subtotal = item.cantidad * item.precioUnitario;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la cantidad", error: error.message });
  }
});

// 4. Eliminar un producto del carrito
router.delete("/cuentas/:cuentaId/items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await CarritoItem.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ mensaje: "Item no encontrado" });
    }

    await item.destroy();
    res.json({ mensaje: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el item", error: error.message });
  }
});

module.exports = router;
