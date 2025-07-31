import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './seed/db',
  schema: './seed/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'data.db',
  },
});
