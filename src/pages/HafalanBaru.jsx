import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiSearch, FiBook, FiStar } = FiIcons;

const HafalanBaru = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  // Sample new memorization data
  const hafalanBaru = [
    {
      id: 1,
      student: 'Ahmad Rizki',
      class: '7A',
      surah: 'Al-Baqarah',
      ayatStart: 11,
      ayatEnd: 20,
      date: '2023-05-15',
      quality: 'excellent',
      notes: 'Hafalan sangat lancar dengan tajwid yang baik'
    },
    {
      id: 2,
      student: 'Siti Nurhayati',
      class: '7A',
      surah: 'Ali Imran',
      ayatStart: 6,
      ayatEnd: 10,
      date: '2023-05-14',
      quality: 'good',
      notes: 'Hafalan baik, perlu sedikit perbaikan tajwid'
    },
    {
      id: 3,
      student: 'Muhammad Iqbal',
      class: '7B',
      surah: 'An-Nisa',
      ayatStart: 16,
      ayatEnd: 25,
      date: '2023-05-15',
      quality: 'excellent',
      notes: 'Luar biasa, hafalan sempurna'
    },
    {
      id: 4,
      student: 'Dewi Lestari',
      class: '7B',
      surah: 'Al-Maidah',
      ayatStart: 9,
      ayatEnd: 15,
      date: '2023-05-13',
      quality: 'fair',
      notes: 'Perlu latihan lebih untuk kelancaran'
    }
  ];

  const classes = ['all', '7A', '7B', '7C', '8A', '8B', '8C'];

  const filteredHafalan = hafalanBaru.filter(hafalan => {
    const matchesSearch = hafalan.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         hafalan.surah.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || hafalan.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getQualityBadge = (quality) => {
    switch (quality) {
      case 'excellent':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
          <SafeIcon icon={FiStar} className="w-3 h-3 mr-1" />
          Sangat Baik
        </span>;
      case 'good':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          Baik
        </span>;
      case 'fair':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          Cukup
        </span>;
      case 'needs_improvement':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          Perlu Perbaikan
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
          <h1 className="text-lg font-bold text-dark mb-1">Hafalan Baru</h1>
          <p className="text-xs text-gray-600">Catat hafalan baru siswa dan evaluasi kualitas</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Hafalan</span>
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
              placeholder="Cari siswa atau surat..."
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

      {/* Hafalan List */}
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
                  Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Surat
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ayat
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kualitas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catatan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHafalan.map((hafalan, index) => (
                <motion.tr 
                  key={hafalan.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{hafalan.student}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {hafalan.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark flex items-center">
                    <SafeIcon icon={FiBook} className="w-3 h-3 mr-1 text-primary" />
                    {hafalan.surah}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {hafalan.ayatStart} - {hafalan.ayatEnd}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {hafalan.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getQualityBadge(hafalan.quality)}
                  </td>
                  <td className="px-4 py-3 text-xs text-dark">
                    {hafalan.notes}
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

export default HafalanBaru;