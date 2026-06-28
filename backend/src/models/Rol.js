// modelo de rol, define los permisos de cada usuario (super-admin, admin, cliente)
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'roles',
  timestamps: false
});

module.exports = Rol;
