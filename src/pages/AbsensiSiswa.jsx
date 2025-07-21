import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiCalendar, FiDownload, FiCheck, FiX } = FiIcons;

const AbsensiSiswa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2023-05-15');

  // Sample attendance data
  const attendances = [
    {
      id: 1,
      student: 'Ahmad Rizki',
      class: '7A',
      date: '2023-05-15',
      status: 'present',
      timeIn: '07:15',
      note: ''
    },
    {
      id: 2,
      student: 'Siti Nurhayati',
      class: '7A',
      date: '2023-05-15',
      status: 'present',
      timeIn: '07:05',
      note: ''
    },
    {
      id: 3,
      student: 'Muhammad Iqbal',
      class: '7B',
      date: '2023-05-15',
      status: 'absent',
      timeIn: '-',
      note: 'Sakit'
    },
    {
      id: 4,
      student: 'Dewi Lestari',
      class: '7B',
      date: '2023-05-15',
      status: 'late',
      timeIn: '08:30',
      note: 'Terlambat'
    }
  ];

  const classes = ['all', '7A', '7B', '7C', '8A', '8B', '8C'];

  const filteredAttendances = attendances.filter(attendance => {
    const matchesSearch = attendance.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || attendance.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
          <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
          Hadir
        </span>;
      case 'absent':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
          <SafeIcon icon={FiX} className="w-3 h-3 mr-1" />
          Absen
        </span>;
      case 'late':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          Terlambat
        </span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">-</span>;
    }
  };

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
          <h1 className="text-lg font-bold text-dark mb-1">Absensi Siswa</h1>
          <p className="text-xs text-gray-600">Kelola kehadiran siswa dalam program tahfidz</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiDownload} className="w-3 h-3" />
          <span>Export Absensi</span>
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
              placeholder="Cari siswa..."
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
          <div className="relative">
            <SafeIcon 
              icon={FiCalendar} 
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" 
            />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Attendance List */}
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
                  Nama Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jam Masuk
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendances.map((attendance, index) => (
                <motion.tr 
                  key={attendance.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{attendance.student}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {attendance.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {attendance.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(attendance.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {attendance.timeIn}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {attendance.note || '-'}
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

export default AbsensiSiswa;