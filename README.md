# 🛍️ Variedades Mary API
Autor: Marion Glatzle   
Curso:6to "A"
API REST desarrollada para la gestión de productos e inventario del negocio **Variedades Mary**, un establecimiento dedicado a la comercialización de productos variados.

El proyecto permite administrar productos mediante operaciones CRUD (Crear, Consultar, Actualizar y Eliminar), utilizando tecnologías de desarrollo backend y una base de datos NoSQL.

## 🚀 Tecnologías utilizadas

- **Node.js:** Entorno de ejecución de JavaScript.
- **Express.js:** Framework para desarrollar el servidor y gestionar las rutas.
- **MongoDB:** Base de datos NoSQL para almacenar la información.
- **Mongoose:** Herramienta para modelar y gestionar los datos.
- **CORS:** Middleware para gestionar solicitudes desde diferentes orígenes.
- **Dotenv:** Administración de variables de entorno.
- **Nodemon:** Reinicio automático del servidor durante el desarrollo.
- **Multer:** Middleware para gestionar la carga de archivos e imágenes.
- **Thunder Client:** Herramienta para probar los endpoints de la API.

## 📂 Estructura del proyecto

El proyecto está organizado mediante una estructura que separa controladores, modelos, rutas, conexión a la base de datos y archivos públicos.

```text
misapis/
│
├── controllers/
│   ├── ejemplo.controller.js
│   └── producto.controller.js
│
├── db/
│   └── cnn_mongodb.js
│
├── middleware/
│   └── upload.js
│
├── models/
│   ├── ejemplo.model.js
│   └── producto.model.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── index.html
│
├── routes/
│   ├── ejemplo.routes.js
│   ├── index.routes.js
│   └── producto.routes.js
│
├── misapis/
│
├── server/
│
├── .env
├── .gitattributes
└── .gitignore
```

## 📦 Funcionalidades principales

La API de productos permite:

- Registrar nuevos productos.
- Consultar todos los productos.
- Buscar productos por su identificador.
- Actualizar la información de los productos.
- Eliminar productos del inventario.
- Gestionar nombres, categorías y precios.
- Administrar las cantidades disponibles en stock.
- Registrar marcas y descripciones.
- Gestionar imágenes de los productos.
- Establecer niveles mínimos de inventario.
- Activar o desactivar productos.

## 📋 Modelo de datos de productos

Cada producto contiene información organizada mediante los siguientes atributos:

| Campo | Descripción |
|---|---|
| nombre | Nombre del producto |
| categoria | Categoría del producto |
| precioVenta | Precio de venta |
| stock | Cantidad disponible |
| marca | Marca del producto |
| descripcion | Descripción del producto |
| imagen | Imagen asociada al producto |
| stockMinimo | Cantidad mínima de inventario |
| activo | Estado del producto |

Además, se utilizan fechas de creación y actualización para mantener un registro de los cambios realizados.

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Ingresar a la carpeta del proyecto

```bash
cd nombre-del-proyecto
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y configurar las variables necesarias para la conexión a MongoDB y el puerto del servidor.

```env
PORT=3000
MONGO_URI= url de conexion
```



### 5. Ejecutar el servidor

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

## 🔗 Endpoints de productos

La ruta principal de la API es:

```text
http://localhost:3000/api/productos
```

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Consultar un producto por ID |
| POST | `/api/productos` | Registrar un nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

## 🧪 Pruebas de funcionamiento

Para verificar el funcionamiento de la API se utiliza **Thunder Client**, una extensión de Visual Studio Code que permite realizar solicitudes HTTP.

Se realizan pruebas de los siguientes métodos:

- **GET:** Consulta de productos.
- **POST:** Registro de nuevos productos.
- **PUT:** Actualización de información.
- **DELETE:** Eliminación de productos.

Estas pruebas permiten comprobar la comunicación entre el servidor, las rutas, los controladores y la base de datos MongoDB.
