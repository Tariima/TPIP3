// modelo del producto del menu, guarda nombre precio y si esta disponible para pedir
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING, // campo para la url de la img
    allowNull: true
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // si esta en false el producto no se muestra para pedir
  }
}, {
  tableName: 'productos',
  timestamps: false
});

module.exports = Producto;
