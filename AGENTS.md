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
- `apps/api/src/prisma/`: Prisma module and service.
- `apps/api/src/common/`: shared backend infrastructure such as validation pipes.
- `apps/api/src/modules/courses/`: feature module with controller, service, and Zod schemas.
- `apps/api/prisma/schema.prisma`: Prisma schema for SQLite.
- `apps/api/prisma/seed.mjs`: seed script that loads initial courses from the shared root JSON.
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
- Keep controllers thin: validate transport input and delegate to services.
- Keep Prisma access in services through `PrismaService`.
- Use Zod as the validation source of truth for request input.
- Keep Prisma schema and controller/service payloads aligned.
- Keep `courses.json` and the Prisma seed aligned when changing the local development catalog.

Avoid reintroducing monolithic components or dumping backend logic into controllers.

## Testing Guidelines
There is no automated test suite yet. Validate manually after each change:

- `npm run build` completes for the whole monorepo
- frontend still renders and navigates correctly
- backend starts with `npm run dev:api`
- `GET /courses` returns seeded data
- `GET /courses/latest` returns the latest 3 courses by `id` descending
- catalog search and filters still work against API-loaded data
- latest courses still render without console errors
- layout remains usable on desktop and mobile widths

If you add automated tests later, keep them close to the app they belong to or add clear app-specific test directories.

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
