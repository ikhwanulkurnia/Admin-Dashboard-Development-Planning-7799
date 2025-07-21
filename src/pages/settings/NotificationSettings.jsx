import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiInfo } = FiIcons;

const NotificationSettings = () => {
  const [emailSettings, setEmailSettings] = useState({
    studentAttendance: true,
    teacherAttendance: true,
    newHafalanEntry: true,
    newTahsinEntry: true,
    newAdabEntry: false,
    paymentReminder: true,
    reportCardPublished: true,
    systemUpdates: false
  });

  const [pushSettings, setPushSettings] = useState({
    studentAttendance: true,
    teacherAttendance: false,
    newHafalanEntry: false,
    newTahsinEntry: false,
    newAdabEntry: false,
    paymentReminder: true,
    reportCardPublished: true,
    systemUpdates: true
  });

  const handleEmailChange = (e) => {
    const { name, checked } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePushChange = (e) => {
    const { name, checked } = e.target;
    setPushSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Pengaturan notifikasi berhasil disimpan!');
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Pengaturan Notifikasi</h1>
        <p className="text-xs text-gray-600">Konfigurasi preferensi notifikasi sistem</p>
      </motion.div>

      {/* Settings Form */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiInfo} className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-gray-600">
                Atur preferensi notifikasi yang ingin diterima melalui email dan push notification.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-dark mb-3">Notifikasi Email</h3>
              <div className="space-y-2">
                {Object.entries(emailSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      id={`email-${key}`}
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handleEmailChange}
                      className="h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`email-${key}`} className="ml-2 block text-xs text-gray-700">
                      {getNotificationLabel(key)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-dark mb-3">Push Notifications</h3>
              <div className="space-y-2">
                {Object.entries(pushSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      id={`push-${key}`}
                      type="checkbox"
                      name={key}
                      checked={value}
                      onChange={handlePushChange}
                      className="h-3 w-3 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor={`push-${key}`} className="ml-2 block text-xs text-gray-700">
                      {getNotificationLabel(key)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 text-xs"
              >
                <SafeIcon icon={FiSave} className="w-3 h-3" />
                <span>Simpan Pengaturan</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// Helper function to get readable notification labels
function getNotificationLabel(key) {
  const labels = {
    studentAttendance: 'Kehadiran Siswa',
    teacherAttendance: 'Kehadiran Guru',
    newHafalanEntry: 'Entri Hafalan Baru',
    newTahsinEntry: 'Entri Tahsin Baru',
    newAdabEntry: 'Entri Adab dan Akhlak Baru',
    paymentReminder: 'Pengingat Pembayaran',
    reportCardPublished: 'Raport Dipublikasikan',
    systemUpdates: 'Pembaruan Sistem'
  };
  
  return labels[key] || key;
}

export default NotificationSettings;