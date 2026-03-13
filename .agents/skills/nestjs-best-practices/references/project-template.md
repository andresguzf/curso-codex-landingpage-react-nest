# NestJS Project Template

Use this reference when creating a new NestJS API or aligning an existing project to the skill conventions.

## Base Commands

```bash
npm i -g @nestjs/cli
nest new my-api
npm install prisma @prisma/client zod
npx prisma init --datasource-provider sqlite
```

If Nest CLI is unavailable globally, install it locally or use `npx @nestjs/cli`.

## Expected Layout

```text
src/
  app.module.ts
  main.ts
  prisma/
    prisma.module.ts
    prisma.service.ts
  modules/
    users/
      users.module.ts
      users.controller.ts
      users.service.ts
      users.schemas.ts
      users.dto.ts
```

Adjust file names per feature. Omit `*.dto.ts` when types are trivial and Zod schemas already provide enough structure.

## Prisma Baseline

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Create a reusable `PrismaService` that extends `PrismaClient`, register it as a provider, and export it from `PrismaModule`.

## Feature Skeleton

Controller responsibilities:
- Expose REST endpoints only.
- Parse and validate request input with Zod.
- Delegate business logic to the service.

Service responsibilities:
- Encapsulate business rules.
- Access the database through `PrismaService`.
- Return explicit response shapes when needed.

Validation responsibilities:
- Define Zod schemas near the feature.
- Reuse schemas for `body`, `params`, and `query` parsing where practical.

## Implementation Checklist

- Create or update the feature module.
- Register controller and service in the module.
- Inject `PrismaService` by constructor when the service needs database access.
- Use `@Inject()` only for custom tokens.
- Keep mapping explicit if DTOs differ from Prisma models.
- Prefer `npm run start:dev` for local development.
