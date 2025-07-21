import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiUsers, FiGrid, FiBarChart3, FiBook, FiAward, FiCalendar } = FiIcons;

const DashboardAdmin = () => {
  const stats = [
    { title: 'Total Siswa', value: 420, icon: FiUsers, color: 'primary' },
    { title: 'Total Guru', value: 35, icon: FiUsers, color: 'success' },
    { title: 'Total Kelas', value: 18, icon: FiGrid, color: 'warning' },
    { title: 'Rata-rata Nilai', value: 87.5, icon: FiBarChart3, color: 'primary' },
    { title: 'Hafalan Selesai', value: 1250, icon: FiBook, color: 'success' },
    { title: 'Kehadiran Hari Ini', value: 398, icon: FiCalendar, color: 'warning' },
  ];

  // Data kelas terbaik
  const bestClasses = [
    { kelas: '6A', siswa: 25, rataHafalan: 15.2, rataUjian: 92.8, waliKelas: 'Ustadz Ahmad', kehadiran: 96 },
    { kelas: '5B', siswa: 23, rataHafalan: 12.8, rataUjian: 90.5, waliKelas: 'Ustadzah Siti', kehadiran: 94 },
    { kelas: '6B', siswa: 24, rataHafalan: 14.1, rataUjian: 89.2, waliKelas: 'Ustadz Budi', kehadiran: 92 },
    { kelas: '5A', siswa: 26, rataHafalan: 11.5, rataUjian: 87.9, waliKelas: 'Ustadzah Dewi', kehadiran: 90 },
  ];

  // Guru terbaik
  const bestTeachers = [
    { nama: 'Ustadz Ahmad Fauzi', mapel: 'Tahfidz', siswa: 75, rataKelas: 92.5, kehadiran: 98 },
    { nama: 'Ustadzah Siti Aminah', mapel: 'Tahsin', siswa: 68, rataKelas: 89.8, kehadiran: 96 },
    { nama: 'Ustadz Budi Santoso', mapel: 'Tahfidz', siswa: 70, rataKelas: 88.2, kehadiran: 94 },
    { nama: 'Ustadzah Dewi Lestari', mapel: 'Adab', siswa: 85, rataKelas: 87.1, kehadiran: 92 },
  ];

  // Aktivitas sekolah terbaru
  const schoolActivities = [
    { aktivitas: 'Ujian Tahfidz Kelas 6A selesai - Rata-rata 92.5', waktu: '2 menit lalu', tipe: 'ujian' },
    { aktivitas: '25 siswa baru menyelesaikan hafalan Juz 30', waktu: '15 menit lalu', tipe: 'hafalan' },
    { aktivitas: 'Rapat koordinasi guru tahfidz', waktu: '1 jam lalu', tipe: 'rapat' },
    { aktivitas: 'Laporan bulanan dikirim ke yayasan', waktu: '2 jam lalu', tipe: 'laporan' },
    { aktivitas: 'Guru baru bergabung: Ustadz Ridwan', waktu: '1 hari lalu', tipe: 'guru' },
  ];

  // Progress hafalan sekolah
  const hafalanProgress = [
    { juz: 'Juz 30', siswa: 380, target: 420, persentase: 90.5 },
    { juz: 'Juz 29', siswa: 285, target: 420, persentase: 67.9 },
    { juz: 'Juz 28', siswa: 198, target: 420, persentase: 47.1 },
    { juz: 'Juz 1-2', siswa: 156, target: 420, persentase: 37.1 },
  ];

  // Jadwal ujian mendatang
  const upcomingExams = [
    { kelas: '5A', ujian: 'Ujian Juz 30', tanggal: '2023-12-20', siswa: 26 },
    { kelas: '6B', ujian: 'Ujian Juz 29', tanggal: '2023-12-22', siswa: 24 },
    { kelas: '4A', ujian: 'Ujian Tahsin', tanggal: '2023-12-25', siswa: 28 },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Admin Sekolah</h1>
        <p className="text-xs text-gray-600">SD Islam Al-Azhar - Tahun Ajaran 2023/2024</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            index={index}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Best Classes */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Kelas Terbaik</h3>
          <div className="space-y-3">
            {bestClasses.map((kelas, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">Kelas {kelas.kelas}</p>
                    <p className="text-xs text-gray-500">{kelas.siswa} siswa • {kelas.waliKelas}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{kelas.rataUjian}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center bg-blue-50 p-1 rounded">
                    <span className="text-blue-600 font-medium">{kelas.rataHafalan}</span>
                    <p className="text-blue-500">Juz</p>
                  </div>
                  <div className="text-center bg-green-50 p-1 rounded">
                    <span className="text-green-600 font-medium">{kelas.rataUjian}</span>
                    <p className="text-green-500">Ujian</p>
                  </div>
                  <div className="text-center bg-yellow-50 p-1 rounded">
                    <span className="text-yellow-600 font-medium">{kelas.kehadiran}%</span>
                    <p className="text-yellow-500">Hadir</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Best Teachers */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Guru Terbaik</h3>
          <div className="space-y-3">
            {bestTeachers.map((guru, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">{guru.nama}</p>
                    <p className="text-xs text-gray-500">{guru.mapel} • {guru.siswa} siswa</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{guru.rataKelas}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-600">Kehadiran: {guru.kehadiran}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress Hafalan */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Progress Hafalan Sekolah</h3>
          <div className="space-y-3">
            {hafalanProgress.map((juz, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-dark">{juz.juz}</span>
                  <span className="text-xs text-gray-600">{juz.siswa}/{juz.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${juz.persentase}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-primary font-medium">{juz.persentase}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* School Activities */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Aktivitas Sekolah Terbaru</h3>
          <div className="space-y-2">
            {schoolActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  activity.tipe === 'ujian' ? 'bg-green-500' :
                  activity.tipe === 'hafalan' ? 'bg-blue-500' :
                  activity.tipe === 'rapat' ? 'bg-yellow-500' :
                  activity.tipe === 'laporan' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-xs text-dark">{activity.aktivitas}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.waktu}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Exams */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Ujian Mendatang</h3>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-dark">{exam.ujian}</p>
                    <p className="text-xs text-gray-600">Kelas {exam.kelas} • {exam.siswa} siswa</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-blue-600">{exam.tanggal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardAdmin;