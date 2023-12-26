/* eslint-disable import/prefer-default-export */
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DATABASE_PW: z.string().min(1),
    SERVICE_ROLE_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL:z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PW: process.env.DATABASE_PW,
    SERVICE_ROLE_KEY: process.env.SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,

  },
});