# Pruebas rápidas en Postman

## 1. Registro

POST `http://localhost:8080/api/sessions/register`

```json
{
  "first_name": "Eithan",
  "last_name": "Skliarsky",
  "email": "eithan@gmail.com",
  "age": 20,
  "password": "123456"
}
```

## 2. Login

POST `http://localhost:8080/api/sessions/login`

```json
{
  "email": "eithan@gmail.com",
  "password": "123456"
}
```

## 3. Current usando cookie

GET `http://localhost:8080/api/sessions/current`

Postman debería guardar la cookie automáticamente después del login.

## 4. Current usando Authorization Bearer

GET `http://localhost:8080/api/sessions/current`

Headers:

```txt
Authorization: Bearer PEGAR_TOKEN_ACA
```
