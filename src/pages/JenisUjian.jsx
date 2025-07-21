import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiTarget, FiCalendar } = FiIcons;

const JenisUjian = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample exam types data
  const examTypes = [
    {
      id: 1,
      nama: 'Ujian Hafalan Juz 30',
      deskripsi: 'Ujian hafalan untuk Juz 30 (Juz Amma) lengkap dengan semua surat',
      tingkat: 'Pemula',
      durasi: 30,
      nilaiMinimal: 75,
      status: 'aktif',
      jumlahSoal: 10,
      tipeUjian: 'Hafalan',
      materi: 'Juz 30 - An-Naba sampai An-Nas',
      metodePenilaian: 'Hafalan + Tajwid'
    },
    {
      id: 2,
      nama: 'Ujian Hafalan Juz 1',
      deskripsi: 'Ujian hafalan untuk Juz 1 (Al-Fatihah - Al-Baqarah ayat 141)',
      tingkat: 'Menengah',
      durasi: 45,
      nilaiMinimal: 80,
      status: 'aktif',
      jumlahSoal: 15,
      tipeUjian: 'Hafalan',
      materi: 'Juz 1 - Al-Fatihah dan Al-Baqarah 1-141',
      metodePenilaian: 'Hafalan + Tajwid + Kelancaran'
    },
    {
      id: 3,
      nama: 'Ujian Tahsin Makharijul Huruf',
      deskripsi: 'Ujian praktik tahsin fokus pada makharijul huruf dan pengucapan yang benar',
      tingkat: 'Pemula',
      durasi: 20,
      nilaiMinimal: 70,
      status: 'aktif',
      jumlahSoal: 8,
      tipeUjian: 'Tahsin',
      materi: 'Makharijul Huruf dan Sifatul Huruf',
      metodePenilaian: 'Praktik Pengucapan'
    },
    {
      id: 4,
      nama: 'Ujian Tajwid Dasar',
      deskripsi: 'Ujian pemahaman tajwid dasar meliputi hukum nun sukun, mim sukun, dan mad',
      tingkat: 'Pemula',
      durasi: 40,
      nilaiMinimal: 75,
      status: 'aktif',
      jumlahSoal: 20,
      tipeUjian: 'Tajwid',
      materi: 'Hukum Nun Sukun, Mim Sukun, Mad, Qalqalah',
      metodePenilaian: 'Teori + Praktik'
    },
    {
      id: 5,
      nama: 'Ujian Hafalan Juz 2',
      deskripsi: 'Ujian hafalan untuk Juz 2 (Al-Baqarah ayat 142-252)',
      tingkat: 'Menengah',
      durasi: 45,
      nilaiMinimal: 80,
      status: 'aktif',
      jumlahSoal: 15,
      tipeUjian: 'Hafalan',
      materi: 'Juz 2 - Al-Baqarah 142-252',
      metodePenilaian: 'Hafalan + Tajwid + Kelancaran'
    },
    {
      id: 6,
      nama: 'Ujian Comprehensive Semester',
      deskripsi: 'Ujian komprehensif akhir semester meliputi hafalan, tahsin, tajwid, dan adab',
      tingkat: 'Lanjutan',
      durasi: 90,
      nilaiMinimal: 85,
      status: 'tidak_aktif',
      jumlahSoal: 50,
      tipeUjian: 'Komprehensif',
      materi: 'Semua materi semester',
      metodePenilaian: 'Teori + Praktik + Hafalan + Adab'
    }
  ];

  const filteredExamTypes = examTypes.filter(exam =>
    exam.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.tipeUjian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.materi.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-lg font-bold text-dark mb-1">Jenis Ujian</h1>
          <p className="text-xs text-gray-600">Kelola jenis dan kategori ujian tahfidz</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Jenis Ujian</span>
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
              <p className="text-xs font-medium text-gray-600 mb-1">Total Jenis Ujian</p>
              <p className="text-xl font-bold text-dark">{examTypes.length}</p>
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
              <p className="text-xs font-medium text-gray-600 mb-1">Ujian Aktif</p>
              <p className="text-xl font-bold text-dark">
                {examTypes.filter(exam => exam.status === 'aktif').length}
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
                {Math.round(examTypes.reduce((sum, exam) => sum + exam.durasi, 0) / examTypes.length)} min
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
                {examTypes.reduce((sum, exam) => sum + exam.jumlahSoal, 0)}
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
              placeholder="Cari jenis ujian berdasarkan nama, deskripsi, tipe, atau materi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Exam Types Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredExamTypes.map((exam, index) => (
          <motion.div
            key={exam.id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-dark">{exam.nama}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{exam.deskripsi}</p>
                </div>
                {getStatusBadge(exam.status)}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTipeColor(exam.tipeUjian)}`}>
                  {exam.tipeUjian}
                </span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTingkatColor(exam.tingkat)}`}>
                  {exam.tingkat}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center bg-blue-50 p-2 rounded-lg">
                  <p className="text-sm font-bold text-blue-600">{exam.durasi}</p>
                  <p className="text-xs text-blue-500">Menit</p>
                </div>
                <div className="text-center bg-green-50 p-2 rounded-lg">
                  <p className="text-sm font-bold text-green-600">{exam.jumlahSoal}</p>
                  <p className="text-xs text-green-500">Soal</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Materi:</p>
                  <p className="text-xs text-dark">{exam.materi}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Metode Penilaian:</p>
                  <p className="text-xs text-dark">{exam.metodePenilaian}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Nilai Minimal:</p>
                  <p className="text-xs text-dark font-semibold">{exam.nilaiMinimal}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-1 pt-3 border-t">
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JenisUjian;