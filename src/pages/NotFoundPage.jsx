import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiHome } = FiIcons;

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiSearch} className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2">404</h1>
        <h2 className="text-xl font-semibold text-dark mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-6">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <SafeIcon icon={FiHome} className="w-5 h-5" />
          <span>Kembali ke Dashboard</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;