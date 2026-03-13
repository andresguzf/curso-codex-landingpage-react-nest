---
name: nestjs-best-practices
description: Create or update NestJS APIs with a modular feature-based structure, controllers, services, providers, Prisma ORM, SQLite, and validation with Zod. Use when Codex needs to scaffold a NestJS project, add or modify a module, controller, service, dto, provider, PrismaService, Prisma schema, Zod validation, or REST endpoint, especially for requests to build a basic NestJS API with dependency injection and Prisma-backed data access.
---

# NestJS Best Practices

## Overview

Generate NestJS backends with clear module boundaries, constructor-based dependency injection, Prisma as the data layer, and Zod as the validation source of truth. Favor pragmatic scaffolding that can be extended safely instead of over-abstracted architectures.

Read [references/project-template.md](references/project-template.md) when you need the expected folder layout, package set, or a representative feature skeleton.

## Workflow

1. Verify whether the repository already contains a NestJS app.
2. If the app does not exist, scaffold it with Nest CLI using the standard structure and TypeScript.
3. Organize code by feature modules. Keep each feature responsible for its controller, service, dto types when useful, and Zod schemas.
4. Add Prisma with SQLite and create a reusable `PrismaService` provider.
5. Expose REST endpoints only from controllers. Keep controllers thin: validate input, transform when needed, and delegate to services.
6. Put business logic and Prisma calls in services. Prefer direct service-to-`PrismaService` access over a classic repository layer unless a real complexity boundary appears.
7. Run the relevant verification commands and report what was created or changed.

## Version And Tooling Rules

- Use TypeScript.
- Use Nest CLI standard scaffolding when creating a new project.
- Use `@nestjs/core` version `11.1.6` or newer. `11.1.6` is the latest version verified from npm on March 13, 2026; do not assume `11.1.16` exists.
- Prefer `npm` commands unless the repository clearly uses another package manager.
- When starting the app locally, prefer `npm run start:dev`.

## Architecture Rules

- Organize the app by modules or features, not by technical layer only.
- Keep feature directories cohesive: `modules`, `controllers`, `services`, `dto` when useful, `schemas`, and `prisma` integration points.
- Use constructor injection for services and providers.
- Use `@Inject()` only when injecting custom tokens or non-class providers.
- Create a reusable `PrismaService` as a Nest provider and export it from a dedicated Prisma module when multiple features need it.
- Keep explicit mapping between DTOs and Prisma/domain models when shapes differ.
- Do not introduce a repository pattern by default.

## HTTP And Validation Rules

- Use Nest REST decorators such as `@Controller`, `@Get`, `@Post`, `@Patch`, `@Delete`, `@Param`, `@Body`, and `@Query`.
- Validate request body, params, and query with Zod schemas.
- Treat Zod schemas as the main validation layer. Use DTOs only when they materially improve typing, API clarity, or response shaping.
- Reject invalid input before reaching business logic.
- Keep controllers focused on transport concerns and response codes.

## Prisma Rules

- Create a `prisma/` directory with `schema.prisma`.
- Use SQLite as the datasource unless the user requests another database.
- Configure a Prisma client generator.
- Model data access inside feature services through `PrismaService`.
- Keep Prisma schema, service methods, and validated request shapes aligned.

## Execution Heuristics

- If the user asks for a new API, create the base app, Prisma setup, and one representative feature module end to end.
- If the user asks to add or modify an endpoint, update the controller, service, Zod schemas, and Prisma usage together.
- If a change affects data shape, update `schema.prisma`, generated types if applicable, and any DTO or mapper code in the same pass.
- If a custom provider token is needed, define the token clearly and inject it explicitly with `@Inject()`.

## Output Expectations

- Leave a runnable, coherent NestJS structure instead of isolated snippets.
- Prefer small, explicit files over monolithic modules.
- Report any commands that still need user execution, such as dependency installation or Prisma migrations, if they were not run.
