import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
// ... other imports

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
              {/* ... other routes */}
            </Routes>
          </motion.main>
        </div>
      </div>
    </Router>
  );
}

export default App;