# Repository Guidelines

## Project Structure & Module Organization
This repository is now a monorepo with a React frontend and a NestJS backend. Prioritize application code under `apps/` and avoid inspecting `node_modules/` unless the task is explicitly about dependency internals.

Current structure:

- `apps/web/`: React + Vite + TypeScript frontend.
- `apps/web/src/main.tsx`: React entrypoint.
- `apps/web/src/App.tsx`: top-level page composition.
- `apps/web/src/app/store/`: Zustand stores for frontend state.
- `apps/web/src/hooks/`: reusable hooks such as API-backed course state.
- `apps/web/src/components/layout/`: layout pieces like `Header`, `Navbar`, and `Footer`.
- `apps/web/src/components/sections/`: page sections such as instructor, latest courses, and catalog.
- `apps/web/src/components/courses/`: course-specific UI like `CourseCard`, `CourseList`, and visuals.
- `apps/web/src/lib/`: pure helpers and API client utilities.
- `apps/web/src/schemas/`: Zod schemas used by the frontend.
- `apps/web/src/types/`: shared frontend domain types.
- `apps/web/styles.css`: global UI styles.
- `apps/api/`: NestJS API with Prisma and SQLite.
- `apps/api/src/main.ts`: Nest bootstrap and CORS setup.
- `apps/api/src/app.module.ts`: root Nest module.
- `apps/api/src/config/`: backend environment typing and validation.
- `apps/api/src/prisma/`: Prisma module and service.
- `apps/api/src/common/`: shared backend infrastructure such as validation pipes and Zod decorators.
- `apps/api/src/modules/auth/`: JWT auth module, controller, service, and strategy.
- `apps/api/src/modules/courses/`: feature module with controller, service, and Zod schemas.
- `apps/api/src/modules/users/`: backend user access service used by auth.
- `apps/api/prisma/schema.prisma`: Prisma schema for SQLite.
- `apps/api/prisma.config.ts`: Prisma CLI configuration and seed wiring.
- `apps/api/prisma/seed.mjs`: seed script that loads initial courses from the shared root JSON.
- `apps/api/test/`: backend e2e and Prisma integration tests.
- `apps/api/jest.config.ts`: Jest configuration for backend tests.
- `courses.json`: shared seed dataset for local development; the frontend does not read it directly.
- `package.json`: root workspace configuration and monorepo scripts.

Ignore generated output unless the task is specifically about build artifacts:

- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- `apps/api/prisma/*.db`
- `apps/api/prisma/*.db-journal`

## Build, Test, and Development Commands
Install all workspace dependencies from the repo root:

```bash
npm install
```

Main workflows:

```bash
npm run dev
npm run dev:web
npm run dev:api
npm run build
```

Prisma workflows:

```bash
npm run prisma:generate
npm run prisma:db:push
npm run prisma:seed
```

Backend test workflow:

```bash
npm run test -w @cursos/api
```

Default local URLs:

- frontend: `http://localhost:5173`
- backend: `http://localhost:3000`

Useful checks:

```bash
rg -n "TODO|FIXME|propuesta|metodolog" apps courses.json
curl -s http://localhost:3000/courses
```

Prefer `rg` scoped to `apps/web/src`, `apps/api/src`, `apps/api/prisma`, and config files before widening the search.

## Coding Style & Naming Conventions
Use 2-space indentation in TypeScript, TSX, CSS, HTML, and Prisma schema files.

Follow current naming patterns:

- React components: PascalCase, e.g. `CatalogSection`, `CourseCard`
- Hooks: camelCase with `use` prefix, e.g. `useCourses`
- Zustand stores: `useXStore`, e.g. `useCoursesStore`
- Nest modules/services/controllers: PascalCase by feature, e.g. `CoursesModule`, `CoursesService`
- Utility functions: camelCase, e.g. `filterCourses`, `getResultsCopy`
- CSS classes: kebab-case, e.g. `hero-panel`, `filter-chip`
- Data keys: lower-case JSON fields, e.g. `slug`, `title`, `category`, `best_sellers`
- Backend env vars: upper-case, e.g. `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`

Keep copy in Spanish unless the surrounding section is already branded in English.

## Architecture Notes
Frontend:

