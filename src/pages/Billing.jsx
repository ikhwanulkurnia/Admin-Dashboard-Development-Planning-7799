import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiPlus, FiDownload, FiDollarSign, FiEye, FiEdit } = FiIcons;

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Sample billing data
  const billingData = [
    {
      id: 1,
      student: 'Ahmad Rizki',
      nis: '2021001',
      class: '7A',
      invoiceNo: 'INV-2023-0001',
      description: 'SPP Bulan Januari 2023',
      amount: 1200000,
      dueDate: '2023-01-10',
      status: 'paid',
      paidDate: '2023-01-08'
    },
    {
      id: 2,
      student: 'Ahmad Rizki',
      nis: '2021001',
      class: '7A',
      invoiceNo: 'INV-2023-0002',
      description: 'SPP Bulan Februari 2023',
      amount: 1200000,
      dueDate: '2023-02-10',
      status: 'paid',
      paidDate: '2023-02-07'
    },
    {
      id: 3,
      student: 'Siti Nurhayati',
      nis: '2021002',
      class: '7A',
      invoiceNo: 'INV-2023-0003',
      description: 'SPP Bulan Januari 2023',
      amount: 1200000,
      dueDate: '2023-01-10',
      status: 'paid',
      paidDate: '2023-01-05'
    },
    {
      id: 4,
      student: 'Muhammad Iqbal',
      nis: '2021003',
      class: '7B',
      invoiceNo: 'INV-2023-0004',
      description: 'SPP Bulan Januari 2023',
      amount: 1200000,
      dueDate: '2023-01-10',
      status: 'unpaid',
      paidDate: '-'
    }
  ];

  const classes = ['all', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
  const statuses = ['all', 'paid', 'unpaid', 'overdue'];

  const filteredBillings = billingData.filter(billing => {
    const matchesSearch = billing.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         billing.nis.includes(searchTerm) ||
                         billing.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || billing.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || billing.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Lunas</span>;
      case 'unpaid':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Belum Lunas</span>;
      case 'overdue':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">Terlambat</span>;
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
          <h1 className="text-lg font-bold text-dark mb-1">Tagihan Siswa</h1>
          <p className="text-xs text-gray-600">Kelola tagihan dan pembayaran siswa</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
            <SafeIcon icon={FiPlus} className="w-3 h-3" />
            <span>Buat Tagihan</span>
          </button>
          <button className="bg-gray-500 text-white px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-1.5 text-xs">
            <SafeIcon icon={FiDownload} className="w-3 h-3" />
            <span>Export</span>
          </button>
        </div>
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
              placeholder="Cari siswa, NIS, atau nomor invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {classes.map(classOption => (
              <option key={classOption} value={classOption}>
                {classOption === 'all' ? 'Semua Kelas' : `Kelas ${classOption}`}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'Semua Status' : 
                  status === 'paid' ? 'Lunas' : 
                  status === 'unpaid' ? 'Belum Lunas' : 'Terlambat'}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Billing List */}
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
                  No. Invoice
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIS
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jatuh Tempo
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Bayar
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBillings.map((billing, index) => (
                <motion.tr
                  key={billing.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {billing.invoiceNo}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{billing.student}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {billing.nis}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {billing.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {billing.description}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-dark">
                    {formatCurrency(billing.amount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {billing.dueDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(billing.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {billing.paidDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-1" title="Lihat Detail">
                        <SafeIcon icon={FiEye} className="w-3 h-3" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 p-1" title="Edit">
                        <SafeIcon icon={FiEdit} className="w-3 h-3" />
                      </button>
                      {billing.status === 'unpaid' && (
                        <button className="text-green-600 hover:text-green-800 p-1" title="Catat Pembayaran">
                          <SafeIcon icon={FiDollarSign} className="w-3 h-3" />
                        </button>
                      )}
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

export default Billing;