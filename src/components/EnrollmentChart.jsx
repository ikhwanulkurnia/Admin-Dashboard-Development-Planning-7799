import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EnrollmentChart = () => {
  const [filters, setFilters] = useState({
    period: 'Daily',
    category: 'All Categories',
    type: 'All Types',
    course: 'All Courses'
  });

  // Sample data - in real app this would come from API
  const data = [
    { name: 'Sen', enrollments: 45 },
    { name: 'Sel', enrollments: 52 },
    { name: 'Rab', enrollments: 38 },
    { name: 'Kam', enrollments: 61 },
    { name: 'Jum', enrollments: 55 },
    { name: 'Sab', enrollments: 67 },
    { name: 'Min', enrollments: 43 },
  ];

  const filterOptions = {
    period: ['Daily', 'Weekly', 'Monthly'],
    category: ['All Categories', 'Programming', 'Design', 'Marketing', 'Business'],
    type: ['All Types', 'Online', 'Offline', 'Hybrid'],
    course: ['All Courses', 'React Development', 'UI/UX Design', 'Digital Marketing']
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-sm border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-dark mb-3">Enrollment Analytics</h3>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {Object.entries(filterOptions).map(([key, options]) => (
            <select
              key={key}
              value={filters[key]}
              onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
              className="px-2 py-1 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#666' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="enrollments" 
              stroke="#FFA726" 
              strokeWidth={2}
              dot={{ fill: '#FFA726', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: '#FFA726', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default EnrollmentChart;