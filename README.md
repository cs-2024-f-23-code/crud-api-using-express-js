# Product Inventory CRUD API

Node.js, Express, MongoDB and Mongoose API for DigiSkills Hands-on Exercise No. 4.

## Setup

1. Install Node.js 18+ and create a MongoDB Atlas database.
2. Run `npm install`.
3. Copy `.env.example` to `.env`; enter the Atlas connection string and a long random JWT secret. Never commit `.env`.
4. Run `npm run dev` or `npm start`. The server listens on port 5000 by default.

## Endpoints

| Method | Endpoint | Access | Notes |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | JSON: name, email, password (8+ characters) |
| POST | `/api/auth/login` | Public | JSON: email, password; returns bearer token |
| GET | `/api/products` | Public | Optional category, search, sort, page, limit |
| GET | `/api/products/:id` | Public | Product detail |
| POST | `/api/products` | Bearer token | Multipart form; optional image field |
| PUT | `/api/products/:id` | Bearer token | Multipart form; optional image field |
| DELETE | `/api/products/:id` | Bearer token | Deletes product |
| GET | `/api/products/stats/summary` | Public | Count and average price by category |

Supported sort values: `price`, `-price`, `date`, `-date`, `name`, `-name`. Images are stored under `uploads/` and served at `/uploads/<filename>`. The upload limit defaults to 5 MB.

## Quick API walkthrough

Register and log in, then set `Authorization: Bearer <token>`. Use JSON for auth and multipart form data for product create/update. Example list URL: `/api/products?category=Books&search=novel&sort=-price&page=1&limit=10`.
