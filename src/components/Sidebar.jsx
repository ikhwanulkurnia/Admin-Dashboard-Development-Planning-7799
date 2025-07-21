import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { 
  FiHome, FiUsers, FiCalendar, FiBook, FiRotateCcw, FiAward,
  FiBarChart3, FiFileText, FiLogOut, FiMenu, FiUser, 
  FiChevronDown, FiChevronRight
} = FiIcons;

const Sidebar = ({ collapsed, onToggle, currentUser }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    { 
      path: '/dashboard', 
      icon: FiHome, 
      label: 'Dashboard' 
    },
    { 
      path: '/data-siswa', 
      icon: FiUsers, 
      label: 'Data Siswa' 
    },
    { 
      path: '/absensi-siswa', 
      icon: FiCalendar, 
      label: 'Absensi Siswa' 
    },
    { 
      path: '/hafalan-baru', 
      icon: FiBook, 
      label: 'Hafalan Baru' 
    },
    { 
      path: '/murojaah', 
      icon: FiRotateCcw, 
      label: 'Murojaah' 
    },
    { 
      path: '/ujian-tahfidz', 
      icon: FiAward, 
      label: 'Ujian Tahfidz' 
    },
    {
      key: 'statistik',
      icon: FiBarChart3,
      label: 'Statistik',
      submenu: [
        { path: '/statistik/pekanan', label: 'Pekanan' },
        { path: '/statistik/bulanan', label: 'Bulanan' },
        { path: '/statistik/semesteran', label: 'Semesteran' },
        { path: '/statistik/tahunan', label: 'Tahunan' }
      ]
    },
    {
      key: 'rapor-tahfidz',
      icon: FiFileText,
      label: 'Rapor Tahfidz',
      submenu: [
        { path: '/rapor-tahfidz/rekapitulasi-nilai', label: 'Rekapitulasi Nilai' },
        { path: '/rapor-tahfidz/cetak-rapor', label: 'Cetak Rapor' }
      ]
    }
  ];

  const toggleSubmenu = (key) => {
    if (collapsed) return;
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  const isSubmenuActive = (submenu) => {
    return submenu?.some(item => location.pathname === item.path);
  };

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ${
        collapsed ? 'w-14' : 'w-56'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        {!collapsed && (
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">TH</span>
            </div>
            <span className="font-bold text-dark text-sm">Tahfidz App</span>
          </motion.div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiMenu} className="w-4 h-4 text-dark" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {menuItems.map((item, index) => {
            if (item.submenu) {
              const isActive = isSubmenuActive(item.submenu);
              const isOpen = openSubmenu === item.key;
              
              return (
                <li key={item.key}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => toggleSubmenu(item.key)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${
                        isActive 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}
                    >
                      <SafeIcon 
                        icon={item.icon} 
                        className={`w-4 h-4 ${collapsed ? 'mx-auto' : 'mr-3'} ${
                          isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'
                        }`} 
                      />
                      {!collapsed && (
                        <>
                          <span className="font-medium text-xs flex-1 text-left">
                            {item.label}
                          </span>
                          <SafeIcon 
                            icon={isOpen ? FiChevronDown : FiChevronRight} 
                            className={`w-3 h-3 transition-transform ${
                              isActive ? 'text-white' : 'text-gray-400'
                            }`} 
                          />
                        </>
                      )}
                    </button>
                    
                    {!collapsed && isOpen && (
                      <motion.div 
                        className="ml-4 mt-1 space-y-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.submenu.map((subItem) => {
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`flex items-center px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                                isSubActive 
                                  ? 'bg-primary bg-opacity-10 text-primary font-medium' 
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                              }`}
                            >
                              <div className={`w-1 h-1 rounded-full mr-2 ${
                                isSubActive ? 'bg-primary' : 'bg-gray-400'
                              }`}></div>
                              <span>{subItem.label}</span>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </motion.div>
                </li>
              );
            } else {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${
                        isActive 
                          ? 'bg-primary text-white shadow-md' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}
                    >
                      <SafeIcon 
                        icon={item.icon} 
                        className={`w-4 h-4 ${collapsed ? 'mx-auto' : 'mr-3'} ${
                          isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'
                        }`} 
                      />
                      {!collapsed && (
                        <motion.span 
                          className="font-medium text-xs"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                </li>
              );
            }
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="border-t p-3">
        {!collapsed && (
          <motion.div 
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-dark truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
        <button className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 group">
          <SafeIcon 
            icon={FiLogOut} 
            className={`w-4 h-4 ${collapsed ? 'mx-auto' : 'mr-3'} group-hover:text-primary`} 
          />
          {!collapsed && (
            <span className="font-medium text-xs">Keluar</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;