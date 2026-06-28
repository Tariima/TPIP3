const { Rol, Usuario } = require('./models');

// carga datos minimos para poder usar la autenticacion: los 3 roles base y un usuario admin.
// solo crea lo que falte, asi se puede ejecutar en cada arranque sin duplicar.
const cargarDatosIniciales = async () => {
  const rolesBase = [
    { nombre: 'super-admin', descripcion: 'Acceso total al sistema' },
    { nombre: 'admin', descripcion: 'Administra productos, mesas y pedidos' },
    { nombre: 'cliente', descripcion: 'Realiza pedidos desde la mesa' }
  ];

  // recorre los roles y crea cada uno solo si no existe ya por nombre
  for (const rol of rolesBase) {
    await Rol.findOrCreate({ where: { nombre: rol.nombre }, defaults: rol });
  }

  const cantidadUsuarios = await Usuario.count();
  if (cantidadUsuarios === 0) {
    const rolSuperAdmin = await Rol.findOne({ where: { nombre: 'super-admin' } });

    // la contrasena se hashea automaticamente en el hook beforeSave del modelo Usuario.
    await Usuario.create({
      nombreCompleto: 'Administrador',
      email: 'admin@tpip3.com',
      password: 'admin123',
      rolId: rolSuperAdmin.id
    });

    console.log('Usuario admin inicial creado: admin@tpip3.com / admin123');
  }
};

module.exports = cargarDatosIniciales;
