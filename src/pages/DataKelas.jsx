import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch } = FiIcons;

const DataKelas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');

  // Sample class data
  const classes = [
    {
      id: 1,
      namaSekolah: 'SD Islam Al-Azhar',
      namaKelas: '6A',
      totalSiswa: 25,
      rataRataNilai: 92.8,
      waliKelas: 'Ustadz Ahmad Fauzi',
      tingkat: 6,
      tahunAjaran: '2023/2024'
    },
    {
      id: 2,
      namaSekolah: 'SD Islam Al-Azhar',
      namaKelas: '6B',
      totalSiswa: 24,
      rataRataNilai: 89.2,
      waliKelas: 'Ustadz Budi Santoso',
      tingkat: 6,
      tahunAjaran: '2023/2024'
    },
    {
      id: 3,
      namaSekolah: 'SD Islam Al-Azhar',
      namaKelas: '5A',
      totalSiswa: 26,
      rataRataNilai: 87.9,
      waliKelas: 'Ustadzah Dewi Lestari',
      tingkat: 5,
      tahunAjaran: '2023/2024'
    },
    {
      id: 4,
      namaSekolah: 'SD Islam Al-Azhar',
      namaKelas: '5B',
      totalSiswa: 23,
      rataRataNilai: 90.5,
      waliKelas: 'Ustadzah Siti Aminah',
      tingkat: 5,
      tahunAjaran: '2023/2024'
    },
    {
      id: 5,
      namaSekolah: 'SD Islam Al-Furqan',
      namaKelas: '6A',
      totalSiswa: 28,
      rataRataNilai: 88.7,
      waliKelas: 'Ustadz Rahman Hakim',
      tingkat: 6,
      tahunAjaran: '2023/2024'
    },
    {
      id: 6,
      namaSekolah: 'SD Islam Al-Furqan',
      namaKelas: '5A',
      totalSiswa: 27,
      rataRataNilai: 86.3,
      waliKelas: 'Ustadzah Fatimah Zahra',
      tingkat: 5,
      tahunAjaran: '2023/2024'
    },
    {
      id: 7,
      namaSekolah: 'SD Islam An-Nur',
      namaKelas: '6A',
      totalSiswa: 22,
      rataRataNilai: 87.1,
      waliKelas: 'Ustadz Ali Imron',
      tingkat: 6,
      tahunAjaran: '2023/2024'
    },
    {
      id: 8,
      namaSekolah: 'SD Islam An-Nur',
      namaKelas: '5A',
      totalSiswa: 24,
      rataRataNilai: 85.8,
      waliKelas: 'Ustadzah Khadijah',
      tingkat: 5,
      tahunAjaran: '2023/2024'
    }
  ];

  const schools = ['all', 'SD Islam Al-Azhar', 'SD Islam Al-Furqan', 'SD Islam An-Nur', 'SD Islam Al-Irsyad'];

  const filteredClasses = classes.filter(kelas => {
    const matchesSearch = 
      kelas.namaSekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.namaKelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kelas.waliKelas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = selectedSchool === 'all' || kelas.namaSekolah === selectedSchool;
    return matchesSearch && matchesSchool;
  });

  const getNilaiColor = (nilai) => {
    if (nilai >= 90) return 'text-green-600';
    if (nilai >= 80) return 'text-blue-600';
    if (nilai >= 70) return 'text-yellow-600';
    return 'text-red-600';
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
          <h1 className="text-lg font-bold text-dark mb-1">Data Kelas</h1>
          <p className="text-xs text-gray-600">Kelola data kelas dari seluruh sekolah dalam sistem</p>
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
            <SafeIcon icon={FiSearch} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Cari berdasarkan sekolah, kelas, atau wali kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {schools.map(school => (
              <option key={school} value={school}>
                {school === 'all' ? 'Semua Sekolah' : school}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Class Table */}
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
                  Nama Sekolah
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rata-rata Nilai
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wali Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tingkat
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClasses.map((kelas, index) => (
                <motion.tr
                  key={kelas.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{kelas.namaSekolah}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {kelas.namaKelas}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    <div className="flex items-center">
                      <span className="font-medium">{kelas.totalSiswa}</span>
                      <span className="text-gray-500 ml-1">siswa</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs font-semibold ${getNilaiColor(kelas.rataRataNilai)}`}>
                      {kelas.rataRataNilai}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {kelas.waliKelas}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      Kelas {kelas.tingkat}
                    </span>
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

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <p className="text-2xl font-bold text-primary">{filteredClasses.length}</p>
          <p className="text-xs text-gray-600">Total Kelas</p>
        </motion.div>
        
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.3 }}
        >
          <p className="text-2xl font-bold text-success">
            {filteredClasses.reduce((sum, kelas) => sum + kelas.totalSiswa, 0)}
          </p>
          <p className="text-xs text-gray-600">Total Siswa</p>
        </motion.div>
        
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          <p className="text-2xl font-bold text-warning">
            {filteredClasses.length > 0 ? 
              (filteredClasses.reduce((sum, kelas) => sum + kelas.rataRataNilai, 0) / filteredClasses.length).toFixed(1) : 0}
          </p>
          <p className="text-xs text-gray-600">Rata-rata Nilai</p>
        </motion.div>
        
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.3 }}
        >
          <p className="text-2xl font-bold text-primary">
            {filteredClasses.length > 0 ? 
              Math.round(filteredClasses.reduce((sum, kelas) => sum + kelas.totalSiswa, 0) / filteredClasses.length) : 0}
          </p>
          <p className="text-xs text-gray-600">Rata-rata Siswa/Kelas</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DataKelas;