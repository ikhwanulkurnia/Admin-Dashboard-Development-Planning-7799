import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiPrinter, FiDownload, FiMail } = FiIcons;

const ReportCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('semester1');
  
  // Sample report card data
  const reportCards = [
    {
      id: 1,
      student: 'Ahmad Rizki',
      nis: '2021001',
      class: '7A',
      semester: 'semester1',
      academicGrade: 'A',
      tahfidzGrade: 'A-',
      tahsinGrade: 'A',
      adabGrade: 'A',
      status: 'published',
      publishDate: '2023-12-15'
    },
    {
      id: 2,
      student: 'Siti Nurhayati',
      nis: '2021002',
      class: '7A',
      semester: 'semester1',
      academicGrade: 'A',
      tahfidzGrade: 'B+',
      tahsinGrade: 'A-',
      adabGrade: 'A',
      status: 'published',
      publishDate: '2023-12-15'
    },
    {
      id: 3,
      student: 'Muhammad Iqbal',
      nis: '2021003',
      class: '7B',
      semester: 'semester1',
      academicGrade: 'B+',
      tahfidzGrade: 'B',
      tahsinGrade: 'B+',
      adabGrade: 'A-',
      status: 'draft',
      publishDate: '-'
    },
    {
      id: 4,
      student: 'Dewi Lestari',
      nis: '2021004',
      class: '7B',
      semester: 'semester1',
      academicGrade: 'A-',
      tahfidzGrade: 'A',
      tahsinGrade: 'A-',
      adabGrade: 'A',
      status: 'published',
      publishDate: '2023-12-15'
    }
  ];

  const classes = ['all', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B', '9C'];
  const periods = [
    { id: 'semester1', name: 'Semester 1' },
    { id: 'semester2', name: 'Semester 2' },
    { id: 'yearly', name: 'Tahunan' }
  ];

  const filteredReportCards = reportCards.filter(card => {
    const matchesSearch = card.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         card.nis.includes(searchTerm);
    const matchesClass = selectedClass === 'all' || card.class === selectedClass;
    const matchesPeriod = selectedPeriod === 'all' || card.semester === selectedPeriod;
    return matchesSearch && matchesClass && matchesPeriod;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">Dipublikasi</span>;
      case 'draft':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">-</span>;
    }
  };

  const getGradeBadge = (grade) => {
    switch (grade[0]) {
      case 'A':
        return <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">{grade}</span>;
      case 'B':
        return <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{grade}</span>;
      case 'C':
        return <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">{grade}</span>;
      case 'D':
        return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">{grade}</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{grade}</span>;
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
          <h1 className="text-lg font-bold text-dark mb-1">Cetak Raport</h1>
          <p className="text-xs text-gray-600">Kelola dan cetak raport siswa</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-1.5 text-xs">
            <SafeIcon icon={FiPrinter} className="w-3 h-3" />
            <span>Cetak Semua</span>
          </button>
          <button className="bg-gray-500 text-white px-3 py-1.5 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-1.5 text-xs">
            <SafeIcon icon={FiMail} className="w-3 h-3" />
            <span>Kirim ke Orang Tua</span>
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
              placeholder="Cari siswa atau NIS..."
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
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
          >
            {periods.map(period => (
              <option key={period.id} value={period.id}>{period.name}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Report Card List */}
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
                  NIS
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akademik
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tahfidz
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tahsin
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adab
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Publikasi
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReportCards.map((card, index) => (
                <motion.tr
                  key={card.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {card.nis}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-xs font-medium text-dark">{card.student}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {card.class}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getGradeBadge(card.academicGrade)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getGradeBadge(card.tahfidzGrade)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getGradeBadge(card.tahsinGrade)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getGradeBadge(card.adabGrade)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(card.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-dark">
                    {card.publishDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-1" title="Cetak Raport">
                        <SafeIcon icon={FiPrinter} className="w-3 h-3" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-1" title="Kirim ke Orang Tua">
                        <SafeIcon icon={FiMail} className="w-3 h-3" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 p-1" title="Unduh">
                        <SafeIcon icon={FiDownload} className="w-3 h-3" />
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

export default ReportCards;