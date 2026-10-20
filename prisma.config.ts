import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const directUrl = process.env.DIRECT_URL;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.js',
  },
  ...(directUrl ? { datasource: { url: directUrl } } : {}),
});
