import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiTarget, FiCalendar } = FiIcons;

const KategoriUjian = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample exam category data
  const examCategories = [
    {
      id: 1,
      nama: 'Ujian Hafalan Juz 1',
      deskripsi: 'Ujian hafalan untuk Juz 1 (Al-Fatihah - Al-Baqarah 141)',
      tingkat: 'Pemula',
      durasi: 30,
      nilaiMinimal: 75,
      status: 'aktif',
      jumlahSoal: 10,
      tipeUjian: 'Hafalan'
    },
    {
      id: 2,
      nama: 'Ujian Hafalan Juz 2',
      deskripsi: 'Ujian hafalan untuk Juz 2 (Al-Baqarah 142 - Al-Baqarah 252)',
      tingkat: 'Menengah',
      durasi: 45,
      nilaiMinimal: 80,
      status: 'aktif',
      jumlahSoal: 15,
      tipeUjian: 'Hafalan'
    },
    {
      id: 3,
      nama: 'Ujian Tahsin Makharijul Huruf',
      deskripsi: 'Ujian praktik tahsin fokus pada makharijul huruf',
      tingkat: 'Pemula',
      durasi: 20,
      nilaiMinimal: 70,
      status: 'aktif',
      jumlahSoal: 8,
      tipeUjian: 'Tahsin'
    },
    {
      id: 4,
      nama: 'Ujian Tajwid Dasar',
      deskripsi: 'Ujian pemahaman tajwid dasar dan penerapannya',
      tingkat: 'Pemula',
      durasi: 40,
      nilaiMinimal: 75,
      status: 'aktif',
      jumlahSoal: 20,
      tipeUjian: 'Tajwid'
    },
    {
      id: 5,
      nama: 'Ujian Hafalan Juz 30',
      deskripsi: 'Ujian hafalan untuk Juz 30 (Juz Amma)',
      tingkat: 'Pemula',
      durasi: 25,
      nilaiMinimal: 70,
      status: 'aktif',
      jumlahSoal: 12,
      tipeUjian: 'Hafalan'
    },
    {
      id: 6,
      nama: 'Ujian Comprehensive Semester',
      deskripsi: 'Ujian komprehensif akhir semester meliputi hafalan, tahsin, dan tajwid',
      tingkat: 'Lanjutan',
      durasi: 90,
      nilaiMinimal: 85,
      status: 'tidak_aktif',
      jumlahSoal: 50,
      tipeUjian: 'Komprehensif'
    }
  ];

  const filteredCategories = examCategories.filter(category =>
    category.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.tipeUjian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'aktif':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>;
      case 'tidak_aktif':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">Tidak Aktif</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">-</span>;
    }
  };

  const getTingkatColor = (tingkat) => {
    switch (tingkat) {
      case 'Pemula':
        return 'bg-blue-100 text-blue-800';
      case 'Menengah':
        return 'bg-yellow-100 text-yellow-800';
      case 'Lanjutan':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipeColor = (tipe) => {
    switch (tipe) {
      case 'Hafalan':
        return 'bg-green-100 text-green-800';
      case 'Tahsin':
        return 'bg-purple-100 text-purple-800';
      case 'Tajwid':
        return 'bg-blue-100 text-blue-800';
      case 'Komprehensif':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <h1 className="text-lg font-bold text-dark mb-1">Kategori Ujian</h1>
          <p className="text-xs text-gray-600">Kelola kategori dan jenis ujian tahfidz</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Kategori</span>
        </button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Total Kategori</p>
              <p className="text-xl font-bold text-dark">{examCategories.length}</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <SafeIcon icon={FiTarget} className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Kategori Aktif</p>
              <p className="text-xl font-bold text-dark">
                {examCategories.filter(cat => cat.status === 'aktif').length}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <SafeIcon icon={FiTarget} className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Rata-rata Durasi</p>
              <p className="text-xl font-bold text-dark">
                {Math.round(examCategories.reduce((sum, cat) => sum + cat.durasi, 0) / examCategories.length)} min
              </p>
            </div>
            <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
              <SafeIcon icon={FiCalendar} className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Total Soal</p>
              <p className="text-xl font-bold text-dark">
                {examCategories.reduce((sum, cat) => sum + cat.jumlahSoal, 0)}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <SafeIcon icon={FiEdit} className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search Filter */}
      <motion.div
        className="bg-white p-3 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <SafeIcon icon={FiSearch} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Cari kategori ujian berdasarkan nama, deskripsi, atau tipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Category List */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kategori
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipe Ujian
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tingkat
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durasi
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah Soal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai Minimal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category, index) => (
                <motion.tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-xs font-medium text-dark">{category.nama}</div>
                      <div className="text-xs text-gray-500 mt-1">{category.deskripsi}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTipeColor(category.tipeUjian)}`}>
                      {category.tipeUjian}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTingkatColor(category.tingkat)}`}>
                      {category.tingkat}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {category.durasi} menit
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {category.jumlahSoal} soal
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {category.nilaiMinimal}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(category.status)}
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

export default KategoriUjian;