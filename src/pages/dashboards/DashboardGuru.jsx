import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiUsers, FiBook, FiRotateCcw, FiAward, FiCalendar, FiClock } = FiIcons;

const DashboardGuru = () => {
  const stats = [
    { title: 'Siswa Yang Diampu', value: 75, icon: FiUsers, color: 'primary' },
    { title: 'Hafalan Baru Hari Ini', value: 12, icon: FiBook, color: 'success' },
    { title: 'Murojaah Hari Ini', value: 18, icon: FiRotateCcw, color: 'warning' },
    { title: 'Ujian Minggu Ini', value: 5, icon: FiAward, color: 'primary' },
    { title: 'Kehadiran Hari Ini', value: 72, icon: FiCalendar, color: 'success' },
    { title: 'Tugas Menunggu', value: 8, icon: FiClock, color: 'warning' },
  ];

  // Siswa terbaik
  const topStudents = [
    { nama: 'Ahmad Rizki', kelas: '6A', capaian: 'Hafal 18 Juz', nilaiTerakhir: 95, hafalan: 18, murojaah: 15 },
    { nama: 'Siti Nurhayati', kelas: '6A', capaian: 'Hafal 16 Juz', nilaiTerakhir: 92, hafalan: 16, murojaah: 14 },
    { nama: 'Muhammad Iqbal', kelas: '6B', capaian: 'Hafal 15 Juz', nilaiTerakhir: 90, hafalan: 15, murojaah: 13 },
    { nama: 'Dewi Lestari', kelas: '5A', capaian: 'Hafal 12 Juz', nilaiTerakhir: 88, hafalan: 12, murojaah: 10 },
  ];

  // Jadwal hari ini
  const todaySchedule = [
    { waktu: '07:00-07:45', aktivitas: 'Hafalan Baru - Kelas 6A', jenis: 'hafalan', siswa: 25, status: 'selesai' },
    { waktu: '08:30-09:15', aktivitas: 'Murojaah - Kelas 6B', jenis: 'murojaah', siswa: 24, status: 'berlangsung' },
    { waktu: '10:00-10:30', aktivitas: 'Ujian Individu - Ahmad Rizki', jenis: 'ujian', siswa: 1, status: 'akan_datang' },
    { waktu: '13:00-13:45', aktivitas: 'Evaluasi Hafalan Mingguan - 5A', jenis: 'evaluasi', siswa: 26, status: 'akan_datang' },
    { waktu: '14:00-14:30', aktivitas: 'Konsultasi Orang Tua', jenis: 'konsultasi', siswa: 3, status: 'akan_datang' },
  ];

  // Kelas yang diampu
  const managedClasses = [
    { kelas: '6A', siswa: 25, rataHafalan: 16.2, rataUjian: 89.5, kehadiran: 96, terakhirSetor: 23 },
    { kelas: '6B', siswa: 24, rataHafalan: 14.8, rataUjian: 87.2, kehadiran: 94, terakhirSetor: 22 },
    { kelas: '5A', siswa: 26, rataHafalan: 11.5, rataUjian: 85.8, kehadiran: 92, terakhirSetor: 24 },
  ];

  // Aktivitas terbaru
  const recentActivities = [
    { aktivitas: 'Ahmad Rizki menyelesaikan Juz 15', waktu: '10 menit lalu', tipe: 'hafalan' },
    { aktivitas: 'Kelas 6A ujian Juz 30 - rata-rata 92.5', waktu: '1 jam lalu', tipe: 'ujian' },
    { aktivitas: 'Siti Nurhayati murojaah Juz 1-5', waktu: '2 jam lalu', tipe: 'murojaah' },
    { aktivitas: '3 siswa tidak hadir hari ini', waktu: '3 jam lalu', tipe: 'absen' },
    { aktivitas: 'Laporan mingguan kelas 6A selesai', waktu: '1 hari lalu', tipe: 'laporan' },
  ];

  // Target dan pencapaian
  const targets = [
    { target: 'Hafalan Juz 30 (Kelas 6)', selesai: 23, total: 25, persentase: 92 },
    { target: 'Ujian Semester (Semua Kelas)', selesai: 68, total: 75, persentase: 90.7 },
    { target: 'Murojaah Juz 1-10', selesai: 65, total: 75, persentase: 86.7 },
    { target: 'Kehadiran 95%', selesai: 72, total: 75, persentase: 96 },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Guru</h1>
        <p className="text-xs text-gray-600">Ustadz Ahmad Fauzi - Guru Tahfidz Kelas 5A, 6A, 6B</p>
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
        {/* Top Students */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Siswa Terbaik</h3>
          <div className="space-y-3">
            {topStudents.map((student, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">{student.nama}</p>
                    <p className="text-xs text-gray-500">{student.kelas} - {student.capaian}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{student.nilaiTerakhir}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="text-center bg-blue-50 p-1 rounded">
                    <span className="text-blue-600 font-medium">{student.hafalan}</span>
                    <p className="text-blue-500">Hafalan</p>
                  </div>
                  <div className="text-center bg-green-50 p-1 rounded">
                    <span className="text-green-600 font-medium">{student.murojaah}</span>
                    <p className="text-green-500">Murojaah</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Today Schedule */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Jadwal Hari Ini</h3>
          <div className="space-y-2">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className="p-3 rounded-lg border-l-4 border-blue-500 bg-blue-50">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="text-xs font-medium text-dark">{schedule.aktivitas}</p>
                    <p className="text-xs text-gray-600">{schedule.waktu} • {schedule.siswa} siswa</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    schedule.status === 'selesai' ? 'bg-green-100 text-green-600' :
                    schedule.status === 'berlangsung' ? 'bg-blue-100 text-blue-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {schedule.status === 'selesai' ? 'Selesai' :
                     schedule.status === 'berlangsung' ? 'Berlangsung' :
                     'Akan Datang'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Managed Classes */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Kelas Yang Diampu</h3>
          <div className="space-y-3">
            {managedClasses.map((kelas, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">Kelas {kelas.kelas}</p>
                    <p className="text-xs text-gray-500">{kelas.siswa} siswa</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{kelas.rataUjian}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center bg-blue-50 p-1 rounded">
                    <span className="text-blue-600 font-medium">{kelas.rataHafalan}</span>
                    <p className="text-blue-500">Juz</p>
                  </div>
                  <div className="text-center bg-green-50 p-1 rounded">
                    <span className="text-green-600 font-medium">{kelas.kehadiran}%</span>
                    <p className="text-green-500">Hadir</p>
                  </div>
                  <div className="text-center bg-yellow-50 p-1 rounded">
                    <span className="text-yellow-600 font-medium">{kelas.terakhirSetor}</span>
                    <p className="text-yellow-500">Setor</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activities */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Aktivitas Terbaru</h3>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  activity.tipe === 'hafalan' ? 'bg-blue-500' :
                  activity.tipe === 'ujian' ? 'bg-green-500' :
                  activity.tipe === 'murojaah' ? 'bg-purple-500' :
                  activity.tipe === 'absen' ? 'bg-red-500' :
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

        {/* Targets & Achievements */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Target & Pencapaian</h3>
          <div className="space-y-3">
            {targets.map((target, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-dark">{target.target}</span>
                  <span className="text-xs text-gray-600">{target.selesai}/{target.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${target.persentase}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-primary font-medium">{target.persentase}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardGuru;