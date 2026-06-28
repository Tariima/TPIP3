// modelo de cuenta, sirve para dividir el consumo de una mesa entre varias personas
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Cuenta = sequelize.define(
  "Cuenta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "abierta", // abierta mientras se le pueden seguir cargando pedidos
    },
  },
  {
    tableName: "cuentas",
    timestamps: false,
  },
);

module.exports = Cuenta;
