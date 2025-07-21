import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiSave, FiInfo } = FiIcons;

const WorkspaceSettings = () => {
  const [workspaceSettings, setWorkspaceSettings] = useState({
    name: 'SD Islam Al-Azhar',
    address: 'Jl. Sisingamangaraja No. 2, Jakarta Selatan',
    phone: '021-7654321',
    email: 'info@sd-alazhar.sch.id',
    website: 'www.sd-alazhar.sch.id',
    principalName: 'Dr. Ahmad Sutanto, M.Pd.',
    academicYear: '2023/2024',
    logo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorkspaceSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-lg font-bold text-dark mb-1">Pengaturan Workspace</h1>
        <p className="text-xs text-gray-600">Konfigurasi informasi sekolah dan workspace</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nama Sekolah
                </label>
                <input
                  type="text"
                  name="name"
                  value={workspaceSettings.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <input
                  type="text"
                  name="address"
                  value={workspaceSettings.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Telepon
                </label>
                <input
                  type="text"
                  name="phone"
                  value={workspaceSettings.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={workspaceSettings.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={workspaceSettings.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nama Kepala Sekolah
                </label>
                <input
                  type="text"
                  name="principalName"
                  value={workspaceSettings.principalName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tahun Ajaran
                </label>
                <input
                  type="text"
                  name="academicYear"
                  value={workspaceSettings.academicYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Logo Sekolah
                </label>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">Logo</span>
                  </div>
                  <input
                    type="file"
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiInfo} className="w-4 h-4 text-blue-500" />
              <p className="text-xs text-gray-600">
                Pengaturan ini akan diterapkan ke seluruh sistem dan mungkin memengaruhi tampilan laporan dan dokumen resmi.
              </p>
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

export default WorkspaceSettings;