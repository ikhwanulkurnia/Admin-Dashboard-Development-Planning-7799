import React, { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  // Debug logging
  console.log('AuthProvider rendering, user:', user?.id, 'userProfile:', userProfile?.id)

  // Function to create or fetch user profile
  const handleUserSession = async (sessionUser) => {
    if (!sessionUser) return null
    
    try {
      console.log('Fetching profile for user:', sessionUser.id)
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles_xyz123')
        .select('*')
        .eq('id', sessionUser.id)
        .single()
      
      if (profileError) {
        if (profileError.code === 'PGRST116') { // No rows found
          console.log('No profile found, creating one...')
          // Create basic profile
          const { data: newProfile, error: insertError } = await supabase
            .from('user_profiles_xyz123')
            .insert([
              { 
                id: sessionUser.id,
                full_name: sessionUser.user_metadata?.full_name || sessionUser.email?.split('@')[0] || 'User',
                role: 'orang_tua', // default role
                created_at: new Date().toISOString()
              }
            ])
            .select()
          
          if (insertError) {
            console.error('Error creating profile:', insertError)
            return null
          }
          
          if (newProfile && newProfile.length > 0) {
            console.log('Created new profile:', newProfile[0])
            return newProfile[0]
          }
        } else {
          console.error('Error fetching profile:', profileError)
          return null
        }
      }
      
      if (profile) {
        console.log('Found existing profile:', profile)
        return profile
      }
      
      return null
    } catch (error) {
      console.error('Exception in handleUserSession:', error)
      return null
    }
  }

  useEffect(() => {
    // Cek session saat komponen dimount
    const checkSession = async () => {
      try {
        console.log('Checking auth session...')
        setLoading(true)
        
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setAuthError(error.message)
          setLoading(false)
          return
        }
        
        const session = data?.session
        
        if (session?.user) {
          console.log('Found existing session for user:', session.user.email)
          setUser(session.user)
          
          // Ambil atau buat profil user
          const userProfile = await handleUserSession(session.user)
          if (userProfile) {
            setUserProfile(userProfile)
          }
        } else {
          console.log('No existing session found')
        }
      } catch (error) {
        console.error('Error in checkSession:', error)
        setAuthError(error.message)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Setup listener untuk perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)

      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in:', session.user.email)
        setUser(session.user)
        
        // Ambil atau buat profil user
        const userProfile = await handleUserSession(session.user)
        if (userProfile) {
          setUserProfile(userProfile)
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('User signed out')
        setUser(null)
        setUserProfile(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    try {
      setAuthError(null)
      console.log('Attempting login with:', email)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Login error:', error)
        setAuthError(error.message)
        throw error
      }

      console.log('Login successful for:', email, 'User data:', data)
      
      // We'll let the auth state change listener handle setting the user
      return { data, error: null }
    } catch (error) {
      console.error('Login failed:', error)
      return { data: null, error }
    }
  }

  const registerAdminSekolah = async (fullName, email, whatsapp, password) => {
    try {
      setAuthError(null)
      // Daftar user di auth
      console.log('Registering user:', email)
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (authError) {
        setAuthError(authError.message)
        throw authError
      }

      console.log('User registered successfully:', authData)

      // Buat profil admin sekolah
      if (authData?.user) {
        console.log('Creating admin profile for:', authData.user.id)
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles_xyz123')
          .insert([
            {
              id: authData.user.id,
              full_name: fullName,
              whatsapp,
              role: 'admin_sekolah',
              created_at: new Date().toISOString()
            }
          ])
          .select()

        if (profileError) {
          console.error('Error creating admin profile:', profileError)
          setAuthError(profileError.message)
          throw profileError
        }
        
        console.log('Admin profile created successfully:', profileData)
      }

      return { data: authData, error: null }
    } catch (error) {
      console.error('Registration error:', error)
      return { data: null, error }
    }
  }

  const logout = async () => {
    try {
      setAuthError(null)
      console.log('Attempting logout...')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
        setAuthError(error.message)
        throw error
      }
      
      console.log('Logout successful')
      // Clear local state immediately
      setUser(null)
      setUserProfile(null)
      return { error: null }
    } catch (error) {
      console.error('Logout failed:', error)
      // Clear local state even if logout fails
      setUser(null)
      setUserProfile(null)
      return { error }
    }
  }

  const hasRole = (requiredRole) => {
    if (!userProfile || !userProfile.role) {
      console.log('hasRole check failed: userProfile or role missing', userProfile)
      return false
    }
    
    console.log(`Checking if user has role '${requiredRole}', current role: ${userProfile.role}`)
    
    if (requiredRole === 'superadmin')
      return userProfile.role === 'superadmin'
      
    if (requiredRole === 'admin_sekolah')
      return ['superadmin', 'admin_sekolah'].includes(userProfile.role)
      
    if (requiredRole === 'guru')
      return ['superadmin', 'admin_sekolah', 'guru'].includes(userProfile.role)
      
    if (requiredRole === 'orang_tua')
      return userProfile.role === 'orang_tua' || ['superadmin', 'admin_sekolah', 'guru'].includes(userProfile.role)
      
    return false
  }

  const value = {
    user,
    userProfile,
    loading,
    authError,
    login,
    logout,
    registerAdminSekolah,
    hasRole
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}