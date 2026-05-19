const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const SesionMesa = sequelize.define('SesionMesa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fechaApertura: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  fechaCierre: {
    type: DataTypes.DATE
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'abierta'
  }
}, {
  tableName: 'sesiones_mesa',
  timestamps: false
});

module.exports = SesionMesa;
