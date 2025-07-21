import supabase from '../lib/supabase'
import sampleUsers from '../assets/sampleUsers'

/**
 * Creates sample users in Supabase Auth
 * This is for demo purposes only
 */
export async function createSampleUsers() {
  console.log('Creating sample users...')
  
  for (const [role, user] of Object.entries(sampleUsers)) {
    try {
      // Check if user exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers({
        filters: {
          email: user.email
        }
      })
      
      if (existingUsers?.users?.length > 0) {
        console.log(`User ${user.email} already exists`)
        continue
      }
      
      // Create user
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            full_name: user.name,
            role: role
          }
        }
      })
      
      if (error) {
        console.error(`Error creating user ${user.email}:`, error)
        continue
      }
      
      console.log(`Created user ${user.email}`)
      
      // Create profile
      const { error: profileError } = await supabase
        .from('user_profiles_xyz123')
        .insert([{
          id: data.user.id,
          full_name: user.name,
          role: role,
          created_at: new Date()
        }])
        
      if (profileError) {
        console.error(`Error creating profile for ${user.email}:`, profileError)
      }
    } catch (err) {
      console.error(`Unexpected error creating user ${user.email}:`, err)
    }
  }
  
  console.log('Sample users creation completed')
}