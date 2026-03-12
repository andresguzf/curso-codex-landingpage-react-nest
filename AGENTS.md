# Repository Guidelines

## Project Structure & Module Organization
This repository is now a React + Vite + TypeScript frontend for course marketing. Prioritize `src/` as the source of truth for product code. Do not inspect or modify `node_modules/` unless the user explicitly asks for dependency-level debugging.

Current structure:

- `src/main.tsx`: React entrypoint and global stylesheet import.
- `src/App.tsx`: top-level page composition.
- `src/app/store/useCoursesStore.ts`: Zustand store for course-related app state.
- `src/hooks/useCourses.ts`: reusable hook for derived course state, filters, and latest items.
- `src/components/layout/`: shared layout pieces such as `Header`, `Navbar`, and `Footer`.
- `src/components/sections/`: page sections such as instructor, carousel, and catalog.
- `src/components/courses/`: course-specific UI like `CourseCard`, `CourseList`, and `CourseVisual`.
- `src/content/site-content.tsx`: static UI copy and shared icon/content fragments.
- `src/lib/course-utils.ts`: pure reusable helpers for filtering, formatting, and catalog text.
- `src/data/courses.ts`: typed local course dataset loader.
- `src/schemas/course-schema.ts`: Zod validation for local course data.
- `src/types/course.ts`: shared course types.
- `courses.json`: local raw course dataset.
- `styles.css`: global layout, theme, responsive styles, and component class styling.
- `index.html`: Vite HTML shell.
- `vite.config.ts`, `tsconfig*.json`, `package.json`: frontend tooling configuration.

Ignore generated output unless the task is specifically about build artifacts:

- `dist/`
- `node_modules/`
- `*.tsbuildinfo`

## Build, Test, and Development Commands
Use Vite for local development:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to review changes in the browser.

Useful checks:

```bash
npm run build
rg -n "TODO|FIXME|propuesta|metodolog" src styles.css courses.json
```

Prefer `rg` and scope searches to `src/`, `styles.css`, `courses.json`, and config files before widening the search.

## Coding Style & Naming Conventions
Use 2-space indentation in TypeScript, TSX, CSS, and HTML. Prefer semantic JSX and keep section IDs stable because navigation and CTA links depend on them.

Follow current naming patterns:

- React components: PascalCase, e.g. `CatalogSection`, `CourseCard`
- Hooks: camelCase with `use` prefix, e.g. `useCourses`
- Zustand stores: `useXStore`, e.g. `useCoursesStore`
- Utility functions: camelCase, e.g. `filterCourses`, `getResultsCopy`
- CSS classes: kebab-case, e.g. `hero-panel`, `filter-chip`
- Data keys: lower-case JSON fields, e.g. `title`, `category`, `latest`

Keep copy in Spanish unless the surrounding section is already branded in English.

## Architecture Notes
Prefer this flow when modifying behavior:

- Put persistent or shared frontend state in Zustand stores under `src/app/store/`.
- Put derived reusable view logic in hooks under `src/hooks/`.
- Keep `src/lib/` for pure functions without React dependencies.
- Keep `src/components/` focused on presentation and event wiring.
- Validate external or file-based data through Zod schemas before using it in UI state.

Avoid reintroducing large monolithic components. If a section grows, split it by domain responsibility rather than by file size alone.

## Testing Guidelines
There is no automated test suite yet. Validate manually after each change:

- navigation anchors scroll to existing sections
- theme toggle still updates the page correctly
- search and filter chips still update the catalog
- latest courses carousel still navigates correctly
- course cards render without console errors
- layout remains usable on desktop and mobile widths
- `npm run build` completes successfully

If you add automated tests later, place them in a `tests/` directory or next to the feature with a clear feature-based name.

## Commit & Pull Request Guidelines
Recent commits use short, descriptive Spanish messages, for example: `primer estado inicial del landing page de cursos`. Keep that style and describe the visible or structural change clearly.

Pull requests should include:

- a short summary of user-facing changes
- screenshots or a screen recording for UI edits
- manual verification notes
- any content or data updates called out explicitly

## Skills

### Available skills
- `react-rules`: genera o modifica aplicaciones React con TypeScript, Zustand, Zod y React Hook Form. Usar cuando se necesite crear una app o componente React, agregar o modificar hooks, estado global, formularios o logica de UI React. Skill path: `.agents/skills/react-rules/SKILL.md`

### Skill trigger rules
- Activar `react-rules` cuando el usuario pida crear una aplicacion o componente React.
- Activar `react-rules` cuando el usuario pida agregar o modificar componentes, hooks, estado, formularios o logica de UI en React.
- Activar `react-rules` cuando el usuario pida cambios en Zustand, hooks personalizados o arquitectura de componentes React.
