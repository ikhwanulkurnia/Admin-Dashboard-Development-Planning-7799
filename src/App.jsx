import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

// Import new pages for the updated menu structure
import DataSiswa from './pages/DataSiswa';
import AbsensiSiswa from './pages/AbsensiSiswa';
import HafalanBaru from './pages/HafalanBaru';
import Murojaah from './pages/Murojaah';
import UjianTahfidz from './pages/UjianTahfidz';
import StatistikPekanan from './pages/statistik/StatistikPekanan';
import StatistikBulanan from './pages/statistik/StatistikBulanan';
import StatistikSemesteran from './pages/statistik/StatistikSemesteran';
import StatistikTahunan from './pages/statistik/StatistikTahunan';
import RekapitulasiNilai from './pages/rapor/RekapitulasiNilai';
import CetakRapor from './pages/rapor/CetakRapor';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: 'Ustadz Ahmad',
    email: 'ahmad@tahfidz.com',
    role: 'Guru Tahfidz'
  });

  return (
    <Router>
      <div className="flex h-screen bg-secondary font-roboto">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentUser={currentUser}
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-14' : 'ml-56'}`}>
          <Header />
          
          <motion.main 
            className="flex-1 overflow-y-auto p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/data-siswa" element={<DataSiswa />} />
              <Route path="/absensi-siswa" element={<AbsensiSiswa />} />
              <Route path="/hafalan-baru" element={<HafalanBaru />} />
              <Route path="/murojaah" element={<Murojaah />} />
              <Route path="/ujian-tahfidz" element={<UjianTahfidz />} />
              <Route path="/statistik/pekanan" element={<StatistikPekanan />} />
              <Route path="/statistik/bulanan" element={<StatistikBulanan />} />
              <Route path="/statistik/semesteran" element={<StatistikSemesteran />} />
              <Route path="/statistik/tahunan" element={<StatistikTahunan />} />
              <Route path="/rapor-tahfidz/rekapitulasi-nilai" element={<RekapitulasiNilai />} />
              <Route path="/rapor-tahfidz/cetak-rapor" element={<CetakRapor />} />
            </Routes>
          </motion.main>
        </div>
      </div>
    </Router>
  );
}

export default App;