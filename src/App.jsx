import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CourseManagement from './pages/CourseManagement';
import CategoryManagement from './pages/CategoryManagement';
import UserManagement from './pages/UserManagement';
import Enrollments from './pages/Enrollments';
import Orders from './pages/Orders';
import Certificates from './pages/Certificates';
import BankAccounts from './pages/BankAccounts';
import Coupons from './pages/Coupons';
import DataChangeRequests from './pages/DataChangeRequests';
import ExcelImport from './pages/ExcelImport';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: 'Admin User',
    email: 'admin@id-networkers.com',
    role: 'Administrator'
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
              <Route path="/course-management" element={<CourseManagement />} />
              <Route path="/category-management" element={<CategoryManagement />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/enrollments" element={<Enrollments />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/bank-accounts" element={<BankAccounts />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/data-change-requests" element={<DataChangeRequests />} />
              <Route path="/excel-import" element={<ExcelImport />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </motion.main>
        </div>
      </div>
    </Router>
  );
}

export default App;