import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, userProfile, loading, authError, hasRole } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute check:', {
    path: location.pathname,
    loading,
    user: !!user,
    userProfile: !!userProfile,
    requiredRole,
    authError,
    userProfileDetails: userProfile ? { id: userProfile.id, role: userProfile.role } : 'No profile'
  })

  if (loading) {
    // Tampilkan loading state saat mengecek autentikasi
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p className="text-sm text-gray-600">Memuat data pengguna...</p>
      </div>
    )
  }

  // Jika terjadi error autentikasi
  if (authError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-secondary">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          <p className="font-bold">Error Autentikasi</p>
          <p className="text-sm">{authError}</p>
          <button
            onClick={() => window.location.href = '/#/login'}
            className="mt-3 bg-primary text-white px-4 py-2 rounded text-sm"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    )
  }

  // Jika user tidak login, redirect ke login page
  if (!user) {
    console.log('User not logged in, redirecting to login')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Jika membutuhkan role tertentu, cek apakah user memiliki role tersebut
  if (requiredRole && userProfile && !userProfile.role) {
    console.log('User profile missing role information:', userProfile)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-secondary">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md">
          <p className="font-bold">Profil Tidak Lengkap</p>
          <p className="text-sm">Informasi profil pengguna tidak lengkap. Silakan logout dan login kembali.</p>
          <button
            onClick={() => window.location.href = '/#/login'}
            className="mt-3 bg-primary text-white px-4 py-2 rounded text-sm"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    )
  }

  // Check role if required
  if (requiredRole && !hasRole(requiredRole)) {
    console.log(`User doesn't have required role: ${requiredRole}, current role: ${userProfile?.role}`)
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute