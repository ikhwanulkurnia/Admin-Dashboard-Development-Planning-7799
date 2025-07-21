import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiUsers, FiGrid, FiBarChart3 } = FiIcons;

const DashboardAdmin = () => {
  const stats = [
    { title: 'Total Siswa', value: 420, icon: FiUsers, color: 'primary' },
    { title: 'Total Guru', value: 35, icon: FiUsers, color: 'success' },
    { title: 'Total Kelas', value: 18, icon: FiGrid, color: 'warning' },
    { title: 'Rata-rata Nilai', value: 87.5, icon: FiBarChart3, color: 'primary' },
  ];

  // Sample data for best classes
  const bestClasses = [
    { class: '6A', students: 25, avgScore: 92.8, teacher: 'Ustadz Ahmad' },
    { class: '5B', students: 23, avgScore: 90.5, teacher: 'Ustadzah Siti' },
    { class: '6B', students: 24, avgScore: 89.2, teacher: 'Ustadz Budi' },
    { class: '5A', students: 26, avgScore: 87.9, teacher: 'Ustadzah Dewi' },
  ];

  // Sample data for latest activities
  const latestActivities = [
    { activity: 'Ujian Tahfidz Kelas 6A selesai', time: '2 menit lalu', type: 'ujian' },
    { activity: '15 siswa menambah hafalan baru', time: '15 menit lalu', type: 'hafalan' },
    { activity: 'Laporan bulanan telah dibuat', time: '1 jam lalu', type: 'laporan' },
    { activity: 'Guru baru terdaftar: Ustadz Ridwan', time: '2 jam lalu', type: 'guru' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Kelas Terbaik</h3>
          <div className="space-y-2">
            {bestClasses.map((classData, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-dark">Kelas {classData.class}</p>
                  <p className="text-xs text-gray-500">{classData.students} siswa - {classData.teacher}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{classData.avgScore}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Aktivitas Terbaru</h3>
          <div className="space-y-2">
            {latestActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs text-dark">{activity.activity}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
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