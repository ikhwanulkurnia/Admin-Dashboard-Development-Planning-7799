import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter } = FiIcons;

const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample course data
  const courses = [
    {
      id: 1,
      name: 'React Development Fundamentals',
      category: 'Programming',
      price: 299000,
      status: 'active',
      students: 145,
      description: 'Learn the basics of React development from scratch'
    },
    {
      id: 2,
      name: 'UI/UX Design Masterclass',
      category: 'Design',
      price: 399000,
      status: 'active',
      students: 89,
      description: 'Complete guide to modern UI/UX design principles'
    },
    {
      id: 3,
      name: 'Digital Marketing Strategy',
      category: 'Marketing',
      price: 249000,
      status: 'inactive',
      students: 67,
      description: 'Master digital marketing strategies and tactics'
    },
    {
      id: 4,
      name: 'Advanced JavaScript',
      category: 'Programming',
      price: 349000,
      status: 'active',
      students: 203,
      description: 'Deep dive into advanced JavaScript concepts'
    }
  ];

  const categories = ['all', 'Programming', 'Design', 'Marketing', 'Business'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-dark mb-2">Manajemen Kursus</h1>
          <p className="text-gray-600">Kelola semua kursus yang tersedia di platform</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2">
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>Tambah Kursus</span>
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SafeIcon 
              icon={FiSearch} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
            />
            <input
              type="text"
              placeholder="Cari kursus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Semua Kategori' : category}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Course List */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kursus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Siswa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course, index) => (
                <motion.tr
                  key={course.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-dark">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark">
                    Rp {course.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      course.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {course.status === 'active' ? 'Aktif' : 'Non-aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-dark">
                    {course.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 p-1">
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 p-1">
                        <SafeIcon icon={FiEdit} className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 p-1">
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
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

export default CourseManagement;