import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import { useAuth } from '../../auth/AuthContext'
import supabase from '../../lib/supabase'

const { FiSave, FiInfo } = FiIcons

const SchoolSetup = () => {
  const { userProfile } = useAuth()
  const [school, setSchool] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    logo_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Jika user sudah memiliki school_id, ambil data sekolah
    if (userProfile?.school_id) {
      const fetchSchool = async () => {
        try {
          const { data, error } = await supabase
            .from('schools_xyz123')
            .select('*')
            .eq('id', userProfile.school_id)
            .single()
          
          if (error) throw error
          if (data) setSchool(data)
        } catch (error) {
          console.error('Error fetching school:', error)
          setError('Gagal memuat data sekolah')
        }
      }

      fetchSchool()
    }
  }, [userProfile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSchool(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      let schoolId = userProfile?.school_id

      if (schoolId) {
        // Update existing school
        const { error } = await supabase
          .from('schools_xyz123')
          .update(school)
          .eq('id', schoolId)
        
        if (error) throw error
      } else {
        // Create new school
        const { data, error } = await supabase
          .from('schools_xyz123')
          .insert([school])
          .select()
        
        if (error) throw error
        
        schoolId = data[0].id

        // Update user profile with school_id
        const { error: updateError } = await supabase
          .from('user_profiles_xyz123')
          .update({ school_id: schoolId })
          .eq('id', userProfile.id)
        
        if (updateError) throw updateError
      }

      setSuccess(true)
    } catch (error) {
      console.error('Error saving school:', error)
      setError(error.message || 'Gagal menyimpan data sekolah')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Pengaturan Sekolah</h1>
        <p className="text-xs text-gray-600">Konfigurasi informasi sekolah Anda</p>
      </motion.div>

      {/* Settings Form */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg">
              Data sekolah berhasil disimpan!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  name="name"
                  value={school.name}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <input
                  type="text"
                  name="address"
                  value={school.address}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Telepon
                </label>
                <input
                  type="text"
                  name="phone"
                  value={school.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={school.email}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={school.website}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="Contoh: www.sekolah.sch.id"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  URL Logo
                </label>
                <input
                  type="text"
                  name="logo_url"
                  value={school.logo_url}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  placeholder="URL gambar logo sekolah"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiInfo} className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-gray-600">
                Pengaturan ini akan diterapkan ke seluruh sistem dan memengaruhi tampilan laporan dan dokumen resmi.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 text-xs ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSave} className="w-3 h-3" />
                    <span>Simpan Pengaturan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default SchoolSetup