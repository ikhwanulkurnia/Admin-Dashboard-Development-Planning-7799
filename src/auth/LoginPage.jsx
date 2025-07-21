import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import { useAuth } from './AuthContext'
import SafeIcon from '../common/SafeIcon'
import sampleUsers from '../assets/sampleUsers'

const { FiUser, FiLock, FiLogIn, FiAlertCircle, FiKey, FiChevronUp, FiChevronDown } = FiIcons

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [showSampleAccounts, setShowSampleAccounts] = useState(false)
  
  const { login, authError, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard'
  
  // If there's an error from the AuthContext, show it
  useEffect(() => {
    if (authError) {
      setError(authError)
      setIsLoading(false)
    }
  }, [authError])
  
  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      console.log('User already logged in, redirecting to:', from)
      navigate(from, { replace: true })
    }
  }, [user, navigate, from, isLoading])
  
  // If login was successful, redirect after a short delay
  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate(from, { replace: true })
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [loginSuccess, navigate, from])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('Attempting login with:', email)
      const { data, error } = await login(email, password)
      
      if (error) {
        console.error('Login error in component:', error)
        setError(error.message || 'Login failed. Please try again.')
        setIsLoading(false)
        return
      }
      
      // Login berhasil
      console.log('Login successful, user data:', data)
      setLoginSuccess(true)
      
      // We'll let the useEffect handle the navigation
    } catch (error) {
      console.error('Login error caught:', error)
      setError(error.message || 'Login failed. Please try again.')
      setIsLoading(false)
    }
  }
  
  const fillDemoAccount = (role) => {
    const account = sampleUsers[role]
    setEmail(account.email)
    setPassword(account.password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Tahfidz App</h1>
            <p className="text-white text-opacity-80 text-sm mt-1">Sistem Manajemen Tahfidz</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-start">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {loginSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-start">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Login successful! Redirecting...</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Masukkan email"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || loginSuccess}
                className={`w-full flex items-center justify-center space-x-2 bg-primary text-white py-2.5 rounded-lg font-medium transition-colors ${
                  (isLoading || loginSuccess) ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Proses...</span>
                  </>
                ) : loginSuccess ? (
                  <>
                    <SafeIcon icon={FiLogIn} className="w-5 h-5" />
                    <span>Berhasil</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiLogIn} className="w-5 h-5" />
                    <span>Login</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>
                Admin sekolah baru?{' '}
                <Link to="/register" className="text-primary font-medium hover:text-red-600">
                  Daftar disini
                </Link>
              </p>
            </div>
            
            {/* Demo Accounts */}
            <div className="mt-6">
              <button
                onClick={() => setShowSampleAccounts(!showSampleAccounts)}
                className="flex items-center justify-center space-x-2 w-full text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                <SafeIcon icon={FiKey} className="w-4 h-4" />
                <span>{showSampleAccounts ? 'Sembunyikan akun demo' : 'Gunakan akun demo'}</span>
                <SafeIcon icon={showSampleAccounts ? FiChevronUp : FiChevronDown} className="w-4 h-4" />
              </button>
              
              {showSampleAccounts && (
                <motion.div
                  className="mt-3 border rounded-lg overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-50 px-3 py-2 border-b">
                    <p className="text-xs font-medium text-gray-700">Pilih akun untuk login demo:</p>
                  </div>
                  <div className="divide-y">
                    {Object.entries(sampleUsers).map(([role, account]) => (
                      <button
                        key={role}
                        onClick={() => fillDemoAccount(role)}
                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              role === 'superadmin'
                                ? 'bg-red-500'
                                : role === 'admin_sekolah'
                                ? 'bg-blue-500'
                                : role === 'guru'
                                ? 'bg-green-500'
                                : 'bg-yellow-500'
                            }`}
                          ></span>
                          <span className="text-xs font-medium text-gray-700">{account.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {role === 'superadmin'
                            ? 'Super Admin'
                            : role === 'admin_sekolah'
                            ? 'Admin Sekolah'
                            : role === 'guru'
                            ? 'Guru'
                            : 'Orang Tua'}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          &copy;{new Date().getFullYear()} Tahfidz App. Hak Cipta Dilindungi.
        </p>
      </motion.div>
    </div>
  )
}

export default LoginPage