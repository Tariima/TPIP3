# Trabajo Final Programacion 3 - TUP

Este proyecto busca resolver una necesidad comun en bares: agilizar la atencion de las mesas y facilitar que los clientes puedan hacer pedidos durante toda la noche sin depender tanto de la presencia constante de un mozo.

La idea principal es que cada mesa tenga un codigo QR. Al escanearlo, el cliente puede ver las opciones disponibles y realizar pedidos desde su celular. Del lado del bar, el sistema permitiria organizar mejor esos pedidos y reducir tiempos de espera, tanto para el personal como para los clientes.

En esta primera etapa se dejo armada la estructura base del proyecto, separando el frontend y el backend, y verificando que ambas partes puedan comunicarse entre si.

## Objetivo del proyecto

Crear una aplicacion para la gestion de bares donde:

- Los clientes puedan hacer pedidos desde la mesa usando un QR.
- El bar pueda recibir y administrar esos pedidos.
- Se reduzca la intervencion manual de los mozos en tareas repetitivas.
- La atencion sea mas rapida y ordenada durante toda la noche.

## Tecnologias utilizadas

- React para el frontend.
- Node.js con Express para el backend.
- Variables de entorno para configurar la conexion entre cliente y servidor.

## Estructura inicial

```txt
TPIP3/
  backend/
    src/
      routes/
      server.js
    package.json
    .env.example
  public/
  src/
    services/
      api.js
    App.js
    App.css
    index.js
    index.css
  .env.example
  package.json
  README.md
```

## Como correr el proyecto

Para correr el proyecto hay que levantar el backend y el frontend en dos terminales distintas.

### Backend

```bash
cd backend
npm install
npm run dev
```

El servidor queda disponible en:

```txt
http://localhost:3001
```

Ruta de prueba:

```txt
http://localhost:3001/api/prueba
```

### Frontend

Desde la carpeta principal del proyecto:

```bash
npm install
npm run dev
```

La aplicacion queda disponible en:

```txt
http://localhost:3000
```

## Flujo de trabajo

Para organizar el desarrollo vamos a usar el flujo de feature branches.

Cada cambio se va a trabajar en una rama propia, separada de la rama principal. La rama tiene que tener un nombre claro que indique el tipo de trabajo y una breve descripcion.

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

## Estado actual

Por ahora el proyecto cuenta con la estructura inicial y una ruta de prueba para comprobar que el frontend se conecta correctamente con el backend.

Cuando ambas partes estan corriendo, la pantalla muestra un mensaje indicando que la conexion entre frontend y backend funciona.

## Integrantes

- Ayquipa Marco
- Dino Gabriel
- Paletta Jeremias
- Sione Matias
