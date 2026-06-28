// modelo de sesion de mesa, representa una atencion desde que se abre hasta que se cierra la mesa
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
    type: DataTypes.DATE // queda en null mientras la sesion sigue abierta
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'abierta' // pasa a cerrada cuando se cierra la mesa
  }
}, {
  tableName: 'sesiones_mesa',
  timestamps: false
});

module.exports = SesionMesa;
