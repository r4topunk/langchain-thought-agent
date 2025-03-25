import { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema.ts',
  driver: 'better-sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || './reflection-machine.db',
  },
  verbose: true,
  strict: true,
} satisfies Config;