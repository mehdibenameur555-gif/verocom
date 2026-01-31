import { defineConfig } from '@prisma/internals';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    db: {
      provider: 'postgresql',
        url: 'postgresql://neondb_owner:npg_TS7xE5hYjPco@ep-noisy-shadow-agn45yan-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    },
  },
});
