const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rolId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3 // Por defecto 'cliente' (rol de MENOR privilegio, id 3 en seed.js) si no se envía rolId
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  hooks: {
    // Hashea la contraseña antes de guardar, tanto al crear como al modificar.
    beforeSave: async (usuario) => {
      if (usuario.changed('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    }
  }
});

// Compara una contraseña en texto plano contra el hash guardado.
Usuario.prototype.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

module.exports = Usuario;
