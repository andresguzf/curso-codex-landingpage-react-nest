# Repository Guidelines

## Project Structure & Module Organization
This repository is a static landing page for course marketing. Keep changes scoped to the existing top-level files:

- `index.html`: page structure, embedded course JSON, and section anchors.
- `styles.css`: all layout, theme, and responsive styles.
- `app.js`: client-side rendering, filters, search, and UI state.
- `courses.json`: optional external course dataset; keep it aligned with embedded data if both are used.
- `skills-lock.json`: local tooling metadata; do not edit unless a skill install/update requires it.

There is no `src/`, `dist/`, or test directory yet.

## Build, Test, and Development Commands
No build step is required. Run the site with a simple local server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` to review changes. Useful checks:

```bash
open index.html
rg -n "TODO|FIXME|propuesta|metodolog" .
```

Use `rg` for fast project-wide searches before editing copy, anchors, or selectors.

## Coding Style & Naming Conventions
Use 2-space indentation in HTML, CSS, and JavaScript. Prefer semantic HTML and keep section IDs stable because navigation and buttons depend on them.

Follow current naming patterns:

- CSS classes: kebab-case, e.g. `hero-panel`, `filter-chip`
- JavaScript variables/functions: camelCase, e.g. `latestCoursesRoot`, `escapeHtml`
- Data keys: lower-case JSON fields, e.g. `title`, `category`, `latest`

Keep copy in Spanish unless the surrounding section is already branded in English.

## Testing Guidelines
There is no automated test suite yet. Validate manually after each change:

- navigation anchors scroll to existing sections
- search and filter chips still update the catalog
- latest courses render without console errors
- layout remains usable on desktop and mobile widths

If you add automated tests later, place them in a `tests/` directory and name files by feature, such as `catalog-filter.test.js`.

## Commit & Pull Request Guidelines
Recent commits use short, descriptive Spanish messages, for example: `primer estado inicial del landing page de cursos`. Keep that style and describe the visible change.

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
