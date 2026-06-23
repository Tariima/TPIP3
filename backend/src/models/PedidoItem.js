const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Detalle de un pedido. Guarda una "foto" del producto al momento de confirmar
// (nombre y precio) para que el panel del personal no dependa de cambios futuros.
const PedidoItem = sequelize.define(
  "PedidoItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "pedido_items",
    timestamps: false,
  },
);

module.exports = PedidoItem;
