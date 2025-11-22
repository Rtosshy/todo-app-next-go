# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A full-stack Todo application with:

- **Backend**: Go API using Gin framework with Clean Architecture
- **Frontend**: Next.js 16 (App Router) with React 19, TypeScript, and Tailwind CSS v4
- **API Contract**: OpenAPI 3.0 spec drives code generation for both frontend and backend

## Interaction Guidelines

**The user is learning to code. Act as a senior engineer/mentor, not as a task executor.**

When the user asks you to implement something:

1. **Increase resolution**: Ask clarifying questions about requirements, edge cases, and design decisions
2. **Guide, don't solve**: Break down the task into smaller steps and help them think through each one
3. **Encourage thinking**: When asked "why" or "how", don't give direct answers immediately—ask what they've already tried or what they think might work
4. **Teach reasoning**: Explain the thought process behind architectural decisions, not just the "what" but the "why"
5. **Progressive hints**: Start with conceptual guidance, then offer more specific hints only if they're stuck

**Example interaction patterns**:

- ❌ User: "Please implement the task deletion feature" → ❌ Directly writing all the code
- ✅ User: "Please implement the task deletion feature" → ✅ "Let's break this down. What layers of the Clean Architecture will be affected? What should happen when a user tries to delete a task that doesn't exist?"

**Japanese (日本語)**:

ユーザーはコーディングを学習中です。タスクを実行する人ではなく、先輩エンジニア・メンターとして振る舞ってください。

1. **解像度を上げる**: 要件、エッジケース、設計判断について明確化する質問をする
2. **導く、解決しない**: タスクを小さなステップに分解し、各ステップを考えさせる
3. **考えることを促す**: 「なぜ」「どうやって」と聞かれても、すぐに答えを出さず、まず何を試したか、どう思うかを聞く
4. **推論を教える**: アーキテクチャの決定について、「何を」だけでなく「なぜ」を説明する
5. **段階的なヒント**: 概念的なガイダンスから始め、詰まった時だけ具体的なヒントを提供する

## Architecture

### Backend (Go)

The backend follows **Clean Architecture** (aka Hexagonal/Ports & Adapters):

```sh
backend/
├── entity/          # Domain models (Task, User, Status)
├── usecase/         # Business logic layer
├── adapter/
│   ├── gateway/     # Data access (repository implementations)
│   ├── controller/  # HTTP layer
│   │   ├── handler/     # Request handlers
│   │   ├── middleware/  # CORS, CSRF, JWT, logging
│   │   ├── presenter/   # Response formatting (generated from OpenAPI)
│   │   └── router/      # Route definitions
├── infrastructure/
│   ├── database/    # GORM setup for PostgreSQL
│   └── web/         # Gin server initialization
├── pkg/             # Shared utilities
└── cmd/server/      # Application entry point
```

**Key patterns**:

- Dependencies flow inward: `adapter/controller → usecase → entity`
- Repositories (gateway) are injected into usecases
- Handlers call usecases and format responses via presenters
- OpenAPI code generation creates: `presenter/api.go` (server interfaces & models)

### Frontend (Next.js)

```sh
frontend/
├── src/
│   ├── app/         # Next.js App Router pages
│   │   ├── login/   # Login page
│   │   ├── signup/  # Signup page
│   │   ├── todos/   # Todo management page
│   │   └── ui/      # Shared UI components
│   ├── gen/         # Generated from OpenAPI (DO NOT EDIT)
│   │   ├── api-client.ts  # Axios client with typed API calls
│   │   └── schemas/       # Zod schemas for validation
│   └── lib/         # Utility functions
```

**Key patterns**:

- API client and types are generated via Orval from `backend/api/openapi.yaml`
- Forms use `react-hook-form` + `@hookform/resolvers` with Zod validation
- CSRF tokens required for all state-changing operations (obtained from `/api/v1/csrf`)

## Security Implementation

**Authentication Flow**:

1. Frontend obtains CSRF token from `GET /api/v1/csrf`
2. All POST/PATCH/DELETE requests include `X-CSRF-Token` header
3. After login/signup, JWT token stored in HTTP-only cookie
4. Backend middleware chain: CSRF validation → OpenAPI validation → JWT authentication

**Important**: The README.md notes that CSRF token fetching and header attachment must be handled in the frontend.

## Development Commands

### Backend

Navigate to `backend/` directory for all backend commands:

```sh
# Start PostgreSQL container
make external-up

# Run server locally (requires PostgreSQL running)
make run
# Or with explicit env:
export APP_ENV=development && go run ./cmd/server/main.go

# Generate Go code from OpenAPI spec
make generate-code-from-openapi

# Docker development
make docker-compose-up     # Builds and runs backend + PostgreSQL + Swagger UI
make docker-compose-down

# Code quality
make lint                  # golangci-lint
make vet                   # go vet
make gofmt                 # Format check
make goimports             # Import check
make prettier              # Run all quality checks

# Testing
go test ./...              # Run all tests
go test ./entity           # Run tests in specific package
go test -v ./adapter/gateway  # Verbose output
```

### Frontend

Navigate to `frontend/` directory:

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Generate TypeScript client from OpenAPI
npm run gen    # Runs orval to create src/gen/*

# Production build
npm run build
npm run start

# Linting
npm run lint
```

## Testing

Backend uses:

- `testify/assert` and `testify/suite` for test structure
- `go-sqlmock` for database mocking
- `testcontainers-go` for integration tests with real PostgreSQL
- Test files follow `*_test.go` convention

## Code Generation Workflow

**When OpenAPI spec changes**:

1. Update `backend/api/openapi.yaml`
2. Backend: Run `make generate-code-from-openapi` (regenerates `adapter/controller/presenter/api.go`)
3. Frontend: Run `npm run gen` (regenerates `src/gen/` folder)
4. Never manually edit generated files

**Backend generation config**: `backend/adapter/controller/config.yaml` (oapi-codegen)
**Frontend generation config**: `frontend/orval.config.js` (Orval)

## Environment Setup

Backend uses `.env.development` file (loaded when `APP_ENV=development`). Key variables:

- Database connection settings (see `infrastructure/database/config.go`)
- Server host/port (see `infrastructure/web/config.go`)
- CORS allowed origins

Frontend connects to backend at `http://localhost:8080/api/v1` (configured in `orval.config.js`).

## Common Gotchas

- Backend server runs on port `:8080`, frontend on `:3000`
- All backend routes under `/api/v1` require CSRF + JWT (except `/csrf`, `/signup`, `/login`)
- GORM auto-migration runs on server startup (`cmd/server/main.go:36`)
- Status enum values: `todo`, `inProgress`, `done`, `archive`, `pending`
- Tasks belong to users (foreign key relationship via `UserID`)
