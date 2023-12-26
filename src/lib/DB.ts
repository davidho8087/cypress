import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../../migrations/schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { Env } from './Env.mjs'

const connectionString: string | undefined = Env.DATABASE_URL

const client = postgres(connectionString, { max: 5 }) // Increase pool size
export const db = drizzle(client, { schema })

// Disable migrate function if using Edge runtime for local environment and use `drizzle-kit push` instead
if (process.env.NODE_ENV !== 'production') {
  await migrate(db, { migrationsFolder: './migrations' })
  await client.end();
}