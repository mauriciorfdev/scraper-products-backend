# Scraper Products | Backend

## About Project

REST API built with Express and MongoDB for managing supermarket product data obtained through automated scraping.

The backend includes basic authentication features using JWT and provides REST endpoints for user management.

## Architecture

- **API (Express + Node.js)** — Handles HTTP requests, routing, controllers, and authentication logic.

- **Database (MongoDB + Mongoose)** — Stores user data.

## Features

- JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- Role-based authorization
- Input validation middleware
- REST API structure with controllers and routes
- MongoDB integration with Mongoose

## Folder Structure Overview

```
.
├── config
│   └── db.js
├── controllers
│   ├── auth.controller.js
│   └── user.controller.js
├── middleware
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   ├── validate.middleware.js
│   └── notFound.middleware.js
├── models
│   └── user.model.js
├── routes
│   ├── auth.routes.js
│   └── user.routes.js
├── utils
│   └── generateToken.js
├── validators
│   └── auth.validator.js
├── app.js
└── server.js
```

_The following files are omitted for simplicity: `.env`, `.gitignore`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `README.md`_

## API Endpoints

The endpoints can be tested using Postman or Thunder Client (VS Code).

| Method | Endpoint             | Description                                           | Access              |
| ------ | -------------------- | ----------------------------------------------------- | ------------------- |
| GET    | `/api/users`         | Retrieve all registered users (_excluding passwords_) | Admin only          |
| GET    | `/api/auth/profile`  | Retrieve authenticated user's profile                 | Authenticated users |
| POST   | `/api/auth/register` | Register a new user                                   | Public              |
| POST   | `/api/auth/login`    | Authenticate a user and return a JWT                  | Public              |

_Some API endpoints are currently used for development and testing purposes and may be removed or modified in future versions._

## Getting Started

1. Install dependencies: `pnpm install`
2. Setup `.env` file:
   - `MONGO_URI = your_connection_string`
   - `JWT_SECRET = your_secret_key`
3. Run the server: `pnpm run dev`
4. The server will run on:
   - `http://localhost:3000`

## Request Example

### POST `/api/auth/register`

#### Request Body

```json
{
  "name": "John",
  "email": "john@gmail.com",
  "password": "john123"
}
```

### POST `/api/auth/login`

#### Request Body

```json
{
  "email": "john@gmail.com",
  "password": "john123"
}
```

## Testing

The project includes integration tests using Jest and Supertest. The covered scenarios are:

- User registration:
  - 201 Created
  - 400 Bad Request
  - 409 Conflict

- User login:
  - 200 OK
  - 401 Unauthorized
