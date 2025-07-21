import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import supabase from '../../lib/supabase'

const { FiPlus, FiEdit, FiTrash2, FiSearch, FiEye } = FiIcons

const SchoolList = () => {
  const [schools, setSchools] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data, error } = await supabase
          .from('schools_xyz123')
          .select('*')
          .order('name')
        
        if (error) throw error
        setSchools(data || [])
      } catch (error) {
        console.error('Error fetching schools:', error)
        setError('Gagal memuat data sekolah')
      } finally {
        setLoading(false)
      }
    }

    fetchSchools()
  }, [])

  // Filter sekolah berdasarkan pencarian
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (school.address && school.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (school.email && school.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Sample data jika belum ada data
  const sampleSchools = [
    {
      id: '1',
      name: 'SD Islam Al-Azhar',
      address: 'Jl. Sisingamangaraja No. 2, Jakarta Selatan',
      phone: '021-7654321',
      email: 'info@sd-alazhar.sch.id',
      website: 'www.sd-alazhar.sch.id'
    },
    {
      id: '2',
      name: 'SD Islam Al-Furqan',
      address: 'Jl. Merdeka No. 15, Jakarta Timur',
      phone: '021-8765432',
      email: 'info@sd-alfurqan.sch.id',
      website: 'www.sd-alfurqan.sch.id'
    },
    {
      id: '3',
      name: 'SD Islam An-Nur',
      address: 'Jl. Pahlawan No. 8, Jakarta Utara',
      phone: '021-9876543',
      email: 'info@sd-annur.sch.id',
      website: 'www.sd-annur.sch.id'
    }
  ]

  // Gunakan sample data jika belum ada data sebenarnya
  const displayedSchools = filteredSchools.length > 0 ? filteredSchools : sampleSchools

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <motion.div 
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-lg font-bold text-dark mb-1">Data Sekolah</h1>
          <p className="text-xs text-gray-600">Kelola semua sekolah yang terdaftar dalam sistem</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Sekolah</span>
        </button>
      </motion.div>

      {/* Search Bar */}
      <motion.div 
        className="bg-white p-3 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Cari sekolah berdasarkan nama, alamat, atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div 
          className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* School List */}
      {!loading && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Sekolah</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedSchools.map((school, index) => (
                  <motion.tr 
                    key={school.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs font-medium text-dark">{school.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                      {school.address}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                      {school.phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                      {school.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                      <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {school.website}
                      </a>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                      <div className="flex space-x-1">
                        <button className="text-blue-600 hover:text-blue-800 p-1" title="Lihat Detail">
                          <SafeIcon icon={FiEye} className="w-3 h-3" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-800 p-1" title="Edit">
                          <SafeIcon icon={FiEdit} className="w-3 h-3" />
                        </button>
                        <button className="text-red-600 hover:text-red-800 p-1" title="Hapus">
                          <SafeIcon icon={FiTrash2} className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SchoolList