import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiSearch, FiMail } = FiIcons;

const MemberSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  
  // Sample member data
  const members = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@school.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2023-05-15 08:30'
    },
    {
      id: 2,
      name: 'Ahmad Fauzi',
      email: 'ahmad@school.com',
      role: 'Teacher',
      status: 'active',
      lastLogin: '2023-05-14 15:45'
    },
    {
      id: 3,
      name: 'Siti Aminah',
      email: 'siti@school.com',
      role: 'Teacher',
      status: 'active',
      lastLogin: '2023-05-15 07:20'
    },
    {
      id: 4,
      name: 'Budi Santoso',
      email: 'budi@school.com',
      role: 'Parent',
      status: 'inactive',
      lastLogin: '2023-05-10 12:15'
    }
  ];

  const roles = ['all', 'Admin', 'Teacher', 'Parent'];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Aktif</span>;
      case 'inactive':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">Non-aktif</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">-</span>;
    }
  };

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
          <h1 className="text-lg font-bold text-dark mb-1">Pengaturan Member</h1>
          <p className="text-xs text-gray-600">Kelola akses pengguna ke sistem</p>
        </div>
        <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
          <SafeIcon icon={FiPlus} className="w-3 h-3" />
          <span>Tambah Member</span>
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
              placeholder="Cari member berdasarkan nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === 'all' ? 'Semua Role' : role}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Member List */}
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
                  Nama
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Login Terakhir
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{member.name}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {member.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(member.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                    {member.lastLogin}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-1" title="Kirim Email">
                        <SafeIcon icon={FiMail} className="w-3 h-3" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 p-1" title="Edit">
                        <SafeIcon icon={FiEdit} className="w-3 h-3" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1" title="Hapus">
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

export default MemberSettings;