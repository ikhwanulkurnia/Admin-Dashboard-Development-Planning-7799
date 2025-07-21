import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiUsers } = FiIcons;

const ClassManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample class data
  const classes = [
    {
      id: 1,
      name: '7A',
      homeroom: 'Ahmad Fauzi',
      students: 32,
      academicYear: '2023/2024',
      schedule: 'Senin - Jumat, 07:00 - 14:00'
    },
    {
      id: 2,
      name: '7B',
      homeroom: 'Siti Aminah',
      students: 30,
      academicYear: '2023/2024',
      schedule: 'Senin - Jumat, 07:00 - 14:00'
    },
    {
      id: 3,
      name: '8A',
      homeroom: 'Budi Setiawan',
      students: 28,
      academicYear: '2023/2024',
      schedule: 'Senin - Jumat, 07:00 - 14:30'
    },
    {
      id: 4,
      name: '8B',
      homeroom: 'Dewi Astuti',
      students: 29,
      academicYear: '2023/2024',
      schedule: 'Senin - Jumat, 07:00 - 14:30'
    }
  ];

  const filteredClasses = classes.filter(cls => {
    return cls.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           cls.homeroom.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
          <h1 className="text-lg font-bold text-dark mb-1">Manajemen Kelas</h1>
          <p className="text-xs text-gray-600">Kelola kelas dan asosiasi guru dan siswa</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Kelas</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-white p-3 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" 
            />
            <input
              type="text"
              placeholder="Cari kelas berdasarkan nama atau wali kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Class List */}
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
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wali Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tahun Ajaran
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jadwal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.map((cls, index) => (
                <motion.tr
                  key={cls.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">Kelas {cls.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {cls.homeroom}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {cls.students} siswa
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {cls.academicYear}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {cls.schedule}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <SafeIcon icon={FiEye} className="w-3 h-3" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1" title="Kelola Anggota Kelas">
                        <SafeIcon icon={FiUsers} className="w-3 h-3" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 p-1">
                        <SafeIcon icon={FiEdit} className="w-3 h-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
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
    </div>
  );
};

export default ClassManagement;