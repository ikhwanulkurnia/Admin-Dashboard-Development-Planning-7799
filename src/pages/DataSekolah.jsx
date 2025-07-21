import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch } = FiIcons;

const DataSekolah = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample school data
  const schools = [
    {
      id: 1,
      nama: 'SD Islam Al-Azhar',
      alamat: 'Jl. Sisingamangaraja No. 2, Jakarta Selatan',
      totalSiswa: 450,
      rataRataNilai: 92.5,
      kepalaSekolah: 'Dr. Ahmad Sutanto, M.Pd.',
      tahunBerdiri: 1985,
      akreditasi: 'A',
      jumlahGuru: 35,
      jumlahKelas: 18
    },
    {
      id: 2,
      nama: 'SD Islam Al-Furqan',
      alamat: 'Jl. Merdeka No. 15, Jakarta Timur',
      totalSiswa: 380,
      rataRataNilai: 89.2,
      kepalaSekolah: 'Drs. Budi Hermawan, M.Pd.',
      tahunBerdiri: 1992,
      akreditasi: 'A',
      jumlahGuru: 28,
      jumlahKelas: 15
    },
    {
      id: 3,
      nama: 'SD Islam An-Nur',
      alamat: 'Jl. Pahlawan No. 8, Jakarta Utara',
      totalSiswa: 320,
      rataRataNilai: 87.8,
      kepalaSekolah: 'Hj. Siti Nurhalimah, S.Pd., M.M.',
      tahunBerdiri: 1998,
      akreditasi: 'A',
      jumlahGuru: 22,
      jumlahKelas: 12
    },
    {
      id: 4,
      nama: 'SD Islam Al-Irsyad',
      alamat: 'Jl. Veteran No. 12, Jakarta Barat',
      totalSiswa: 290,
      rataRataNilai: 86.4,
      kepalaSekolah: 'Drs. Muhammad Ridwan, M.Pd.',
      tahunBerdiri: 2001,
      akreditasi: 'B+',
      jumlahGuru: 20,
      jumlahKelas: 11
    },
    {
      id: 5,
      nama: 'SD Islam Ar-Rahman',
      alamat: 'Jl. Kebangsaan No. 25, Jakarta Pusat',
      totalSiswa: 275,
      rataRataNilai: 85.1,
      kepalaSekolah: 'Dr. Hj. Fatimah Azzahra, M.Pd.',
      tahunBerdiri: 2005,
      akreditasi: 'B+',
      jumlahGuru: 18,
      jumlahKelas: 10
    }
  ];

  const filteredSchools = schools.filter(school =>
    school.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.kepalaSekolah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAkreditasiBadge = (akreditasi) => {
    switch (akreditasi) {
      case 'A':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">A</span>;
      case 'B+':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">B+</span>;
      case 'B':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">B</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{akreditasi}</span>;
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
          <h1 className="text-lg font-bold text-dark mb-1">Data Sekolah</h1>
          <p className="text-xs text-gray-600">Kelola data sekolah yang terdaftar dalam sistem</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Sekolah</span>
        </button>
      </motion.div>

      {/* Search Bar */}
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
              placeholder="Cari sekolah berdasarkan nama, alamat, atau kepala sekolah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* School Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredSchools.map((school, index) => (
          <motion.div
            key={school.id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-dark">{school.nama}</h3>
                  <p className="text-xs text-gray-500 mt-1">{school.alamat}</p>
                </div>
                {getAkreditasiBadge(school.akreditasi)}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center bg-blue-50 p-2 rounded-lg">
                  <p className="text-lg font-bold text-blue-600">{school.totalSiswa}</p>
                  <p className="text-xs text-blue-500">Total Siswa</p>
                </div>
                <div className="text-center bg-green-50 p-2 rounded-lg">
                  <p className="text-lg font-bold text-green-600">{school.rataRataNilai}</p>
                  <p className="text-xs text-green-500">Rata-rata Nilai</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Kepala Sekolah:</span>
                  <span className="text-dark font-medium">{school.kepalaSekolah}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Tahun Berdiri:</span>
                  <span className="text-dark font-medium">{school.tahunBerdiri}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Jumlah Guru:</span>
                  <span className="text-dark font-medium">{school.jumlahGuru} orang</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Jumlah Kelas:</span>
                  <span className="text-dark font-medium">{school.jumlahKelas} kelas</span>
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

      {/* Summary Stats */}
      <motion.div
        className="bg-white p-4 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-dark mb-3">Ringkasan Statistik</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{schools.length}</p>
            <p className="text-xs text-gray-600">Total Sekolah</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{schools.reduce((sum, school) => sum + school.totalSiswa, 0).toLocaleString()}</p>
            <p className="text-xs text-gray-600">Total Siswa</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{schools.reduce((sum, school) => sum + school.jumlahGuru, 0)}</p>
            <p className="text-xs text-gray-600">Total Guru</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {(schools.reduce((sum, school) => sum + school.rataRataNilai, 0) / schools.length).toFixed(1)}
            </p>
            <p className="text-xs text-gray-600">Rata-rata Nilai</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DataSekolah;