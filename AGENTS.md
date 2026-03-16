# Repository Guidelines

## Project Structure
This repo is a monorepo with a React frontend and a NestJS backend. Prioritize `apps/` and avoid `node_modules/` unless the task is explicitly about dependency internals.

Main layout:
- `apps/web/`: React + Vite + TypeScript frontend.
- `apps/web/src/main.tsx`: React entrypoint with `BrowserRouter`.
- `apps/web/src/App.tsx`: public landing + `login` + protected `admin`.
- `apps/web/src/app/store/`: Zustand stores for courses and auth session.
- `apps/web/src/hooks/`: reusable hooks like `useCourses`, `useAuth`, `useAdminCourses`.
- `apps/web/src/components/layout/`: `Header`, `Navbar`, `Footer`, `CompactHeader`.
- `apps/web/src/components/sections/`: landing sections.
- `apps/web/src/components/courses/`: landing course UI.
- `apps/web/src/components/admin/`: admin dashboard UI, table, toolbar, alerts, modal, form, pagination.
- `apps/web/src/pages/`: `LoginPage`, `AdminPage`.
- `apps/web/src/lib/`: API client, formatters, API error helpers.
- `apps/web/src/schemas/`: Zod schemas for frontend payloads and API responses.
- `apps/web/src/types/`: shared frontend types.
- `apps/web/styles.css`: global styles for landing, login and admin.
- `apps/api/`: NestJS API with Prisma and SQLite.
- `apps/api/src/main.ts`: Nest bootstrap and CORS setup.
- `apps/api/src/app.module.ts`: root module with `ConfigModule`.
- `apps/api/src/config/`: env validation and typed config.
- `apps/api/src/common/`: Zod decorators and validation pipe.
- `apps/api/src/prisma/`: Prisma module and service.
- `apps/api/src/modules/auth/`: JWT login flow.
- `apps/api/src/modules/users/`: user lookup for auth.
- `apps/api/src/modules/courses/`: catalog endpoints and business logic.
- `apps/api/prisma/schema.prisma`: Prisma schema for SQLite.
- `apps/api/prisma/seed.mjs`: seeds courses and admin user.
- `apps/api/prisma.config.ts`: Prisma CLI config.
- `apps/api/test/`: e2e and Prisma integration tests.
- `courses.json`: shared seed dataset for local development. Frontend does not consume it directly.

Ignore generated output unless the task is specifically about build artifacts:
- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- `apps/api/prisma/*.db`
- `apps/api/prisma/*.db-journal`

## Commands
Install from repo root:
```bash
npm install
```

Common workflows:
```bash
npm run dev
npm run dev:web
npm run dev:api
npm run build
```

Prisma:
```bash
npm run prisma:generate
npm run prisma:db:push
npm run prisma:seed
```

Backend tests:
```bash
npm run test -w @cursos/api
```

Default URLs:
- frontend: `http://localhost:5173`
- backend: `http://localhost:3000`

Useful checks:
```bash
rg -n "TODO|FIXME|propuesta|metodolog" apps courses.json
curl -s http://localhost:3000/courses
curl -s "http://localhost:3000/courses/paginated?page=1&limit=8"
```

## Coding Style
Use 2-space indentation in TS, TSX, CSS, HTML and Prisma files.

Naming patterns:
- React components: PascalCase.
- Hooks: `useX`.
- Zustand stores: `useXStore`.
- Nest modules/services/controllers: PascalCase by feature.
- Utilities: camelCase.
- CSS classes: kebab-case.
- Data keys: lower-case JSON keys like `slug`, `title`, `best_sellers`.
- Env vars: upper-case like `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`.

Keep copy in Spanish unless a section is already branded in English.

## Architecture Notes
Frontend:

- Use `react-router-dom` for routing. Public routes: `/` and `/login`. Protected route: `/admin`.
- Keep auth session in Zustand under `apps/web/src/app/store/`.
- `useAuth` handles login/logout session logic and JWT persistence in `localStorage`.
- `useCourses` powers the public landing and uses public API endpoints.
- `useAdminCourses` powers the admin dashboard and uses paginated backend data.
- Admin table uses backend pagination only. Landing still uses the public non-paginated flow it already had.
- Admin search filters by course title against backend `query`.
- Admin create/edit/delete use protected endpoints with bearer token.
- Keep reusable admin UI split by role: toolbar, table, row actions, modal, form, alerts, pagination.
- Validate external data with Zod before storing it in frontend state.
- In React 19 typings, prefer `SubmitEventHandler` instead of deprecated `FormEvent` or `FormEventHandler`.

Backend:

- Organize Nest by feature modules under `apps/api/src/modules/`.
- Keep config centralized with `ConfigModule` and env validation.
- Keep controllers thin and Prisma access inside services.
- Use Zod as request validation source of truth.
- Prefer reusable decorators from `apps/api/src/common/zod.decorators.ts`.
- Keep auth isolated under `auth` and protect mutations with `JwtAuthGuard`.
- Keep Prisma schema, Zod schemas and API payloads aligned.
- Keep Prisma CLI config in `apps/api/prisma.config.ts`.
- Keep `courses.json` aligned with Prisma seed data.

Current course payload:
- `id`, `slug`, `title`, `category`, `description`, `hours`, `rating`, `price`, `best_sellers`, `tags`, `created_at`, `updated_at`
Current course payload: `id`, `slug`, `title`, `category`, `description`, `hours`, `rating`, `price`, `best_sellers`, `tags`, `created_at`, `updated_at`
Current search behavior: `GET /courses?query=` filters by `title`; `tag=` still filters by tags.

## Current API Surface
- `POST /auth/login`
- `GET /courses`
- `GET /courses/paginated`
- `GET /courses/latest`
- `GET /courses/tags`
- `GET /courses/count`
- `GET /courses/:id`
- `POST /courses` protected with JWT
- `PATCH /courses/:id` protected with JWT
- `DELETE /courses/:id` protected with JWT

## Frontend State
- landing keeps theme toggle, latest courses, tags, count, catalog search and filters.
- `/login` authenticates against backend JWT.
- `/admin` is protected and intentionally hidden from the public navbar.
- admin shows top alerts for create/update/delete feedback.
- delete confirmation uses `sweetalert2`.
- admin table supports search, pagination, create, edit and delete.
- modal closes only manually through `Cancelar` or `×`.

## Testing
Validate after meaningful changes:
- `npm run build`
- frontend routes `/`, `/login`, `/admin`
- `POST /auth/login` returns JWT for seeded admin
- `GET /courses/latest` returns latest 3 by `id desc`
- `GET /courses/paginated?page=1&limit=8` returns `items` plus `pagination`
- protected mutations require bearer auth
- admin search and pagination work against backend data
- admin create, edit and delete reflect in the table

If adding tests:
- keep backend unit tests near source
- keep integration/e2e tests under `apps/api/test/`

## Commits And PRs
Recent commits use short Spanish messages. Keep that style.

PRs should include:
- short summary of frontend and backend changes
- screenshots or recording for UI edits
- manual verification notes
- any schema, seed or API contract changes

## Skills
- `react-rules`: use for React components, routing, hooks, stores, forms, admin UI, API integration.
- `nestjs-best-practices`: use for Nest modules, controllers, services, Prisma, SQLite, Zod and REST endpoints.
