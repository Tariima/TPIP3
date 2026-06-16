const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CarritoItem = sequelize.define(
  "CarritoItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "carrito_items",
    timestamps: false,
  },
);

module.exports = CarritoItem;
