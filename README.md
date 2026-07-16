# Scraper Products | Backend

## About Project

REST API for the Scraper Products application. It provides authenticated access to supermarket product data and administrative resources, and is designed to integrate with an automated scraping service

## Features

- User registration and authentication
- Product catalog access
- Authenticated user profile retrieval
- Role-based access control
- Admin access to user data and scraper operations

## Architecture

- **Authentication** — Protects private endpoints using JWT stored in HTTP-only cookies.
- **Authorization** — Restricts access to protected resources based on user roles.
- **Validation** — Validates incoming requests using Zod schemas.
- **Database** — Stores user data in MongoDB using Mongoose.

## API Endpoints

The endpoints can be tested using Postman or Thunder Client (VS Code).

### Authentication

| Method | Endpoint             | Description                                   | Access              |
| ------ | -------------------- | --------------------------------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user                           | Public              |
| POST   | `/api/auth/login`    | Authenticate a user                           | Public              |
| POST   | `/api/auth/logout`   | Log out the current user                      | Authenticated users |
| GET    | `/api/auth/me`       | Retrieve the authenticated user's information | Authenticated users |

### Users

| Method | Endpoint     | Description                   | Access     |
| ------ | ------------ | ----------------------------- | ---------- |
| GET    | `/api/users` | Retrieve all registered users | Admin only |

### Products

| Method | Endpoint               | Description                  | Access              |
| ------ | ---------------------- | ---------------------------- | ------------------- |
| GET    | `/api/products`        | Retrieve all products        | Authenticated users |
| POST   | `/api/products/scrape` | Trigger the scraping service | Admin only          |

## Getting Started

1. Install dependencies: `pnpm install`
2. Setup `.env` file:
   - `MONGO_URI = your_connection_string`
   - `JWT_SECRET = your_secret_key`
3. Run the server: `pnpm run dev`
4. The server will run on:
   - `http://localhost:3000`

## Testing

Integration tests were implemented using Jest and Supertest.

Authentication:

- **400 Bad Request** – Missing fields, invalid email
- **401 Unauthorized** – Invalid credentials
- **409 Conflict** – Duplicate email
- **201 Created** – Successful user registration
- **200 OK** – Successful login

Users:

- **403 Forbidden** – Admin acces required
- **200 OK** – Successfully retrives the user list as an admin
