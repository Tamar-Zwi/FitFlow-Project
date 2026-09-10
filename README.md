# 🏋️ FitFlow Studio — Smart Gym Studio Management System

## Overview

**FitFlow Studio** is a full-stack platform that streamlines the relationship between gym studio owners and members. It pairs a robust, secure ASP.NET Core backend with a fast, polished Next.js frontend to deliver a real-time scheduling and membership experience.

## Key Features

### For Studio Managers
- **Full CRUD control** over memberships and classes — create, edit, and remove in a click.
- **Real-time overview** of the studio schedule and the entire member base.

### For Members
- **Smart booking** — browse the weekly schedule and register for classes with a simple, guided flow.
- **Personal dashboard** — track registered classes and manage personal details.
- **Daily motivation** — a dynamic engine surfacing fresh inspirational quotes.
- **Polished UX** — smooth animations and transitions throughout the interface.

## Architecture & Engineering Highlights

- **Clean Architecture** — the backend is split into distinct layers (`Core`, `Data`, `Service`, `API`), each with a single responsibility, following **SOLID** principles.
- **Repository Pattern** — data-access logic is fully decoupled from controllers via repository interfaces and implementations.
- **DTO-based API design** — dedicated DTOs shield the database schema from the outside world and keep API contracts explicit.
- **AutoMapper** — clean, declarative mapping between entities and DTOs.
- **JWT Bearer Authentication** — secure, stateless auth with role-based access control (RBAC) separating manager and member permissions.
- **Fully async backend** — async/await used throughout the service and repository layers for optimal performance.
- **Entity Framework Core + SQL Server** — code-first data modeling with migrations.
- **Documented REST API** — every endpoint is documented and testable via Swagger/OpenAPI, including built-in JWT bearer auth support.
- **Decoupled client/server architecture** — a clean separation between the Web API and the Next.js client, connected via CORS-secured REST endpoints.
- **Automated backend testing** — a dedicated test project covering controllers and core business logic.

## Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | C#, ASP.NET Core Web API, Entity Framework Core, AutoMapper |
| **Database** | SQL Server |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS |
| **Security** | JWT Bearer Authentication, Role-Based Access Control |
| **Tooling** | Swagger / OpenAPI, Docker, Git |

## Getting Started

### Backend
```bash
cd server
# Update the connection string in appsettings.json
dotnet ef database update   # apply EF Core migrations
dotnet run
```
Swagger UI will be available at `https://localhost:<port>/swagger`.

### Frontend
```bash
cd client
npm install
npm run dev
```

## Project Structure

```
server/
├── GymAPI/              # API layer — controllers, models, JWT & Swagger config
├── GymAPI.Core/         # Domain layer — entities, DTOs, service & repository interfaces
├── GymAPI.Data/         # Data layer — EF Core DbContext, repositories, migrations
├── GymAPI.Service/      # Business logic layer
└── GymTest/             # Unit tests for controllers and services

client/
├── app/                 # Next.js App Router pages and layouts
├── components/          # Reusable UI components
└── src/                 # Services, context, and shared data
```

---
*FitFlow Studio demonstrates a production-grade .NET backend built on Clean Architecture and SOLID principles, paired with a modern, animated Next.js frontend — showcasing both backend engineering discipline and frontend craftsmanship.*
