import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBell, FiSearch } = FiIcons;

const Header = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b px-5 py-3 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3">
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
      </div>
    </motion.header>
  );
};

export default Header;