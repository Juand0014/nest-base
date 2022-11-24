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

## Endpoints for test

| Endpoint | Method | Description |
| --- | --- | --- |
| /users | GET | Returns all users |
| /users/:id | GET | Returns a user by id |
| /users | POST | Creates a new user |
| /users/:id | PUT | Updates a user by id |
| /users/:id | DELETE | Deletes a user by id |


   