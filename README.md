# Task Management System

A production-ready task management system built with React, Node.js, and MongoDB, adhering to enterprise standards.

## 1. System Requirements
- Docker 24.0+
- Docker Compose v2.0+
- Node.js 20.x (For local development without Docker)

## 2. Installation and Execution

### Running via Docker Compose
The system is fully containerized. To start the application with its dependencies:

```bash
# Start the system in detached mode and rebuild images
docker compose up -d --build
```
The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/v1`
- Swagger UI (API Documentation): `http://localhost:5000/api-docs`

## 3. Environment Variables
A sample environment file is provided at `.env.example`. When using Docker Compose, the system automatically loads environment variables from this file. It contains the necessary configurations for database connections, JWT secrets, and port bindings. No real secrets are exposed.

## 4. Database Migration and Seed Data
The application includes automated database seeding upon backend initialization. The seed script provisions the MongoDB database with:
- 2 User accounts
- 2 Workspaces with configured Role-Based Access Control (RBAC)
- 16 Sample tasks spanning different statuses and priorities

**Test Accounts:**
- Owner Account: `user2@gmail.com` / `123456`
- Member Account: `user1@gmail.com` / `123456`

## 5. API Documentation
The backend implements Swagger/OpenAPI 3.0 specification.
Access the interactive API documentation at: `http://localhost:5000/api-docs`
*Note: To test endpoints requiring authorization, authenticate via the `/auth/login` endpoint or UI, extract the Bearer token, and apply it via the "Authorize" button in Swagger UI.*

## 6. Feature Implementation Status

### Completed Features (100%)
**Mandatory Requirements (MVP):**
- Authentication and Authorization: Registration, Login, Logout, and JWT rotation.
- Password Security: Bcrypt encryption (Cost 12) and complexity validation.
- User Data Isolation: Strict data boundary enforcing user-specific access.
- Task Management (CRUD): Creation, retrieval, modification, and deletion of tasks.
- Advanced Filtering & Pagination: Debounced search, status/priority filtering synced with URL parameters, and React Query pagination.
- Dashboard Analytics: Aggregated metrics and upcoming deadline tracking.

**Bonus Requirements:**
- Kanban Board: Interactive drag-and-drop interface (`dnd-kit`) for status transitions and resource allocation.
- Containerization: Docker Compose orchestration for all services.
- API Documentation: Swagger/OpenAPI integration.
- CI/CD Pipeline: GitHub Actions workflow for automated build and verification on push/pull request.
- Database Seeding: Automated generation of sample structural data.
- Architecture Enhancements:
  - Frontend: Feature-Sliced Design (FSD) architecture.
  - Backend: Modular Domain-Driven Design with Zod as the single source of truth for runtime validation.
  - Authorization: Extended RBAC (Owner, Admin, Member, Observer) combined with Workspace isolation.

### Incomplete Features (0%)
- All requirements from the assignment scope have been implemented.

## 7. Cloud Deployment Guide (Optional)
To deploy the application to cloud infrastructure:
1. **Frontend (Vercel):** Connect the repository, set the root directory to `frontend`, configure `VITE_API_URL` to point to the production backend URL, and deploy.
2. **Backend (Render):** Connect the repository, set the root directory to `backend`, apply build command `npm ci --legacy-peer-deps && npm run build`, start command `npm run start`, configure the corresponding environment variables from `.env.example`, and deploy.
