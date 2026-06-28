const sequelize = require("../db");

const Rol = require("./Rol");
const Usuario = require("./Usuario");
const Categoria = require("./Categoria");
const Producto = require("./Producto");
const Mesa = require("./Mesa");
const SesionMesa = require("./SesionMesa");
const Pedido = require("./Pedido");
const PedidoItem = require("./PedidoItem");
const Cuenta = require("./Cuenta");
const CarritoItem = require("./CarritoItem");

Rol.hasMany(Usuario, { foreignKey: "rolId" });
Usuario.belongsTo(Rol, { foreignKey: "rolId" });

Categoria.hasMany(Producto, { foreignKey: "categoriaId" });
Producto.belongsTo(Categoria, { foreignKey: "categoriaId" });

Mesa.hasMany(SesionMesa, { foreignKey: "mesaId" });
SesionMesa.belongsTo(Mesa, { foreignKey: "mesaId" });

Usuario.hasMany(SesionMesa, { foreignKey: "usuarioAperturaId" });
SesionMesa.belongsTo(Usuario, { foreignKey: "usuarioAperturaId" });

SesionMesa.hasMany(Pedido, { foreignKey: "sesionMesaId" });
Pedido.belongsTo(SesionMesa, { foreignKey: "sesionMesaId" });

Usuario.hasMany(Pedido, { foreignKey: "usuarioCreadorId" });
Pedido.belongsTo(Usuario, { foreignKey: "usuarioCreadorId" });

Pedido.hasMany(PedidoItem, { foreignKey: "pedidoId" });
PedidoItem.belongsTo(Pedido, { foreignKey: "pedidoId" });

Producto.hasMany(PedidoItem, { foreignKey: "productoId" });
PedidoItem.belongsTo(Producto, { foreignKey: "productoId" });

Mesa.hasMany(Cuenta, { foreignKey: "mesaId" });
Cuenta.belongsTo(Mesa, { foreignKey: "mesaId" });

Cuenta.hasMany(CarritoItem, { foreignKey: "cuentaId" });
CarritoItem.belongsTo(Cuenta, { foreignKey: "cuentaId" });

Producto.hasMany(CarritoItem, { foreignKey: "productoId" });
CarritoItem.belongsTo(Producto, { foreignKey: "productoId" });

Cuenta.hasMany(Pedido, { foreignKey: "cuentaId" });
Pedido.belongsTo(Cuenta, { foreignKey: "cuentaId" });

module.exports = {
  sequelize,
  Rol,
  Usuario,
  Categoria,
  Producto,
  Mesa,
  SesionMesa,
  Pedido,
  PedidoItem,
  Cuenta,
  CarritoItem,
};
