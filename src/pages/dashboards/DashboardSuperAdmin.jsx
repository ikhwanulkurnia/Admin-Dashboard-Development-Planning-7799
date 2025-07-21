import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiLayers, FiUsers, FiBarChart3 } = FiIcons;

const DashboardSuperAdmin = () => {
  const stats = [
    { title: 'Total Sekolah', value: 25, icon: FiLayers, color: 'primary' },
    { title: 'Total Siswa', value: 3420, icon: FiUsers, color: 'success' },
    { title: 'Total Guru', value: 245, icon: FiUsers, color: 'warning' },
    { title: 'Rata-rata Nilai', value: 85.2, icon: FiBarChart3, color: 'primary' },
  ];

  // Sample data for schools
  const topSchools = [
    { name: 'SD Islam Al-Azhar', students: 450, avgScore: 92.5 },
    { name: 'SD Islam Al-Furqan', students: 380, avgScore: 89.2 },
    { name: 'SD Islam An-Nur', students: 320, avgScore: 87.8 },
    { name: 'SD Islam Al-Irsyad', students: 290, avgScore: 86.4 },
    { name: 'SD Islam Ar-Rahman', students: 275, avgScore: 85.1 },
  ];

  // Sample data for regional statistics
  const regionalStats = [
    { region: 'Jakarta Selatan', schools: 8, students: 1200 },
    { region: 'Jakarta Timur', schools: 6, students: 950 },
    { region: 'Jakarta Barat', schools: 5, students: 780 },
    { region: 'Jakarta Utara', schools: 4, students: 320 },
    { region: 'Jakarta Pusat', schools: 2, students: 170 },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Super Admin</h1>
        <p className="text-xs text-gray-600">Selamat datang di Sistem Manajemen Tahfidz - Super Admin</p>
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
          <h3 className="text-sm font-semibold text-dark mb-3">Top 5 Sekolah Terbaik</h3>
          <div className="space-y-2">
            {topSchools.map((school, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-dark">{school.name}</p>
                  <p className="text-xs text-gray-500">{school.students} siswa</p>
                </div>
                <span className="text-xs font-semibold text-primary">{school.avgScore}</span>
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
          <h3 className="text-sm font-semibold text-dark mb-3">Statistik Regional</h3>
          <div className="space-y-3">
            {regionalStats.map((region, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-medium text-dark">{region.region}</p>
                  <p className="text-xs text-gray-500">{region.schools} sekolah</p>
                </div>
                <span className="text-xs text-primary">{region.students} siswa</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;