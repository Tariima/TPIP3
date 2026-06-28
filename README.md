# Trabajo Final Programacion 3 - TUP

Este proyecto busca resolver una necesidad comun en bares: agilizar la atencion de las mesas y facilitar que los clientes puedan hacer pedidos durante toda la noche sin depender tanto de la presencia constante de un mozo.

La idea principal es que cada mesa tenga un codigo QR. Al escanearlo, el cliente puede ver la carta y hacer pedidos desde su celular. Del lado del bar, el sistema permite organizar esos pedidos y reducir tiempos de espera, tanto para el personal como para los clientes.

## Objetivo del proyecto

Crear una aplicacion para la gestion de bares donde:

- Los clientes puedan hacer pedidos desde la mesa usando un QR.
- El bar pueda recibir y administrar esos pedidos.
- Se reduzca la intervencion manual de los mozos en tareas repetitivas.
- La atencion sea mas rapida y ordenada durante toda la noche.

## Tecnologias utilizadas

Frontend:

- React (con Vite como build tool y dev server).
- React Router para el ruteo y manejo de SPA.
- React Bootstrap y CSS propio para los estilos.
- react-toastify para los avisos al usuario.
- Context API para el estado global (usuario logueado y sesion de la mesa).

Backend:

- Node.js con Express.
- Sequelize como ORM y SQLite como base de datos.
- JWT (jsonwebtoken) para la autenticacion y bcryptjs para encriptar las contraseñas.

## Funcionalidades

Para el cliente (entra escaneando el QR de la mesa):

- Escanea el QR, ingresa el PIN que le da el mozo y entra a la carta de esa mesa.
- Mira las categorias y los productos, arma su carrito y confirma el pedido.
- Puede ver el historial de pedidos de la mesa, separado por cuenta.

Para el personal / admin (entra con login):

- ABM de productos y de categorias (con imagen).
- ABM de mesas: crear, editar, borrar, abrir y cerrar la mesa, y generar el PIN y el QR.
- Panel de pedidos para ver lo que piden las mesas e ir cambiando el estado de cada uno.

Para el super-admin:

- Todas las funciones anteriores.
- ABM de usuarios, incluyendo el cambio de rol.

Otras cosas que tiene la app:

- Tres roles distintos (super-admin, admin y cliente) con las rutas protegidas segun corresponda.
- Validacion en los formularios con su aviso al usuario cuando algo esta mal.
- Modo claro y modo oscuro.

## Estructura del proyecto

```txt
TPIP3/
  backend/
    src/
      controllers/
      middlewares/
      models/
      routes/
      validations/
      db.js
      seed.js
      server.js
    package.json
  src/
    cliente/
    components/
    services/
    App.jsx
    main.jsx
    index.css
  index.html
  vite.config.js
  package.json
  README.md
```

## Como correr el proyecto

Hay que levantar el backend y el frontend en dos terminales distintas.

### Backend

```bash
cd backend
npm install
npm run dev
```

El servidor queda corriendo en `http://localhost:3001`.

La base de datos (SQLite) se crea sola la primera vez que arranca. Ademas se carga un usuario admin por defecto para poder entrar:

```txt
email: admin@tpip3.com
contraseña: admin123
```

### Frontend

Desde la carpeta principal del proyecto:

```bash
npm install
npm run dev
```

La aplicacion queda disponible en `http://localhost:3000`.

## Flujo de trabajo

Para organizar el desarrollo usamos el flujo de feature branches.

Cada cambio se trabaja en una rama propia, separada de la rama principal. La rama tiene que tener un nombre claro que indique el tipo de trabajo y una breve descripcion.

Convencion para nombrar ramas:

- `feat/nombre-del-cambio`: para nuevas funcionalidades o implementaciones.
- `fix/nombre-del-arreglo`: para correcciones de errores.
- `hotfix/nombre-del-arreglo`: para correcciones urgentes.
- `docs/nombre-del-cambio`: para cambios en documentacion.
- `refactor/nombre-del-cambio`: para mejoras internas del codigo que no cambian el comportamiento.
- `style/nombre-del-cambio`: para cambios de formato, estilos o ajustes visuales.

Ejemplos:

```txt
feat/crear-menu-digital
fix/error-conexion-backend
hotfix/api-key-expuesta
docs/actualizar-readme
refactor/ordenar-rutas-backend
style/mejorar-estilos-app
```

Una vez terminado el trabajo en la rama, se revisa y se integra a la rama principal.

## Integrantes

- Ayquipa Marco
- Dino Gabriel
- Paletta Jeremias
- Sione Matias
