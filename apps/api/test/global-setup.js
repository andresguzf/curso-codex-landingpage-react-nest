const { execSync } = require('node:child_process');
const { resolve } = require('node:path');

module.exports = async () => {
  const cwd = resolve(__dirname, '..');
  const testDatabaseUrl = process.env.TEST_DATABASE_URL;

  if (!testDatabaseUrl) {
    throw new Error('TEST_DATABASE_URL is required for backend tests after the Supabase migration.');
  }

  const env = {
    ...process.env,
    DATABASE_URL: testDatabaseUrl,
  };

  execSync('npm run prisma:db:push -- --force-reset --skip-generate', {
    cwd,
    env,
    stdio: 'inherit',
  });

  execSync('npm run prisma:seed', {
    cwd,
    env,
    stdio: 'inherit',
  });
};
