import { createClient } from '@supabase/supabase-js'

// Project credentials - properly configured
const SUPABASE_URL = 'https://zcihvdympkhebjlzlsct.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWh2ZHltcGtoZWJqbHpsc2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODM2OTcsImV4cCI6MjA2ODY1OTY5N30.rPXMw-GW1lH4q-GEr-VwJ85lKpAunV4I4vA5e-8ItDM'

console.log('Creating Supabase client with URL:', SUPABASE_URL)

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
})

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Supabase connection error:', error)
  } else {
    console.log('Supabase connection successful, session:', data.session ? 'active' : 'none')
  }
})

// Add debug logging for auth state
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event, session ? `User ID: ${session.user.id}` : 'No session')
})

export default supabase