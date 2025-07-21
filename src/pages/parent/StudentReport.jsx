import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import supabase from '../../lib/supabase'
import { useAuth } from '../../auth/AuthContext'

const { FiUser, FiCalendar, FiBookOpen, FiAward } = FiIcons

const StudentReport = () => {
  const { userProfile } = useAuth()
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sample data
  const sampleStudents = [
    {
      id: '1',
      nis: '2021001',
      full_name: 'Ahmad Farhan',
      gender: 'L',
      class: { name: '7A' }
    }
  ]

  const sampleReports = {
    attendance: {
      present: 45,
      absent: 2,
      late: 3,
      total: 50,
      percentage: 90
    },
    memorization: {
      total_ayat: 85,
      last_surah: 'Al-Baqarah',
      last_ayat: '1-85',
      progress: 75
    },
    tahsin: {
      level: 'Mutawassith',
      makharij: 'A',
      tajwid: 'A-',
      fluency: 'B+',
      overall: 'A-'
    },
    adab: {
      adab_ibadah: 'A',
      adab_sosial: 'A-',
      adab_belajar: 'B+',
      adab_diri: 'A',
      overall: 'A-'
    }
  }

  useEffect(() => {
    if (userProfile) {
      const fetchStudents = async () => {
        try {
          const { data, error } = await supabase
            .from('students_xyz123')
            .select(`
              *,
              class:class_id (name)
            `)
            .eq('parent_id', userProfile.id)
          
          if (error) throw error
          
          if (data && data.length > 0) {
            setStudents(data)
            setSelectedStudent(data[0])
          } else {
            // Jika tidak ada data, gunakan sample
            setStudents(sampleStudents)
            setSelectedStudent(sampleStudents[0])
          }
        } catch (error) {
          console.error('Error fetching students:', error)
          setError('Gagal memuat data siswa')
          
          // Gunakan sample data jika error
          setStudents(sampleStudents)
          setSelectedStudent(sampleStudents[0])
        } finally {
          setLoading(false)
        }
      }

      fetchStudents()
    }
  }, [userProfile])

  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const getGradeBadge = (grade) => {
    if (!grade) return null
    
    switch (grade[0]) {
      case 'A':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">{grade}</span>
      case 'B':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{grade}</span>
      case 'C':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">{grade}</span>
      case 'D':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">{grade}</span>
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{grade}</span>
    }
  }

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
          <h1 className="text-lg font-bold text-dark mb-1">Laporan Perkembangan Siswa</h1>
          <p className="text-xs text-gray-600">Informasi perkembangan anak Anda</p>
        </div>
      </motion.div>

      {/* Student Selector */}
      {students.length > 0 && (
        <motion.div
          className="bg-white p-3 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={selectedStudent?.id || ''}
              onChange={(e) => {
                const student = students.find(s => s.id === e.target.value)
                setSelectedStudent(student)
              }}
              className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.full_name} - {student.class?.name || 'Kelas tidak diketahui'}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {selectedStudent && (
        <>
          {/* Student Profile */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h2 className="text-md font-semibold text-dark">{selectedStudent.full_name}</h2>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-600 mr-3">NIS: {selectedStudent.nis}</span>
                    <span className="text-xs text-gray-600 mr-3">Kelas: {selectedStudent.class?.name || 'Tidak diketahui'}</span>
                    <span className="text-xs text-gray-600">Jenis Kelamin: {selectedStudent.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Attendance Report */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiCalendar} className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-sm font-semibold text-dark">Kehadiran</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Persentase Kehadiran</span>
                      <span className="text-xs font-medium text-dark">{sampleReports.attendance.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${sampleReports.attendance.percentage}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Hadir</p>
                      <p className="text-sm font-semibold text-green-600">{sampleReports.attendance.present}</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Absen</p>
                      <p className="text-sm font-semibold text-red-600">{sampleReports.attendance.absent}</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Terlambat</p>
                      <p className="text-sm font-semibold text-yellow-600">{sampleReports.attendance.late}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Memorization Report */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiBookOpen} className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-sm font-semibold text-dark">Hafalan Al-Qur'an</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600">Progress Hafalan</span>
                      <span className="text-xs font-medium text-dark">{sampleReports.memorization.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${sampleReports.memorization.progress}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Total Ayat</p>
                      <p className="text-sm font-semibold text-blue-600">{sampleReports.memorization.total_ayat}</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Hafalan Terakhir</p>
                      <p className="text-sm font-semibold text-blue-600">
                        {sampleReports.memorization.last_surah} {sampleReports.memorization.last_ayat}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tahsin Report */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiAward} className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-sm font-semibold text-dark">Tahsin Al-Qur'an</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Level</p>
                      <p className="text-sm font-semibold text-dark">{sampleReports.tahsin.level}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-600">Nilai Keseluruhan</p>
                      <div className="mt-1">{getGradeBadge(sampleReports.tahsin.overall)}</div>
                    </div>
                  </div>
                  
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Makharijul Huruf</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.tahsin.makharij)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Tajwid</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.tahsin.tajwid)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Kelancaran</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.tahsin.fluency)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Adab Report */}
            <motion.div
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <SafeIcon icon={FiAward} className="w-5 h-5 text-primary mr-2" />
                  <h3 className="text-sm font-semibold text-dark">Adab & Akhlak</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-600">Nilai Keseluruhan</p>
                    <div className="mt-1">{getGradeBadge(sampleReports.adab.overall)}</div>
                  </div>
                  
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Adab Ibadah</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.adab.adab_ibadah)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Adab Sosial</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.adab.adab_sosial)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 text-gray-600">Adab Belajar</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.adab.adab_belajar)}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-gray-600">Adab Diri</td>
                        <td className="py-2 text-right">{getGradeBadge(sampleReports.adab.adab_diri)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  )
}

export default StudentReport