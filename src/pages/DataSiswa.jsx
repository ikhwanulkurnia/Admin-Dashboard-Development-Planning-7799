import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch } = FiIcons;

const DataSiswa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'Ahmad Rizki',
      nis: '2021001',
      class: '7A',
      totalHafalan: 15,
      lastHafalan: 'Al-Baqarah 1-10',
      progress: 85
    },
    {
      id: 2,
      name: 'Siti Nurhayati',
      nis: '2021002',
      class: '7A',
      totalHafalan: 12,
      lastHafalan: 'Ali Imran 1-5',
      progress: 70
    },
    {
      id: 3,
      name: 'Muhammad Iqbal',
      nis: '2021003',
      class: '7B',
      totalHafalan: 18,
      lastHafalan: 'An-Nisa 1-15',
      progress: 92
    },
    {
      id: 4,
      name: 'Dewi Lestari',
      nis: '2021004',
      class: '7B',
      totalHafalan: 10,
      lastHafalan: 'Al-Maidah 1-8',
      progress: 65
    }
  ];

  const classes = ['all', '7A', '7B', '7C', '8A', '8B', '8C'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.nis.includes(searchTerm);
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
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
          <h1 className="text-lg font-bold text-dark mb-1">Data Siswa</h1>
          <p className="text-xs text-gray-600">Kelola data siswa dan progress tahfidz</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Siswa</span>
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
              placeholder="Cari siswa berdasarkan nama atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {classes.map(classOption => (
              <option key={classOption} value={classOption}>
                {classOption === 'all' ? 'Semua Kelas' : `Kelas ${classOption}`}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Student List */}
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
                  NIS
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hafalan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hafalan Terakhir
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <motion.tr 
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {student.nis}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{student.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {student.totalHafalan} Ayat
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {student.lastHafalan}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <SafeIcon icon={FiEye} className="w-3 h-3" />
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

export default DataSiswa;