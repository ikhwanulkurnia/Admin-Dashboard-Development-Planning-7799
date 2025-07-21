import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter } = FiIcons;

const ParentData = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample parent data
  const parents = [
    {
      id: 1,
      name: 'Budi Santoso',
      phone: '081234567890',
      email: 'budi@example.com',
      occupation: 'Wiraswasta',
      address: 'Jl. Melati No. 10, Jakarta',
      children: ['Ahmad Rizki']
    },
    {
      id: 2,
      name: 'Joko Widodo',
      phone: '081298765432',
      email: 'joko@example.com',
      occupation: 'PNS',
      address: 'Jl. Anggrek No. 15, Jakarta',
      children: ['Siti Nurhayati']
    },
    {
      id: 3,
      name: 'Agus Hermawan',
      phone: '081345678901',
      email: 'agus@example.com',
      occupation: 'Dokter',
      address: 'Jl. Dahlia No. 8, Jakarta',
      children: ['Muhammad Iqbal']
    },
    {
      id: 4,
      name: 'Bambang Sutrisno',
      phone: '081456789012',
      email: 'bambang@example.com',
      occupation: 'Pengusaha',
      address: 'Jl. Mawar No. 21, Jakarta',
      children: ['Dewi Lestari']
    }
  ];

  const filteredParents = parents.filter(parent => {
    return parent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           parent.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
           parent.phone.includes(searchTerm);
  });

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-lg font-bold text-dark mb-1">Data Orang Tua</h1>
          <p className="text-xs text-gray-600">Kelola data orang tua siswa dalam sistem</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Orang Tua</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-white p-3 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" 
            />
            <input
              type="text"
              placeholder="Cari orang tua berdasarkan nama, email, atau telepon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Parent List */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Orang Tua
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telepon
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pekerjaan
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anak
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParents.map((parent, index) => (
                <motion.tr
                  key={parent.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{parent.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {parent.phone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {parent.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {parent.occupation}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {parent.children.map((child, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mr-1">
                        {child}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {parent.address}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <SafeIcon icon={FiEye} className="w-3 h-3" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 p-1">
                        <SafeIcon icon={FiEdit} className="w-3 h-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <SafeIcon icon={FiTrash2} className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ParentData;