import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiLayers, FiUsers, FiBarChart3, FiBook, FiAward, FiTrendingUp } = FiIcons;

const DashboardSuperAdmin = () => {
  const stats = [
    { title: 'Total Sekolah', value: 25, icon: FiLayers, color: 'primary' },
    { title: 'Total Siswa', value: 3420, icon: FiUsers, color: 'success' },
    { title: 'Total Guru', value: 245, icon: FiUsers, color: 'warning' },
    { title: 'Rata-rata Nilai Sistem', value: 85.2, icon: FiBarChart3, color: 'primary' },
    { title: 'Total Hafalan Selesai', value: 15670, icon: FiBook, color: 'success' },
    { title: 'Ujian Bulan Ini', value: 342, icon: FiAward, color: 'warning' },
  ];

  // Data sekolah terbaik
  const topSchools = [
    { name: 'SD Islam Al-Azhar', siswa: 450, rataHafalan: 12.5, rataUjian: 92.5, guru: 35 },
    { name: 'SD Islam Al-Furqan', siswa: 380, rataHafalan: 11.8, rataUjian: 89.2, guru: 28 },
    { name: 'SD Islam An-Nur', siswa: 320, rataHafalan: 10.2, rataUjian: 87.8, guru: 22 },
    { name: 'SD Islam Al-Irsyad', siswa: 290, rataHafalan: 9.8, rataUjian: 86.4, guru: 20 },
    { name: 'SD Islam Ar-Rahman', siswa: 275, rataHafalan: 9.1, rataUjian: 85.1, guru: 18 },
  ];

  // Statistik regional
  const regionalStats = [
    { region: 'Jakarta Selatan', sekolah: 8, siswa: 1200, rataHafalan: 11.2 },
    { region: 'Jakarta Timur', sekolah: 6, siswa: 950, rataHafalan: 10.8 },
    { region: 'Jakarta Barat', sekolah: 5, siswa: 780, rataHafalan: 10.1 },
    { region: 'Jakarta Utara', sekolah: 4, siswa: 320, rataHafalan: 9.5 },
    { region: 'Jakarta Pusat', sekolah: 2, siswa: 170, rataHafalan: 9.2 },
  ];

  // Aktivitas sistem terbaru
  const systemActivities = [
    { activity: 'SD Al-Azhar menambah 25 siswa baru', time: '2 jam lalu', type: 'siswa' },
    { activity: '342 ujian selesai hari ini', time: '4 jam lalu', type: 'ujian' },
    { activity: 'Guru baru terdaftar di 3 sekolah', time: '6 jam lalu', type: 'guru' },
    { activity: '1,250 hafalan baru disetor', time: '8 jam lalu', type: 'hafalan' },
    { activity: 'Backup data sistem berhasil', time: '12 jam lalu', type: 'sistem' },
  ];

  // Progress hafalan per juz
  const hafalanProgress = [
    { juz: 'Juz 30', siswa: 2890, persentase: 84.5 },
    { juz: 'Juz 29', siswa: 2150, persentase: 62.9 },
    { juz: 'Juz 28', siswa: 1820, persentase: 53.2 },
    { juz: 'Juz 1', siswa: 1650, persentase: 48.2 },
    { juz: 'Juz 2', siswa: 1420, persentase: 41.5 },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Super Admin</h1>
        <p className="text-xs text-gray-600">Monitoring seluruh sistem tahfidz nasional</p>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Schools */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Top 5 Sekolah Terbaik</h3>
          <div className="space-y-3">
            {topSchools.map((school, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">{school.name}</p>
                    <p className="text-xs text-gray-500">{school.siswa} siswa • {school.guru} guru</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{school.rataUjian}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center bg-blue-50 p-1 rounded">
                    <span className="text-blue-600 font-medium">{school.rataHafalan}</span>
                    <p className="text-blue-500">Juz/Siswa</p>
                  </div>
                  <div className="text-center bg-green-50 p-1 rounded">
                    <span className="text-green-600 font-medium">{school.rataUjian}</span>
                    <p className="text-green-500">Rata Ujian</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regional Statistics */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Statistik Regional</h3>
          <div className="space-y-3">
            {regionalStats.map((region, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-dark">{region.region}</p>
                  <p className="text-xs text-gray-500">{region.sekolah} sekolah • {region.siswa} siswa</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-primary">{region.rataHafalan}</span>
                  <p className="text-xs text-gray-500">Juz/Siswa</p>
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
          <h3 className="text-sm font-semibold text-dark mb-3">Progress Hafalan per Juz</h3>
          <div className="space-y-3">
            {hafalanProgress.map((juz, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-dark">{juz.juz}</span>
                  <span className="text-xs text-gray-600">{juz.siswa} siswa</span>
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

      {/* System Activities */}
      <motion.div
        className="bg-white p-4 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-dark mb-3">Aktivitas Sistem Terbaru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {systemActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                activity.type === 'siswa' ? 'bg-blue-500' :
                activity.type === 'ujian' ? 'bg-green-500' :
                activity.type === 'guru' ? 'bg-yellow-500' :
                activity.type === 'hafalan' ? 'bg-purple-500' :
                'bg-gray-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-xs text-dark font-medium">{activity.activity}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardSuperAdmin;