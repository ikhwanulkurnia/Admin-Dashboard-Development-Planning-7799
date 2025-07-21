import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiUsers, FiBook, FiBarChart3, FiAward } = FiIcons;

const DashboardOrangTua = () => {
  const stats = [
    { title: 'Jumlah Anak', value: 2, icon: FiUsers, color: 'primary' },
    { title: 'Total Hafalan', value: 8, icon: FiBook, color: 'success' },
    { title: 'Rata-rata Nilai', value: 89, icon: FiBarChart3, color: 'warning' },
    { title: 'Ujian Bulan Ini', value: 4, icon: FiAward, color: 'primary' },
  ];

  // Sample data for children
  const children = [
    { name: 'Ahmad Farhan', class: '6A', progress: 85, lastActivity: 'Hafal Al-Baqarah 1-20' },
    { name: 'Siti Zahra', class: '4B', progress: 70, lastActivity: 'Murojaah Juz 1' },
  ];

  // Sample data for recent activities
  const recentActivities = [
    { child: 'Ahmad Farhan', activity: 'Menyelesaikan hafalan Al-Baqarah 15-20', time: '2 jam lalu' },
    { child: 'Siti Zahra', activity: 'Murojaah Juz 1 dengan nilai A', time: '1 hari lalu' },
    { child: 'Ahmad Farhan', activity: 'Ujian Tahfidz Juz 2 nilai 90', time: '2 hari lalu' },
    { child: 'Siti Zahra', activity: 'Hafalan baru Al-Fatihah', time: '3 hari lalu' },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Orang Tua</h1>
        <p className="text-xs text-gray-600">Laporan perkembangan anak-anak Anda</p>
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
          <h3 className="text-sm font-semibold text-dark mb-3">Perkembangan Anak</h3>
          <div className="space-y-3">
            {children.map((child, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">{child.name}</p>
                    <p className="text-xs text-gray-500">Kelas {child.class}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{child.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${child.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600">{child.lastActivity}</p>
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
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 hover:bg-gray-50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-dark">{activity.child}</p>
                  <p className="text-xs text-gray-600">{activity.activity}</p>
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

export default DashboardOrangTua;