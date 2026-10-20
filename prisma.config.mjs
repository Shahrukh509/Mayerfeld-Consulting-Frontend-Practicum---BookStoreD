import dotenv from 'dotenv';
import { defineConfig } from 'prisma/config';

dotenv.config({ path: '.env.local' });
dotenv.config();

const directUrl =
  process.env.DIRECT_URL || process.env.DATABASE_URL_UNPOOLED;

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.mjs',
  },
  ...(directUrl ? { datasource: { url: directUrl } } : {}),
});
