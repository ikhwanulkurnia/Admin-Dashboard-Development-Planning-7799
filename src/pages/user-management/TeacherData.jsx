import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter } = FiIcons;

const TeacherData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  // Sample teacher data
  const teachers = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      nip: 'T2021001',
      subject: 'Matematika',
      phone: '081234567890',
      email: 'ahmad@example.com',
      address: 'Jl. Kenanga No. 5, Jakarta'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      nip: 'T2021002',
      subject: 'Bahasa Indonesia',
      phone: '081298765432',
      email: 'siti@example.com',
      address: 'Jl. Melati No. 12, Jakarta'
    },
    {
      id: 3,
      name: 'Budi Setiawan',
      nip: 'T2021003',
      subject: 'Tahfidz',
      phone: '081345678901',
      email: 'budi@example.com',
      address: 'Jl. Anggrek No. 8, Jakarta'
    },
    {
      id: 4,
      name: 'Dewi Astuti',
      nip: 'T2021004',
      subject: 'Tahsin',
      phone: '081456789012',
      email: 'dewi@example.com',
      address: 'Jl. Mawar No. 15, Jakarta'
    }
  ];

  const subjects = ['all', 'Matematika', 'Bahasa Indonesia', 'Tahfidz', 'Tahsin', 'IPA', 'IPS'];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         teacher.nip.includes(searchTerm) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;
    return matchesSearch && matchesSubject;
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
          <h1 className="text-lg font-bold text-dark mb-1">Data Guru</h1>
          <p className="text-xs text-gray-600">Kelola data guru dalam sistem</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Guru</span>
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
              placeholder="Cari guru berdasarkan nama, NIP, atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'Semua Mata Pelajaran' : subject}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Teacher List */}
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
                  NIP
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Guru
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Pelajaran
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telepon
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher, index) => (
                <motion.tr
                  key={teacher.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {teacher.nip}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{teacher.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {teacher.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {teacher.phone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {teacher.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {teacher.address}
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

export default TeacherData;