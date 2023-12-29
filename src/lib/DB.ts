import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../../migrations/schema'
import { Env } from './Env.mjs'

const connectionString: string | undefined = Env.DATABASE_URL

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client, { schema })

// Disable migrate function if using Edge runtime for local environment and use `drizzle-kit push` instead
// if (process.env.NODE_ENV !== 'production') {
//   console.log('are you running migration?')
//   await migrate(db, { migrationsFolder: './migrations' })
// }

export default db
