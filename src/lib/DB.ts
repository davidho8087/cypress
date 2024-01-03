import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../../migrations/schema'
import { Env } from './Env.mjs'
// import { migrate } from 'drizzle-orm/postgres-js/migrator'

const connectionString: string | undefined = Env.DATABASE_URL

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client, { schema })

// Disable migrate function if using Edge runtime for local environment and use `drizzle-kit push` instead
// if (process.env.NODE_ENV !== 'production') {
//   console.log('are you running?')
//   const migrateDb = async () => {
//     try {
//       console.log('🟠 Migrating client')
//       await migrate(db, { migrationsFolder: 'migrations' })
//       console.log('🟢 Successfully Migrated')
//     } catch (error) {
//       console.log('🔴 Error Migrating client', error)
//     }
//   }
//   migrateDb()
// }

export default db
