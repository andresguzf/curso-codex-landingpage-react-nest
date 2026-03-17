import { existsSync } from 'node:fs';
import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

config({ path: existsSync('apps/api/.env') ? 'apps/api/.env' : '.env' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    seed: 'node prisma/seed.mjs',
  },
});
