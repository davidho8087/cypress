import type { Config } from 'drizzle-kit'
import 'dotenv/config'

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)

export default {
  schema: './src/models/schema.ts', // schema location
  out: './migrations', // migration files stored.
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
  verbose: true,
  strict: true,
} satisfies Config
