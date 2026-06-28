const express = require("express");
const {
  Cuenta,
  CarritoItem,
  Producto,
  Pedido,
  PedidoItem,
  SesionMesa,
  Mesa,
} = require("../models");
const { verificarMesaToken, verificarToken, verificarRol } = require("../middlewares/auth.middleware");

const router = express.Router();

// Estados validos por los que pasa un pedido en la cocina/barra.
const ESTADOS_PEDIDO = ["pendiente", "en preparacion", "listo", "entregado", "cancelado"];

// CLIENTE: confirma el carrito de una cuenta y lo convierte en un pedido.
// Toma los items del carrito, crea el pedido con su detalle y vacia el carrito.
router.post("/cuentas/:cuentaId/confirmar", verificarMesaToken, async (req, res) => {
  try {
    const { cuentaId } = req.params;
    const { notas } = req.body;

    const cuenta = await Cuenta.findOne({
      where: { id: cuentaId, mesaId: req.mesaCliente.mesaId, estado: "abierta" },
    });
    if (!cuenta) {
      return res.status(403).json({ mensaje: "La cuenta no pertenece a esta mesa" });
    }

    const itemsCarrito = await CarritoItem.findAll({
      where: { cuentaId },
      include: [{ model: Producto }],
    });
    if (itemsCarrito.length === 0) {
      return res.status(400).json({ mensaje: "El carrito esta vacio" });
    }

    const total = itemsCarrito.reduce((suma, item) => suma + Number(item.subtotal), 0);

    const pedido = await Pedido.create({
      tipo: "mesa",
      estado: "pendiente",
      notas: notas || null,
      total,
      sesionMesaId: req.mesaCliente.sesionMesaId,
      cuentaId: cuenta.id,
    });

    for (const item of itemsCarrito) {
      await PedidoItem.create({
        pedidoId: pedido.id,
        productoId: item.productoId,
        nombreProducto: item.Producto.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        subtotal: item.subtotal,
      });
    }

    // Vaciamos el carrito: ya quedo registrado como pedido.
    await CarritoItem.destroy({ where: { cuentaId } });

    res.status(201).json({ mensaje: "Pedido confirmado", pedidoId: pedido.id });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al confirmar el pedido", error: error.message });
  }
});

// CLIENTE: obtener los pedidos confirmados de la sesión actual de su mesa.
router.get("/pedidos/cliente", verificarMesaToken, async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      where: { sesionMesaId: req.mesaCliente.sesionMesaId },
      include: [
        { model: PedidoItem },
        { model: Cuenta } 
      ],
      order: [["id", "DESC"]],
    });

    // Mapeamos armando el nombre inteligentemente
    const pedidosConNombre = pedidos.map(p => {
      let nombreAUsar = "Cuenta eliminada";
      if (p.Cuenta) {
        // Si tiene nombre lo usamos, sino armamos "Cuenta + ID"
        nombreAUsar = p.Cuenta.nombre ? p.Cuenta.nombre : `Cuenta ${p.Cuenta.id}`;
      }
      return {
        ...p.toJSON(),
        nombreCuenta: nombreAUsar
      };
    });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener tus pedidos", error: error.message });
  }
});

// PERSONAL: lista todos los pedidos con su mesa, productos y estado.
router.get("/pedidos", verificarToken, verificarRol(["super-admin", "admin"]), async (req, res) => {
  try {
    const pedidos = await Pedido.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: PedidoItem },
        {
          model: SesionMesa,
          include: [{ model: Mesa }],
        },
      ],
    });

    // Aplanamos la respuesta para que el panel reciba solo lo que necesita.
    const respuesta = pedidos.map((pedido) => ({
      id: pedido.id,
      estado: pedido.estado,
      notas: pedido.notas,
      total: pedido.total,
      mesa: pedido.SesionMesa?.Mesa?.numero ?? null,
      items: pedido.PedidoItems.map((item) => ({
        id: item.id,
        nombreProducto: item.nombreProducto,
        cantidad: item.cantidad,
        subtotal: item.subtotal,
      })),
    }));

    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los pedidos", error: error.message });
  }
});

// PERSONAL: actualiza el estado de un pedido (pendiente, en preparacion, etc.).
router.patch("/pedidos/:id/estado", verificarToken, verificarRol(["super-admin", "admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!ESTADOS_PEDIDO.includes(estado)) {
      return res.status(400).json({ mensaje: "Estado no valido" });
    }

    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    pedido.estado = estado;
    await pedido.save();

    res.json({ mensaje: "Estado actualizado", id: pedido.id, estado: pedido.estado });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estado", error: error.message });
  }
});

// PERSONAL: elimina un pedido junto con su detalle.
router.delete("/pedidos/:id", verificarToken, verificarRol(["super-admin", "admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }

    await PedidoItem.destroy({ where: { pedidoId: id } });
    await pedido.destroy();

    res.json({ mensaje: "Pedido eliminado", id: Number(id) });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el pedido", error: error.message });
  }
});

module.exports = router;
