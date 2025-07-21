import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {
  FiHome,
  FiUsers,
  FiBook,
  FiRotateCcw,
  FiAward,
  FiBarChart3,
  FiFileText,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiSearch,
  FiLayers,
  FiGrid,
  FiTarget,
  FiClipboard
} = FiIcons;

const Sidebar = ({ collapsed, currentUser }) => {
  const location = useLocation();
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companySearchTerm, setCompanySearchTerm] = useState('');

  // Sample company list
  const companies = [
    { id: 1, name: 'SD Islam Al-Azhar', logo: 'TH' },
    { id: 2, name: 'SD Islam Al-Furqan', logo: 'AF' },
    { id: 3, name: 'SD Islam An-Nur', logo: 'AN' },
    { id: 4, name: 'SD Islam Al-Irsyad', logo: 'AI' },
  ];

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(companySearchTerm.toLowerCase())
  );

  const menuItems = [
    { path: '/dashboard-superadmin', icon: FiHome, label: 'Dashboard Super Admin' },
    { path: '/dashboard-admin', icon: FiHome, label: 'Dashboard Admin Sekolah' },
    { path: '/dashboard-guru', icon: FiHome, label: 'Dashboard Guru' },
    { path: '/dashboard-orangtua', icon: FiHome, label: 'Dashboard Orang Tua' },
    { path: '/data-sekolah', icon: FiLayers, label: 'Data Sekolah' },
    { path: '/data-kelas', icon: FiGrid, label: 'Data Kelas' },
    { path: '/jenis-ujian', icon: FiTarget, label: 'Jenis Ujian' },
    { path: '/data-siswa', icon: FiUsers, label: 'Data Siswa' },
    { path: '/hafalan-baru', icon: FiBook, label: 'Hafalan Baru' },
    { path: '/murojaah', icon: FiRotateCcw, label: 'Murojaah' },
    { path: '/ujian', icon: FiAward, label: 'Ujian' },
    { path: '/rekapitulasi-nilai', icon: FiClipboard, label: 'Rekapitulasi Nilai' },
    { path: '/cetak-raport', icon: FiFileText, label: 'Cetak Raport' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 flex flex-col ${collapsed ? 'w-14' : 'w-56'}`}>
      {/* Company Selector */}
      <div className="p-3 border-b relative">
        <button
          onClick={() => !collapsed && setShowCompanyDropdown(!showCompanyDropdown)}
          className="w-full flex items-center space-x-2"
        >
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">TH</span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left">
                <span className="font-bold text-dark text-sm truncate block">Tahfidz App</span>
                <span className="text-xs text-gray-500">SD Islam Al-Azhar</span>
              </div>
              <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
            </>
          )}
        </button>

        {/* Company Dropdown */}
        {!collapsed && showCompanyDropdown && (
          <motion.div
            className="absolute left-0 right-0 top-full mt-1 bg-white border shadow-lg rounded-lg z-50 mx-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Cari sekolah..."
                  value={companySearchTerm}
                  onChange={(e) => setCompanySearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{company.logo}</span>
                  </div>
                  <span className="text-xs text-dark">{company.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <ul className="space-y-0.5 px-2">
          {menuItems.map((item, index) => {
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
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
                  >
                    <SafeIcon
                      icon={item.icon}
                      className={`w-4 h-4 ${collapsed ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`}
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
          })}
        </ul>
      </nav>

      {/* User Profile & Logout - Sticky Bottom */}
      <div className="border-t p-3 sticky bottom-0 bg-white">
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
    </div>
  );
};

export default Sidebar;