// rutas del carrito de cada cuenta de la mesa, las usa el cliente
const express = require("express");
const { Cuenta, Producto, CarritoItem } = require("../models");
const { verificarMesaToken } = require("../middlewares/auth.middleware");

const router = express.Router();

// busca la cuenta y de paso valida que sea de esta mesa, para reusar en todos los endpoints
const obtenerCuentaDeMesa = async (cuentaId, mesaId) => {
  return Cuenta.findOne({
    where: {
      id: cuentaId,
      mesaId,
      estado: "abierta",
    },
  });
};

// 1. obtener todos los productos en el carrito de una cuenta especifica
router.get("/cuentas/:cuentaId/items", verificarMesaToken, async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const cuenta = await obtenerCuentaDeMesa(cuentaId, req.mesaCliente.mesaId);

    if (!cuenta) {
      return res.status(403).json({ mensaje: "La cuenta no pertenece a esta mesa" });
    }

    const items = await CarritoItem.findAll({
      where: { cuentaId },
      include: [{ model: Producto }],
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los items del carrito", error: error.message });
  }
});

// 2. agregar un producto al carrito
router.post("/cuentas/:cuentaId/items", verificarMesaToken, async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const { productoId, cantidad } = req.body;

    const cuenta = await obtenerCuentaDeMesa(cuentaId, req.mesaCliente.mesaId);
    if (!cuenta) {
      return res.status(403).json({ mensaje: "La cuenta no pertenece a esta mesa" });
    }

    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    let item = await CarritoItem.findOne({
      where: { cuentaId, productoId },
    });

    const cantAgregar = cantidad || 1;

    // si ya estaba el producto le sumo cantidad, sino creo el item nuevo
    if (item) {
      item.cantidad += cantAgregar;
      item.subtotal = item.cantidad * item.precioUnitario;
      await item.save();
    } else {
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

// 3. actualizar la cantidad de un item
router.patch("/cuentas/:cuentaId/items/:itemId", verificarMesaToken, async (req, res) => {
  try {
    const { cuentaId, itemId } = req.params;
    const { cantidad } = req.body;

    const cuenta = await obtenerCuentaDeMesa(cuentaId, req.mesaCliente.mesaId);
    if (!cuenta) {
      return res.status(403).json({ mensaje: "La cuenta no pertenece a esta mesa" });
    }

    const item = await CarritoItem.findOne({
      where: {
        id: itemId,
        cuentaId,
      },
    });

    if (!item) {
      return res.status(404).json({ mensaje: "Item no encontrado" });
    }

    if (cantidad <= 0) {
      await item.destroy();
      return res.json({ mensaje: "Item eliminado por cantidad cero" });
    }

    item.cantidad = cantidad;
    item.subtotal = item.cantidad * item.precioUnitario;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la cantidad", error: error.message });
  }
});

// 4. eliminar un producto del carrito
router.delete("/cuentas/:cuentaId/items/:itemId", verificarMesaToken, async (req, res) => {
  try {
    const { cuentaId, itemId } = req.params;

    const cuenta = await obtenerCuentaDeMesa(cuentaId, req.mesaCliente.mesaId);
    if (!cuenta) {
      return res.status(403).json({ mensaje: "La cuenta no pertenece a esta mesa" });
    }

    const item = await CarritoItem.findOne({
      where: {
        id: itemId,
        cuentaId,
      },
    });

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
