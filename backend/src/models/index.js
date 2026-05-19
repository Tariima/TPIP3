const sequelize = require('../db');

const Rol = require('./Rol');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');
const Producto = require('./Producto');
const Mesa = require('./Mesa');
const SesionMesa = require('./SesionMesa');
const Pedido = require('./Pedido');
const DetallePedido = require('./DetallePedido');

Rol.hasMany(Usuario, { foreignKey: 'rolId' });
Usuario.belongsTo(Rol, { foreignKey: 'rolId' });

Categoria.hasMany(Producto, { foreignKey: 'categoriaId' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Mesa.hasMany(SesionMesa, { foreignKey: 'mesaId' });
SesionMesa.belongsTo(Mesa, { foreignKey: 'mesaId' });

Usuario.hasMany(SesionMesa, { foreignKey: 'usuarioAperturaId' });
SesionMesa.belongsTo(Usuario, { foreignKey: 'usuarioAperturaId' });

SesionMesa.hasMany(Pedido, { foreignKey: 'sesionMesaId' });
Pedido.belongsTo(SesionMesa, { foreignKey: 'sesionMesaId' });

Usuario.hasMany(Pedido, { foreignKey: 'usuarioCreadorId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioCreadorId' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Producto.hasMany(DetallePedido, { foreignKey: 'productoId' });
DetallePedido.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = {
  sequelize,
  Rol,
  Usuario,
  Categoria,
  Producto,
  Mesa,
  SesionMesa,
  Pedido,
  DetallePedido
};