- Put shared or persistent UI state in Zustand stores under `apps/web/src/app/store/`.
- Put reusable derived logic and remote synchronization in hooks under `apps/web/src/hooks/`.
- Keep `apps/web/src/lib/` for pure helpers and API wrappers.
- Keep `apps/web/src/components/` focused on presentation and interaction wiring.
- Validate API responses with Zod before storing them in frontend state.
- Treat the backend API as the source of truth for catalog, latest courses, tags, and counts.

Backend:

- Organize Nest by feature modules under `apps/api/src/modules/`.
- Keep shared env handling in `ConfigModule` with validation under `apps/api/src/config/`.
- Keep controllers thin: validate transport input and delegate to services.
- Keep Prisma access in services through `PrismaService`.
- Use Zod as the validation source of truth for request input.
- Prefer reusable Zod decorators from `apps/api/src/common/zod.decorators.ts` over manually instantiating validation pipes in each route.
- Keep auth concerns isolated under `apps/api/src/modules/auth/` and use `JwtAuthGuard` on protected mutations.
- Keep Prisma schema and controller/service payloads aligned.
- Keep Prisma CLI config in `apps/api/prisma.config.ts` instead of `package.json#prisma`.
- Keep `courses.json` and the Prisma seed aligned when changing the local development catalog.
- Current course payload shape uses `slug`, `title`, `category`, `description`, `hours`, `rating`, `price`, `best_sellers`, `tags`.
- Current search behavior for `GET /courses?query=` filters by `title` only; tag filtering still uses `tag=`.

Avoid reintroducing monolithic components or dumping backend logic into controllers.

Current API surface:

- `POST /auth/login`
- `GET /courses`
- `GET /courses/latest`
- `GET /courses/tags`
- `GET /courses/count`
- `GET /courses/:id`
- `POST /courses` protected with JWT
- `PATCH /courses/:id` protected with JWT
- `DELETE /courses/:id` protected with JWT

## Testing Guidelines
The backend now has an automated Jest suite. Use it before or after relevant backend changes:

- `npm run test -w @cursos/api`

Current backend coverage includes:

- controller unit tests
- service unit tests
- e2e HTTP tests with JWT auth
- Prisma + SQLite integration tests on isolated `test.db`

Still validate manually after meaningful app changes:

- `npm run build` completes for the whole monorepo
- frontend still renders and navigates correctly
- backend starts with `npm run dev:api`
- `POST /auth/login` returns a JWT for the seeded admin user
- `GET /courses` returns seeded data
- `GET /courses/latest` returns the latest 3 courses by `id` descending
- protected mutations require bearer auth
- catalog search and filters still work against API-loaded data
- latest courses still render without console errors
- layout remains usable on desktop and mobile widths

If you add more tests, keep backend unit tests close to source files and integration/e2e tests under `apps/api/test/`.

## Commit & Pull Request Guidelines
Recent commits use short, descriptive Spanish messages. Keep that style and describe the visible or structural change clearly.

Pull requests should include:

- a short summary of frontend and backend changes
- screenshots or a screen recording for UI edits
- manual verification notes
- any schema, seed, or data updates called out explicitly

## Skills

### Available skills
- `react-rules`: genera o modifica aplicaciones React con TypeScript, Zustand, Zod y React Hook Form. Usar cuando se necesite crear una app o componente React, agregar o modificar hooks, estado global, formularios o logica de UI React. Skill path: `.agents/skills/react-rules/SKILL.md`
- `nestjs-best-practices`: crea o modifica APIs NestJS con estructura por modulos, controllers, services y providers, usando TypeScript, Prisma ORM, SQLite, inyeccion de dependencias y validacion con Zod. Usar cuando se necesite crear una API basica NestJS o agregar/modificar modules, controllers, services, dto, providers, PrismaService, schema Prisma o endpoints REST. Skill path: `.agents/skills/nestjs-best-practices/SKILL.md`

### Skill trigger rules
- Activar `react-rules` cuando el usuario pida crear o modificar componentes, hooks, stores, integracion de API o arquitectura React.
- Activar `nestjs-best-practices` cuando el usuario pida crear o modificar una API NestJS, Prisma, SQLite, validacion con Zod o endpoints REST.
