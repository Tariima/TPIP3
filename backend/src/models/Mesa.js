// modelo de la mesa, guarda numero estado y el pin que pide el cliente para entrar
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Mesa = sequelize.define('Mesa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  pin: {
    type: DataTypes.STRING,
    allowNull: false // el cliente lo escanea/escribe junto al qr para validar la mesa
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'disponible' // disponible cuando no esta ocupada por una sesion
  },
  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'mesas',
  timestamps: false
});

module.exports = Mesa;
