'use server'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { Env } from '../Env.mjs'
import { FormSchema } from '../types'

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)

  if (data?.length) return { error: { message: 'User already exists', data } }
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${Env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  })
}
