// modelo del usuario del sistema, guarda datos de login y el rol que tiene
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
    unique: true // no se puede repetir, sirve como identificador para el login
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
    defaultValue: 3 // por defecto 'cliente' (rol de menor privilegio, id 3 en seed.js) si no se envia rolId
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  hooks: {
    // hashea la contrasena antes de guardar, tanto al crear como al modificar.
    beforeSave: async (usuario) => {
      if (usuario.changed('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    }
  }
});

// compara una contrasena en texto plano contra el hash guardado.
Usuario.prototype.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

module.exports = Usuario;
