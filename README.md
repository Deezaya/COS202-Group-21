# UniVendor

**UniVendor** is a student business directory for the University of Lagos (UNILAG).

There's no centralized way to find student-run vendors on campus — catering, fashion,
hairdressing, tech repair, photography, graphic design, tutoring, cosmetics, and more all
live scattered across WhatsApp groups, Instagram DMs, and word-of-mouth. UniVendor replaces
that with a single categorized directory: vendor profiles, ratings and reviews, verified
student badges, and direct WhatsApp/Instagram/phone contact — no middleman.

## Architecture

A two-part monorepo, talking over a REST API:

```
backend/    Spring Boot (Java 21) REST API, Postgres, JWT auth
frontend/   React + Vite SPA, calls the backend via VITE_API_BASE_URL
```

- **Backend** (`backend/`): Spring Boot 4, Spring Data JPA, Postgres, Flyway-managed schema
  migrations, Spring Security with JWT bearer auth (`/api/auth/register|login`), OpenAPI/Swagger
  docs. Public endpoints for browsing vendors/categories; authenticated endpoints for owning a
  vendor listing and leaving reviews; an admin role for vendor verification.
- **Frontend** (`frontend/`): React 19 + TypeScript + Tailwind, built with Vite. No router —
  navigation is a view-state switch in `App.tsx` (landing, directory, auth, saved vendors, etc).
  The JWT is decoded client-side for display only; every actual permission check happens
  server-side.

See `backend/README.md` and `frontend/README.md` for the full configuration/env var reference.

## Getting Started

**Prerequisites:** Java 21, Node.js, a Postgres database.

```bash
# Backend - runs on :8080
cd backend
cp .env.example .env   # fill in your DB credentials and a JWT secret
./mvnw spring-boot:run

# Frontend - runs on :3000
cd frontend
cp .env.example .env.local   # point VITE_API_BASE_URL at the backend above
npm install
npm run dev
```

Then open `http://localhost:3000`.
