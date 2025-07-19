import React from 'react';
import { motion } from 'framer-motion';

const BankAccounts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-2xl font-bold text-dark mb-6">Bank Accounts</h1>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-600">Halaman manajemen akun bank akan segera tersedia.</p>
      </div>
    </motion.div>
  );
};

export default BankAccounts;