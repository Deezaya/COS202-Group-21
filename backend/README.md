# UniVendor Backend

Spring Boot API for UniVendor, the UNILAG student business directory.

## Run Locally

**Prerequisites:** Java 21, a Postgres database.

1. Copy `.env.example` to `.env` and fill in your local Postgres credentials and a JWT secret
   (`openssl rand -base64 32`). `.env` is loaded automatically and is git-ignored.
2. Run the app:
   `./mvnw spring-boot:run`

Flyway applies the migrations in `src/main/resources/db/migration` on startup;
`spring.jpa.hibernate.ddl-auto=validate` so Hibernate never alters the schema itself.

## Configuration

All configuration is environment-variable driven (see `.env.example`):

| Variable | Required | Default | Notes |
|---|---|---|---|
| `DB_URL` | yes in prod | `jdbc:postgresql://localhost:5432/univendor` | |
| `DB_USERNAME` | yes in prod | `postgres` | |
| `DB_PASSWORD` | yes in prod | `postgres` | |
| `JWT_SECRET` | **yes** | none | HS256 signing key, 32+ random bytes |
| `JWT_EXPIRATION_MINUTES` | no | `60` | |
| `PORT` | no | `8080` | set by most PaaS platforms automatically |
| `CORS_ALLOWED_ORIGINS` | yes in prod | `http://localhost:3000,http://localhost:5173` | comma-separated frontend origin(s) |

## Deployment

Deploys as a standard Maven/Java app - no Dockerfile needed on buildpack-based
platforms (Railway, Render, Heroku-style). `Procfile` pins the start command:

```
web: java -jar target/backend-0.0.1-SNAPSHOT.jar
```

Before deploying:
- Set `JWT_SECRET` and `CORS_ALLOWED_ORIGINS` (the deployed frontend's origin) on the platform.
- Point `DB_URL`/`DB_USERNAME`/`DB_PASSWORD` at the production database.
- `GET /actuator/health` is unauthenticated and suitable for the platform's health check.
