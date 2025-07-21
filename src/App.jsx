import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DataSiswa from './pages/DataSiswa';
import HafalanBaru from './pages/HafalanBaru';
import Murojaah from './pages/Murojaah';
import NotFoundPage from './pages/NotFoundPage';

// Import halaman-halaman baru
import DashboardSuperAdmin from './pages/dashboards/DashboardSuperAdmin';
import DashboardAdmin from './pages/dashboards/DashboardAdmin';
import DashboardGuru from './pages/dashboards/DashboardGuru';
import DashboardOrangTua from './pages/dashboards/DashboardOrangTua';
import DataSekolah from './pages/DataSekolah';
import DataKelas from './pages/DataKelas';
import JenisUjian from './pages/JenisUjian';
import Ujian from './pages/Ujian';
import RekapitulasiNilai from './pages/RekapitulasiNilai';
import CetakRaport from './pages/CetakRaport';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: 'Ustadz Ahmad',
    email: 'ahmad@tahfidz.com',
    role: 'Guru Tahfidz'
  });

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div className="flex h-screen bg-secondary font-roboto">
        <Sidebar 
          collapsed={sidebarCollapsed}
          currentUser={currentUser}
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-14' : 'ml-56'}`}>
          <Header onToggleSidebar={handleToggleSidebar} />
          
          <motion.main 
            className="flex-1 overflow-y-auto p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard-superadmin" element={<DashboardSuperAdmin />} />
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
              <Route path="/dashboard-guru" element={<DashboardGuru />} />
              <Route path="/dashboard-orangtua" element={<DashboardOrangTua />} />
              <Route path="/data-sekolah" element={<DataSekolah />} />
              <Route path="/data-kelas" element={<DataKelas />} />
              <Route path="/jenis-ujian" element={<JenisUjian />} />
              <Route path="/data-siswa" element={<DataSiswa />} />
              <Route path="/hafalan-baru" element={<HafalanBaru />} />
              <Route path="/murojaah" element={<Murojaah />} />
              <Route path="/ujian" element={<Ujian />} />
              <Route path="/rekapitulasi-nilai" element={<RekapitulasiNilai />} />
              <Route path="/cetak-raport" element={<CetakRaport />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.main>
        </div>
      </div>
    </Router>
  );
}

export default App;