<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Base NestJS 
[![GitHub license](https://img.shields.io/npm/l/@nestjs/core.svg)](https://github.com/Juand0014/nest-base/blob/master/LICENSE)



This is a base NestJS project with some basic configurations.

## How to configure this project to your needs?

1. Clonar el repositorio
2. Ejecutar

    ```
    yarn install
    ```

3. Tener nest CLI instalado

    ```
    npm i -g @nestjs/cli
    ```
    
4. Crear la imagen de la db

    ```
    docker-compose up --build
    ```

5. Levantar la base de datos

    ```
    docker-compose up -d
    ```

6. Clonar el __.env.template__ y renombrarlo a __.env__
   
7. Llenar las variables de entorno definidas en el archivo __.env__

8. Ejecutar la aplicacion en dev 
    ```
    yarn start:dev 
    ```
9. If you wanna see the documentation run 
    ```
    yarn doc
    ```
Project running on http://localhost:3001

## EndPoints

### Auth Enpoints

| Endpoint | Method | Description |  
| --- | --- | --- |
| /api/auth/register | POST | Creates a new user |
| /api/auth/login | POST | Login users |
| /api/auth/refreshToken | GET | Refresh Token |
| /api/auth/logout | POST | Logout User

### Cars Endpoint

| Endpoint | Method | Description |
| --- | --- | --- |
| /api/car | GET | Get all cars |
| /api/car/:id | GET | Get car by ID |
| /api/car/:id | PATCH | Update cars by ID |
| api/car | POST | add cars |
| api/car/:id | DELETE |remove car by ID |

## Stack usado

* MongoDB
* Nest

# Production Build
1. Crear el archivo __.env.prod__
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env up --build
```
4. Correr la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env up -d
```
