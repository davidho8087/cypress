import db from '@/lib/DB'
import { Subscription, Workspace } from '@/lib/supabase/types'
import { workspaces } from '../../../migrations/schema'

async function getUserSubscriptionStatus(userId: string) {
  try {
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    })
    if (data) return { data: data as Subscription, error: null }
    else return { data: null, error: null }
  } catch (error) {
    console.log(error)
    return { data: null, error: `Error` }
  }
}

async function createWorkspace(workspace: Workspace) {
  try {
    const response = await db.insert(workspaces).values(workspace)
    return { data: null, error: null }
  } catch (error) {
    console.log(error)
    return { data: null, error: 'Error' }
  }
}

export { createWorkspace, getUserSubscriptionStatus }
