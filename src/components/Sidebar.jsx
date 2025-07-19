import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as MdIcons from 'react-icons/md';
import * as HiIcons from 'react-icons/hi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiHome, FiBook, FiGrid, FiUsers, FiUserCheck, FiShoppingCart, 
  FiAward, FiCreditCard, FiPercent, FiFileText, FiUpload, 
  FiActivity, FiSettings, FiLogOut, FiMenu, FiUser 
} = FiIcons;

const Sidebar = ({ collapsed, onToggle, currentUser }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/course-management', icon: FiBook, label: 'Manajemen Kursus' },
    { path: '/category-management', icon: FiGrid, label: 'Kategori Kursus' },
    { path: '/user-management', icon: FiUsers, label: 'Manajemen User' },
    { path: '/enrollments', icon: FiUserCheck, label: 'Enrollments' },
    { path: '/orders', icon: FiShoppingCart, label: 'Orders' },
    { path: '/certificates', icon: FiAward, label: 'Sertifikat' },
    { path: '/bank-accounts', icon: FiCreditCard, label: 'Bank Accounts' },
    { path: '/coupons', icon: FiPercent, label: 'Coupons' },
    { path: '/data-change-requests', icon: FiFileText, label: 'Pengajuan Perubahan Data' },
    { path: '/excel-import', icon: FiUpload, label: 'Excel Import' },
    { path: '/audit-logs', icon: FiActivity, label: 'Audit Logs' },
    { path: '/settings', icon: FiSettings, label: 'Pengaturan' },
  ];

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ID</span>
            </div>
            <span className="font-bold text-dark text-lg">ID-Networkers</span>
          </motion.div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiMenu} className="w-5 h-5 text-dark" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-primary text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <SafeIcon 
                    icon={item.icon} 
                    className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'
                    }`} 
                  />
                  {!collapsed && (
                    <motion.span 
                      className="font-medium text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="border-t p-4">
        {!collapsed && (
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        <button className="flex items-center w-full px-3 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 group">
          <SafeIcon 
            icon={FiLogOut} 
            className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} group-hover:text-primary`} 
          />
          {!collapsed && (
            <span className="font-medium text-sm">Keluar</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;