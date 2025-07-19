import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../components/StatCard';
import EnrollmentChart from '../components/EnrollmentChart';

const { FiBook, FiUsers, FiAward } = FiIcons;

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Courses',
      value: 156,
      icon: FiBook,
      color: 'primary'
    },
    {
      title: 'Total Students',
      value: 2847,
      icon: FiUsers,
      color: 'success'
    },
    {
      title: 'Certificates Issued',
      value: 1923,
      icon: FiAward,
      color: 'warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di ID-Networkers Admin Dashboard</p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        className="bg-white p-6 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-dark mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {[
            { type: 'enrollment', message: 'Ahmad Rizki mendaftar kursus React Development', time: '2 menit lalu' },
            { type: 'certificate', message: 'Sertifikat diterbitkan untuk Maria Sari - UI/UX Design', time: '15 menit lalu' },
            { type: 'course', message: 'Kursus baru ditambahkan: Advanced JavaScript', time: '1 jam lalu' },
            { type: 'payment', message: 'Pembayaran berhasil untuk order #12345', time: '2 jam lalu' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-dark">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;