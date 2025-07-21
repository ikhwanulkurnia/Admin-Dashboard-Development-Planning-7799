import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../components/StatCard';
import EnrollmentChart from '../components/EnrollmentChart';

const { FiUsers, FiBook, FiAward, FiCalendar } = FiIcons;

const Dashboard = () => {
  const stats = [
    { title: 'Total Siswa', value: 156, icon: FiUsers, color: 'primary' },
    { title: 'Hafalan Selesai', value: 2847, icon: FiBook, color: 'success' },
    { title: 'Ujian Bulan Ini', value: 23, icon: FiAward, color: 'warning' },
    { title: 'Kehadiran Hari Ini', value: 142, icon: FiCalendar, color: 'primary' }
  ];

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Tahfidz</h1>
        <p className="text-xs text-gray-600">Selamat datang di Sistem Manajemen Tahfidz</p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Enrollment Analytics Chart */}
      <EnrollmentChart />

      {/* Recent Activities */}
      <motion.div
        className="bg-white p-4 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-dark mb-3">Aktivitas Terbaru</h3>
        <div className="space-y-2">
          {[
            { type: 'hafalan', message: 'Ahmad Rizki menyelesaikan hafalan Al-Baqarah 11-20', time: '2 menit lalu' },
            { type: 'ujian', message: 'Ujian tahfidz kelas 7A dijadwalkan untuk besok', time: '15 menit lalu' },
            { type: 'murojaah', message: 'Siti Nurhayati melakukan murojaah Juz 1', time: '1 jam lalu' },
            { type: 'absensi', message: '142 siswa hadir hari ini', time: '2 jam lalu' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-xs text-dark">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;