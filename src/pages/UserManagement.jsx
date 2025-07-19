import React from 'react';
import { motion } from 'framer-motion';

const UserManagement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-lg font-bold text-dark mb-3">Manajemen User</h1>
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <p className="text-xs text-gray-600">Halaman manajemen pengguna akan segera tersedia.</p>
      </div>
    </motion.div>
  );
};

export default UserManagement;