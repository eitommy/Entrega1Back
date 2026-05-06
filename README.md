# Entrega N°1 - CRUD de Usuarios, Autenticación y Autorización

Proyecto backend realizado con Node.js, Express, MongoDB, Mongoose, Passport, JWT y bcrypt.

## Funcionalidades

- Modelo de usuario con los campos requeridos por la consigna.
- Contraseña encriptada con `bcrypt.hashSync`.
- CRUD completo de usuarios.
- Registro de usuarios.
- Login con generación de JWT.
- Autenticación mediante Passport JWT.
- Ruta protegida `/api/sessions/current`.
- Validación del usuario logueado mediante token JWT.
- Referencia de usuario a carrito mediante `cart`.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Passport
- Passport JWT
- JSON Web Token
- bcrypt
- cookie-parser
- dotenv

## Instalación

```bash
npm install
```

Crear un archivo `.env` tomando como ejemplo `.env.example`:

```env
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/entrega1_auth_ecommerce
JWT_SECRET=coderSecret
```

## Ejecutar el proyecto

```bash
npm run dev
```

Servidor disponible en:

```txt
http://localhost:8080
```

## Endpoints principales

### Sessions

#### Registro

```http
POST /api/sessions/register
```

Body:

```json
{
  "first_name": "Eithan",
  "last_name": "Skliarsky",
  "email": "eithan@gmail.com",
  "age": 20,
  "password": "123456"
}
```

#### Login

```http
POST /api/sessions/login
```

Body:

```json
{
  "email": "eithan@gmail.com",
  "password": "123456"
}
```

#### Current

```http
GET /api/sessions/current
```

Requiere token JWT válido en cookie o en header Authorization.

Header opcional:

```txt
Authorization: Bearer TOKEN
```

#### Logout

```http
POST /api/sessions/logout
```

### CRUD Usuarios

#### Obtener todos los usuarios

```http
GET /api/users
```

#### Obtener usuario por ID

```http
GET /api/users/:uid
```

#### Crear usuario

```http
POST /api/users
```

#### Actualizar usuario

```http
PUT /api/users/:uid
```

#### Eliminar usuario

```http
DELETE /api/users/:uid
```

## Importante para la entrega

El repositorio no debe incluir la carpeta `node_modules`.
