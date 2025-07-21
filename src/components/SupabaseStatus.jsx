import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import supabase from '../lib/supabase';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiDatabase, FiCheckCircle, FiAlertCircle, FiRefreshCw } = FiIcons;

const SupabaseStatus = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Checking connection...');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log('Checking Supabase connection...');
        // Simple query to check if we can connect to Supabase
        const { data, error } = await supabase
          .from('user_profiles_xyz123')
          .select('count(*)', { count: 'exact', head: true });

        if (error) {
          throw error;
        }
        
        setStatus('connected');
        setMessage(`Connected to Supabase - ${data?.count || 0} users`);
      } catch (error) {
        console.error('Supabase connection error:', error);
        setStatus('error');
        setMessage(`Connection error: ${error.message}`);
        
        // Retry connection up to 3 times
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            setStatus('checking');
            setMessage(`Retrying connection (${retryCount + 1}/3)...`);
          }, 2000);
        }
      }
    };

    checkConnection();
  }, [retryCount]);

  const handleRetry = () => {
    setStatus('checking');
    setMessage('Retrying connection...');
    setRetryCount(0);
  };

  if (status === 'checking') {
    return (
      <motion.div 
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs">{message}</span>
      </motion.div>
    );
  }

  if (status === 'error') {
    return (
      <motion.div 
        className="fixed bottom-4 right-4 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SafeIcon icon={FiAlertCircle} className="w-4 h-4" />
        <span className="text-xs">{message}</span>
        <button 
          onClick={handleRetry} 
          className="ml-2 p-1 rounded hover:bg-red-700"
          title="Retry connection"
        >
          <SafeIcon icon={FiRefreshCw} className="w-3 h-3" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="fixed bottom-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      // Auto-hide after 5 seconds
      animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
      transition={{ duration: 5, times: [0, 0.1, 0.9, 1] }}
    >
      <SafeIcon icon={FiCheckCircle} className="w-4 h-4" />
      <span className="text-xs">{message}</span>
    </motion.div>
  );
};

export default SupabaseStatus;