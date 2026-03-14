const { existsSync, rmSync } = require('node:fs');
const { resolve } = require('node:path');

module.exports = async () => {
  const dbPath = resolve(__dirname, '../prisma/test.db');

  if (existsSync(dbPath)) {
    rmSync(dbPath, { force: true });
  }
};
