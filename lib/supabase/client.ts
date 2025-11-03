import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  // Return a dummy client if credentials are not configured
  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_project_url') {
    console.warn('⚠️ Supabase not configured. Please add credentials to .env.local')
    return null as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
