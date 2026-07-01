# Session Booking API

REST API for booking teacher sessions. Built with Node.js, TypeScript, Express, and MongoDB.

## Prerequisites

- Node.js 18+
- MongoDB running locally (or a remote connection string)

## Setup

```bash
cd nodeExpressApplication
npm install
cp .env.example .env
```

Update `.env` if needed:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/session-booking
```

## Run

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Server starts at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a user |
| POST | `/teachers` | Create a teacher (helper endpoint for testing) |
| POST | `/sessions` | Create a session |
| GET | `/sessions/available?dateTimestamp={ts}` | List available sessions for a date |
| POST | `/sessions/:id/book` | Book a session |
| PATCH | `/sessions/:id/complete` | Mark session as completed |
| GET | `/users/:id/sessions` | Get user's upcoming and completed sessions |

## HTTP Status Codes

| Code | When |
|------|------|
| 201 | Resource created successfully |
| 200 | Successful read or update |
| 400 | Validation error or invalid id |
| 404 | User, teacher, session, or route not found |
| 409 | Duplicate email or session state conflict |
| 500 | Unexpected server error |

## Example Flow

1. Create a teacher
2. Create a user
3. Create a session for that teacher
4. Fetch available sessions for the session date
5. Book the session with the user id
6. Complete the session
7. Fetch the user's session list

## Postman

Import `postman/SessionBookingAPI.postman_collection.json` into Postman. Collection variables `baseUrl`, `teacherId`, `userId`, and `sessionId` are set automatically from responses.

## Project Structure

```
src/
  config/        - environment configuration
  controllers/   - request/response handling
  db/            - MongoDB connection
  dto/           - request and response types
  helpers/       - shared utility functions
  middleware/    - validation, error handling, 404 handler
  models/        - Mongoose schemas
  repository/    - database queries
  routes/        - route definitions
  services/      - business logic
  transformers/  - response shaping
  validators/    - Joi request schemas
  utils/         - shared helpers (AppError)
```
