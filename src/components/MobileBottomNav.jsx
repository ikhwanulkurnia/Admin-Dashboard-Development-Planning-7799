import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../auth/AuthContext';

const { FiHome, FiUser, FiBook, FiBarChart2, FiMenu } = FiIcons;

const MobileBottomNav = ({ onOpenSidebar }) => {
  const location = useLocation();
  const { userProfile } = useAuth();

  // Define navigation items based on user role
  const getNavItems = () => {
    const items = [
      { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    ];

    if (userProfile?.role === 'admin_sekolah' || userProfile?.role === 'guru') {
      items.push({ path: '/data-siswa', icon: FiUser, label: 'Siswa' });
      items.push({ path: '/hafalan-baru', icon: FiBook, label: 'Hafalan' });
    }

    if (userProfile?.role === 'orang_tua') {
      items.push({ path: '/student-report', icon: FiUser, label: 'Anak' });
    }

    items.push({ path: '/statistik/pekanan', icon: FiBarChart2, label: 'Statistik' });

    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-white border-t flex items-center justify-around z-50 md:hidden">
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center h-full w-full ${
              isActive ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <SafeIcon
              icon={item.icon}
              className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-500'}`}
            />
            <span className="text-xs mt-0.5">{item.label}</span>
          </Link>
        );
      })}
      <button
        onClick={onOpenSidebar}
        className="flex flex-col items-center justify-center h-full w-full text-gray-500"
      >
        <SafeIcon icon={FiMenu} className="w-5 h-5" />
        <span className="text-xs mt-0.5">Menu</span>
      </button>
    </div>
  );
};

export default MobileBottomNav;