const { execSync } = require('node:child_process');
const { resolve } = require('node:path');

module.exports = async () => {
  const cwd = resolve(__dirname, '..');
  const env = {
    ...process.env,
    DATABASE_URL: process.env.DATABASE_URL || 'file:./test.db',
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
