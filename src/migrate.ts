import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as schema from '../migrations/schema'
import { Env } from './lib/Env.mjs'

const connectionString: string | undefined = Env.DATABASE_URL

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client, { schema })
console.log('db', db)

// Disable migrate function if using Edge runtime for local environment and use `drizzle-kit push` instead
if (process.env.NODE_ENV !== 'production') {
  const migrateDb = async () => {
    try {
      console.log('🟠 Migrating client')
      await migrate(db, { migrationsFolder: 'migrations' })
      console.log('🟢 Successfully Migrated')
    } catch (error) {
      console.log('🔴 Error Migrating client', error)
    }
  }
  migrateDb()
}

// Don't forget to close the connection, otherwise the script will hang
