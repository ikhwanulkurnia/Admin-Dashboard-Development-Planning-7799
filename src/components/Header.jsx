import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBell, FiSearch } = FiIcons;

const Header = () => {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-dark">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
          />
          <input
            type="text"
            placeholder="Cari..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
          <SafeIcon icon={FiBell} className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;