import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';

const StatCard = ({ title, value, icon, color = 'primary', index = 0 }) => {
  const colorClasses = {
    primary: 'text-primary bg-red-50',
    success: 'text-success bg-green-50',
    warning: 'text-warning bg-orange-50',
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-dark">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <SafeIcon icon={icon} className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;