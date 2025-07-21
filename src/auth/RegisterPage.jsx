import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import { useAuth } from './AuthContext'
import SafeIcon from '../common/SafeIcon'

const { FiUser, FiMail, FiPhone, FiLock, FiUserPlus, FiAlertCircle, FiCheckCircle } = FiIcons

const RegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const { registerAdminSekolah } = useAuth()
  const navigate = useNavigate()

  const validatePassword = (password) => {
    // Password harus minimal 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    return regex.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validasi password
      if (!validatePassword(password)) {
        throw new Error('Password harus minimal 8 karakter, mengandung 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus.')
      }

      // Validasi nomor whatsapp
      if (!/^\d{10,15}$/.test(whatsapp.replace(/\D/g, ''))) {
        throw new Error('Nomor WhatsApp tidak valid.')
      }

      const { error } = await registerAdminSekolah(fullName, email, whatsapp, password)
      if (error) {
        throw error
      }

      // Registrasi berhasil
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (error) {
      console.error('Registration error:', error)
      setError(error.message || 'Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
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
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Daftar Admin Sekolah</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg flex items-start">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-start">
                <SafeIcon icon={FiCheckCircle} className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi. Anda akan dialihkan ke halaman login dalam beberapa detik.</span>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="fullName">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiMail} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="whatsapp">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <SafeIcon icon={FiPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Contoh: 081234567890"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Masukkan nomor tanpa tanda + atau 0</p>
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
                  <p className="mt-1 text-xs text-gray-500">
                    Min. 8 karakter dengan huruf besar, huruf kecil, angka, dan simbol
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center space-x-2 bg-primary text-white py-2.5 rounded-lg font-medium transition-colors ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-600'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Proses...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiUserPlus} className="w-5 h-5" />
                      <span>Daftar</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Sudah punya akun? <Link to="/login" className="text-primary font-medium hover:text-red-600">Login disini</Link></p>
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

export default RegisterPage