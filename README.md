<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Base NestJS 
[![GitHub license](https://img.shields.io/npm/l/@nestjs/core.svg)](https://github.com/Juand0014/nest-base/blob/master/LICENSE)



This is a base NestJS project with some basic configurations.

## How to configure this project to your needs?

1. Clone this repository
2. Run `yarn install` to install all dependencies
3. Upload database with docker-compose 
  ```
    docker-compose up -d
  ```
4. Run `yarn start:dev` to start the project in development mode
5. Project will be running on `http://localhost:3000`

## Auth Enpoints

| Endpoint | Method | Description |  
| --- | --- | --- |
| /api/auth/register | POST | Creates a new user |
| /api/auth/login | POST | Login users |
| /api/auth/refreshToken | GET | Refresh Token |
| /api/auth/logout | POST | Logout User

## Cars Endpoint

| Endpoint | Method | Description |
| --- | --- | --- |
| /api/car | GET | Get all cars |
| /api/car/:id | GET | Get car by ID |
| /api/car/:id | PATCH | Update cars by ID |
| api/car | POST | add cars |
| api/car/:id | DELETE |remove car by ID |