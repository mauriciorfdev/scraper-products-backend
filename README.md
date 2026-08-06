# Scraper Products | Backend

## About Project

REST API for the Scraper Products application. It provides authenticated access to supermarket product data, AI-powered ingredient analysis, and administrative resources.

The application uses a dataset previously collected through automated scraping.

## Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)

## Features

- AI-powered ingredient analysis
- User registration and authentication
- Product catalog access
- Authenticated user profile retrieval
- Role-based access control
- Admin access to user data and scraper operations

## Architecture

- **Authentication** — Protects private endpoints using JWT stored in HTTP-only cookies.
- **Authorization** — Restricts access to protected resources based on user roles.
- **Validation** — Validates incoming requests using Zod schemas.
- **Database** — Stores user and product data in MongoDB using Mongoose.
- **AI Service** — Integrates with Google Gemini to analyze product ingredients and generate structured nutritional information.

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

| Method | Endpoint                     | Description                | Access              |
| ------ | ---------------------------- | -------------------------- | ------------------- |
| GET    | `/api/products`              | Retrieve all products      | Authenticated users |
| POST   | `/api/products/:id/analysis` | Analyze a product using AI | Admin only          |

## Getting Started

1. Install dependencies: `pnpm install`
2. Setup `.env` file:
   - `MONGO_URI = your_connection_string`
   - `JWT_SECRET = your_secret_key`
   - `GEMINI_API_KEY = your_ai_api_key`
   - `AI_MODEL = your_ai_model`
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
