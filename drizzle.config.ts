import type { Config } from 'drizzle-kit'
import { Env } from '@/lib/Env.mjs'

const db_url = Env.DATABASE_URL

export default {
  schema: './src/models/schema.ts', // schema location
  out: './migrations', // migration files stored.
  driver: 'pg',
  dbCredentials: {
    connectionString: db_url || ''
  },
  verbose: true,
  strict: true
} satisfies Config





