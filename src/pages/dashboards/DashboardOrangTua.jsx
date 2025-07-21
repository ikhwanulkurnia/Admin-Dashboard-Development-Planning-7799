import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import StatCard from '../../components/StatCard';

const { FiUsers, FiBook, FiBarChart3, FiAward, FiCalendar, FiTrendingUp } = FiIcons;

const DashboardOrangTua = () => {
  const stats = [
    { title: 'Jumlah Anak', value: 2, icon: FiUsers, color: 'primary' },
    { title: 'Total Hafalan', value: 28, icon: FiBook, color: 'success' },
    { title: 'Rata-rata Nilai', value: 89.5, icon: FiBarChart3, color: 'warning' },
    { title: 'Ujian Bulan Ini', value: 6, icon: FiAward, color: 'primary' },
    { title: 'Kehadiran Bulan Ini', value: 95, icon: FiCalendar, color: 'success' },
    { title: 'Peningkatan', value: 12, icon: FiTrendingUp, color: 'warning' },
  ];

  // Data anak-anak
  const children = [
    { 
      nama: 'Ahmad Farhan', 
      kelas: '6A', 
      nisn: '2021001',
      progress: 85, 
      hafalanSelesai: 18,
      targetHafalan: 20,
      terakhirZiyadah: 'Al-Baqarah 15-20',
      terakhirMurojaah: 'Juz 1-5',
      nilaiTerakhir: 92,
      kehadiran: 96,
      ranking: 2
    },
    { 
      nama: 'Siti Zahra', 
      kelas: '4B', 
      nisn: '2021105',
      progress: 70, 
      hafalanSelesai: 10,
      targetHafalan: 12,
      terakhirZiyadah: 'An-Naba 1-10',
      terakhirMurojaah: 'Juz 30',
      nilaiTerakhir: 87,
      kehadiran: 94,
      ranking: 5
    }
  ];

  // Aktivitas terbaru anak-anak
  const recentActivities = [
    { 
      anak: 'Ahmad Farhan', 
      aktivitas: 'Menyelesaikan hafalan Al-Baqarah 15-20', 
      waktu: '2 jam lalu',
      nilai: 'Lancar',
      tipe: 'hafalan'
    },
    { 
      anak: 'Siti Zahra', 
      aktivitas: 'Murojaah Juz 30 dengan nilai A', 
      waktu: '1 hari lalu',
      nilai: 'Lancar',
      tipe: 'murojaah'
    },
    { 
      anak: 'Ahmad Farhan', 
      aktivitas: 'Ujian Tahfidz Juz 15 - Nilai 92', 
      waktu: '2 hari lalu',
      nilai: '92',
      tipe: 'ujian'
    },
    { 
      anak: 'Siti Zahra', 
      aktivitas: 'Hafalan baru An-Naba 1-10', 
      waktu: '3 hari lalu',
      nilai: 'Lancar',
      tipe: 'hafalan'
    },
    { 
      anak: 'Ahmad Farhan', 
      aktivitas: 'Tidak hadir - Sakit', 
      waktu: '1 minggu lalu',
      nilai: '-',
      tipe: 'absen'
    }
  ];

  // Jadwal ujian mendatang
  const upcomingExams = [
    { anak: 'Ahmad Farhan', ujian: 'Ujian Juz 16', tanggal: '2023-12-20', persiapan: 85 },
    { anak: 'Siti Zahra', ujian: 'Ujian Tahsin', tanggal: '2023-12-22', persiapan: 78 },
    { anak: 'Ahmad Farhan', ujian: 'Ujian Semester', tanggal: '2023-12-28', persiapan: 90 }
  ];

  // Progress hafalan per anak
  const hafalanProgress = [
    { anak: 'Ahmad Farhan', juz: 'Juz 1-15', selesai: 15, target: 20, persentase: 75 },
    { anak: 'Ahmad Farhan', juz: 'Juz 30', selesai: 1, target: 1, persentase: 100 },
    { anak: 'Siti Zahra', juz: 'Juz 30', selesai: 1, target: 1, persentase: 100 },
    { anak: 'Siti Zahra', juz: 'Juz 29-28', selesai: 1, target: 3, persentase: 33 }
  ];

  // Catatan guru
  const teacherNotes = [
    {
      anak: 'Ahmad Farhan',
      guru: 'Ustadz Ahmad Fauzi',
      catatan: 'Ahmad menunjukkan peningkatan yang sangat baik dalam hafalan. Tajwidnya sudah bagus, perlu lebih fokus pada kelancaran.',
      tanggal: '2023-12-15',
      mapel: 'Tahfidz'
    },
    {
      anak: 'Siti Zahra',
      guru: 'Ustadzah Dewi Lestari',
      catatan: 'Zahra anak yang rajin, namun perlu lebih percaya diri saat murojaah. Hafalan sudah bagus.',
      tanggal: '2023-12-14',
      mapel: 'Tahfidz'
    }
  ];

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Dashboard Orang Tua</h1>
        <p className="text-xs text-gray-600">Laporan perkembangan anak-anak Anda - Bapak Joko Widodo</p>
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

      {/* Children Progress */}
      <motion.div
        className="bg-white p-4 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-dark mb-3">Perkembangan Anak</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {children.map((child, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-medium text-dark">{child.nama}</p>
                  <p className="text-xs text-gray-500">Kelas {child.kelas} • NISN: {child.nisn}</p>
                  <p className="text-xs text-blue-600">Ranking: {child.ranking} di kelas</p>
                </div>
                <span className="text-sm font-semibold text-primary">{child.nilaiTerakhir}</span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Progress Hafalan</span>
                  <span className="text-xs text-gray-600">{child.hafalanSelesai}/{child.targetHafalan} Juz</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${child.progress}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs text-primary font-medium">{child.progress}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-blue-50 p-2 rounded">
                  <p className="text-blue-500 font-medium">Terakhir Ziyadah</p>
                  <p className="text-blue-700">{child.terakhirZiyadah}</p>
                </div>
                <div className="bg-green-50 p-2 rounded">
                  <p className="text-green-500 font-medium">Terakhir Murojaah</p>
                  <p className="text-green-700">{child.terakhirMurojaah}</p>
                </div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Kehadiran: <span className="font-medium text-green-600">{child.kehadiran}%</span></span>
                <span className="text-gray-600">Hafalan: <span className="font-medium text-blue-600">{child.hafalanSelesai} Juz</span></span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Recent Activities */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-sm border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Aktivitas Terbaru</h3>
          <div className="space-y-2">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-start space-x-2">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.tipe === 'hafalan' ? 'bg-blue-500' :
                    activity.tipe === 'ujian' ? 'bg-green-500' :
                    activity.tipe === 'murojaah' ? 'bg-purple-500' :
                    activity.tipe === 'absen' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-dark">{activity.anak}</p>
                    <p className="text-xs text-gray-600">{activity.aktivitas}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500">{activity.waktu}</p>
                      {activity.nilai !== '-' && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          activity.nilai === 'Lancar' ? 'bg-green-100 text-green-600' :
                          activity.tipe === 'ujian' ? 'bg-blue-100 text-blue-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {activity.nilai}
                        </span>
                      )}
                    </div>
                  </div>
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
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Ujian Mendatang</h3>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-xs font-medium text-dark">{exam.ujian}</p>
                    <p className="text-xs text-gray-600">{exam.anak}</p>
                  </div>
                  <p className="text-xs font-medium text-blue-600">{exam.tanggal}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Persiapan</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${exam.persiapan}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-blue-600">{exam.persiapan}%</span>
                  </div>
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
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-dark mb-3">Progress Hafalan Detail</h3>
          <div className="space-y-3">
            {hafalanProgress.map((progress, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-medium text-dark">{progress.anak}</span>
                    <p className="text-xs text-gray-500">{progress.juz}</p>
                  </div>
                  <span className="text-xs text-gray-600">{progress.selesai}/{progress.target}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress.persentase}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-primary font-medium">{progress.persentase}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Teacher Notes */}
      <motion.div
        className="bg-white p-4 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <h3 className="text-sm font-semibold text-dark mb-3">Catatan Guru</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {teacherNotes.map((note, index) => (
            <div key={index} className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-dark">{note.anak}</p>
                  <p className="text-xs text-gray-600">{note.guru} - {note.mapel}</p>
                </div>
                <p className="text-xs text-gray-500">{note.tanggal}</p>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">{note.catatan}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOrangTua;