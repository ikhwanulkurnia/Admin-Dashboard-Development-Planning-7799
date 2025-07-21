import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiUsers, FiBook, FiRotateCcw, FiAward } = FiIcons;

const DashboardGuru = () => {
  const stats = [
    { title: 'Siswa Yang Diampu', value: 45, icon: FiUsers, color: 'primary' },
    { title: 'Hafalan Baru Hari Ini', value: 8, icon: FiBook, color: 'success' },
    { title: 'Murojaah Hari Ini', value: 12, icon: FiRotateCcw, color: 'warning' },
    { title: 'Ujian Minggu Ini', value: 3, icon: FiAward, color: 'primary' },
  ];

  // Sample data for top students
  const topStudents = [
    { name: 'Ahmad Rizki', class: '6A', achievement: 'Hafal 5 Juz', score: 95 },
    { name: 'Siti Nurhayati', class: '6A', achievement: 'Hafal 4 Juz', score: 92 },
    { name: 'Muhammad Iqbal', class: '6B', achievement: 'Hafal 4 Juz', score: 90 },
    { name: 'Dewi Lestari', class: '6B', achievement: 'Hafal 3 Juz', score: 88 },
  ];

  // Sample data for today's schedule
  const todaySchedule = [
    { time: '07:00', activity: 'Hafalan Baru - Kelas 6A', status: 'selesai' },
    { time: '08:30', activity: 'Murojaah - Kelas 6B', status: 'berlangsung' },
    { time: '10:00', activity: 'Ujian Tahfidz - Ahmad Rizki', status: 'akan_datang' },
    { time: '13:00', activity: 'Evaluasi Hafalan Mingguan', status: 'akan_datang' },
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Guru</h1>
        <p className="text-xs text-gray-600">Ustadz Ahmad - Kelas 6A & 6B</p>
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
          <h3 className="text-sm font-semibold text-dark mb-3">Siswa Berprestasi</h3>
          <div className="space-y-2">
            {topStudents.map((student, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs font-medium text-dark">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.class} - {student.achievement}</p>
                </div>
                <span className="text-xs font-semibold text-primary">{student.score}</span>
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
          <h3 className="text-sm font-semibold text-dark mb-3">Jadwal Hari Ini</h3>
          <div className="space-y-2">
            {todaySchedule.map((schedule, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-600 w-12">{schedule.time}</div>
                <div className="flex-1">
                  <p className="text-xs text-dark">{schedule.activity}</p>
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
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardGuru;