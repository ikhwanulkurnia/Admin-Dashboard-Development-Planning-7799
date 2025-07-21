import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiSearch, FiFilter, FiDownload } = FiIcons;

const Tahsin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  
  // Sample tahsin data
  const tahsinData = [
    {
      id: 1,
      student: 'Ahmad Rizki',
      class: '7A',
      level: 'Mubtadi',
      material: 'Makhorijul Huruf',
      date: '2023-05-15',
      status: 'excellent',
      notes: 'Sangat baik dalam pengucapan huruf'
    },
    {
      id: 2,
      student: 'Siti Nurhayati',
      class: '7A',
      level: 'Mutawassith',
      material: 'Mad Asli',
      date: '2023-05-14',
      status: 'good',
      notes: 'Perlu latihan lebih untuk konsistensi panjang mad'
    },
    {
      id: 3,
      student: 'Muhammad Iqbal',
      class: '7B',
      level: 'Mubtadi',
      material: 'Huruf Qalqalah',
      date: '2023-05-15',
      status: 'satisfactory',
      notes: 'Perlu latihan untuk huruf qaf dan tha'
    },
    {
      id: 4,
      student: 'Dewi Lestari',
      class: '7B',
      level: 'Mutawassith',
      material: 'Ghunnah',
      date: '2023-05-13',
      status: 'excellent',
      notes: 'Sempurna dalam penerapan ghunnah'
    }
  ];

  const classes = ['all', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];

  const filteredTahsin = tahsinData.filter(tahsin => {
    const matchesSearch = tahsin.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tahsin.material.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || tahsin.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'excellent':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Sangat Baik</span>;
      case 'good':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Baik</span>;
      case 'satisfactory':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Cukup</span>;
      case 'needs_improvement':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">Perlu Perbaikan</span>;
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
          <h1 className="text-lg font-bold text-dark mb-1">Tahsin Siswa</h1>
          <p className="text-xs text-gray-600">Pencatatan dan pemantauan perkembangan tahsin Al-Qur'an siswa</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
            <SafeIcon icon={FiPlus} className="w-3 h-3" />
            <span>Tambah Tahsin</span>
          </button>
          <button className="bg-gray-500 text-white px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-1.5 text-xs">
            <SafeIcon icon={FiDownload} className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
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
              placeholder="Cari siswa atau materi..."
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

      {/* Tahsin List */}
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
                  Level
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materi
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catatan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTahsin.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{item.student}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {item.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {item.level}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {item.material}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-4 py-3 text-xs text-dark">
                    {item.notes}
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

export default Tahsin;