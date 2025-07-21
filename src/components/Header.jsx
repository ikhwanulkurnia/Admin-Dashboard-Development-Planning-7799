import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBell, FiSearch, FiMenu, FiUser, FiSettings, FiLogOut } = FiIcons;

const Header = ({ onToggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <motion.header 
      className="bg-white shadow-sm border-b px-5 py-3 flex items-center justify-between sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <SafeIcon icon={FiMenu} className="w-4 h-4 text-dark" />
        </button>
        <h1 className="text-lg font-semibold text-dark">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        {/* Search */}
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" 
          />
          <input 
            type="text" 
            placeholder="Cari..." 
            className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
          />
        </div>

        {/* Notifications */}
        <button className="relative p-1.5 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
          <SafeIcon icon={FiBell} className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full"></span>
        </button>

        {/* Profile Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium text-dark">Ahmad Fauzi</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <motion.div 
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button className="w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 flex items-center">
                <SafeIcon icon={FiUser} className="w-3 h-3 mr-2" />
                Profile
              </button>
              <button className="w-full px-4 py-2 text-xs text-left text-gray-700 hover:bg-gray-50 flex items-center">
                <SafeIcon icon={FiSettings} className="w-3 h-3 mr-2" />
                Settings
              </button>
              <div className="border-t my-1"></div>
              <button className="w-full px-4 py-2 text-xs text-left text-red-600 hover:bg-gray-50 flex items-center">
                <SafeIcon icon={FiLogOut} className="w-3 h-3 mr-2" />
                Keluar
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;