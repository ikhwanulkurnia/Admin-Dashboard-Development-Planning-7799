import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../auth/AuthContext';

const {
  FiHome,
  FiUsers,
  FiCalendar,
  FiBook,
  FiRotateCcw,
  FiAward,
  FiBarChart3,
  FiFileText,
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiChevronRight,
  FiSearch,
  FiSettings,
  FiLayers,
  FiGrid,
  FiTarget,
  FiBookOpen,
  FiKey,
  FiClipboard,
  FiUserPlus,
  FiUserCheck
} = FiIcons;

const RoleBasedSidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userProfile, hasRole, logout } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  console.log("RoleBasedSidebar rendering with userProfile:", userProfile?.id, "role:", userProfile?.role);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define menu items based on user role
  useEffect(() => {
    if (!userProfile) return;
    console.log("Building menu items for user role:", userProfile.role);
    const items = [];

    // Dashboard - specific to each role
    if (userProfile.role === 'superadmin') {
      items.push({
        path: '/dashboard-superadmin',
        icon: FiHome,
        label: 'Dashboard Super Admin',
        roles: ['superadmin']
      });
    } else if (userProfile.role === 'admin_sekolah') {
      items.push({
        path: '/dashboard-admin',
        icon: FiHome,
        label: 'Dashboard Admin Sekolah',
        roles: ['admin_sekolah']
      });
    } else if (userProfile.role === 'guru') {
      items.push({
        path: '/dashboard-guru',
        icon: FiHome,
        label: 'Dashboard Guru',
        roles: ['guru']
      });
    } else if (userProfile.role === 'orang_tua') {
      items.push({
        path: '/dashboard-orangtua',
        icon: FiHome,
        label: 'Dashboard Orang Tua',
        roles: ['orang_tua']
      });
    }

    // Data Sekolah - for superadmin only
    if (userProfile.role === 'superadmin') {
      items.push({
        path: '/data-sekolah',
        icon: FiLayers,
        label: 'Data Sekolah',
        roles: ['superadmin']
      });
    }

    // Data Kelas - for superadmin and admin_sekolah
    if (['superadmin', 'admin_sekolah'].includes(userProfile.role)) {
      items.push({
        path: '/data-kelas',
        icon: FiGrid,
        label: 'Data Kelas',
        roles: ['superadmin', 'admin_sekolah']
      });
    }

    // Jenis Ujian - for superadmin and admin_sekolah
    if (['superadmin', 'admin_sekolah'].includes(userProfile.role)) {
      items.push({
        path: '/jenis-ujian',
        icon: FiTarget,
        label: 'Jenis Ujian',
        roles: ['superadmin', 'admin_sekolah']
      });
    }

    // Data Siswa - for superadmin, admin_sekolah, and guru
    if (['superadmin', 'admin_sekolah', 'guru'].includes(userProfile.role)) {
      items.push({
        path: '/data-siswa',
        icon: FiUsers,
        label: 'Data Siswa',
        roles: ['superadmin', 'admin_sekolah', 'guru']
      });
    }

    // Hafalan Baru - for all roles
    items.push({
      path: '/hafalan-baru',
      icon: FiBook,
      label: 'Hafalan Baru',
      roles: ['superadmin', 'admin_sekolah', 'guru', 'orang_tua']
    });

    // Murojaah - for all roles
    items.push({
      path: '/murojaah',
      icon: FiRotateCcw,
      label: 'Murojaah',
      roles: ['superadmin', 'admin_sekolah', 'guru', 'orang_tua']
    });

    // Ujian - for superadmin, admin_sekolah, and guru
    if (['superadmin', 'admin_sekolah', 'guru'].includes(userProfile.role)) {
      items.push({
        path: '/ujian',
        icon: FiAward,
        label: 'Ujian',
        roles: ['superadmin', 'admin_sekolah', 'guru']
      });
    }

    // Rekapitulasi Nilai - for superadmin, admin_sekolah, and guru
    if (['superadmin', 'admin_sekolah', 'guru'].includes(userProfile.role)) {
      items.push({
        path: '/rekapitulasi-nilai',
        icon: FiClipboard,
        label: 'Rekapitulasi Nilai',
        roles: ['superadmin', 'admin_sekolah', 'guru']
      });
    }

    // Cetak Raport - for superadmin, admin_sekolah, and guru
    if (['superadmin', 'admin_sekolah', 'guru'].includes(userProfile.role)) {
      items.push({
        path: '/cetak-raport',
        icon: FiFileText,
        label: 'Cetak Raport',
        roles: ['superadmin', 'admin_sekolah', 'guru']
      });
    }

    // Sample Users (for all roles) - at the end of menu
    items.push({
      path: '/sample-users',
      icon: FiKey,
      label: 'Akun Demo',
      roles: ['superadmin', 'admin_sekolah', 'guru', 'orang_tua']
    });

    console.log("Final menu items:", items);
    setMenuItems(items);
  }, [userProfile]);

  // Sample company list
  const companies = [
    { id: 1, name: 'SD Islam Al-Azhar', logo: 'TH' },
    { id: 2, name: 'SD Islam Al-Furqan', logo: 'AF' },
    { id: 3, name: 'SD Islam An-Nur', logo: 'AN' },
    { id: 4, name: 'SD Islam Al-Irsyad', logo: 'AI' },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(companySearchTerm.toLowerCase())
  );

  const toggleSubmenu = (key) => {
    if (collapsed) return;
    setOpenSubmenu(openSubmenu === key ? null : key);
  };

  const isSubmenuActive = (submenu) => {
    return submenu?.some(item => location.pathname === item.path);
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out from sidebar...');
      const { error } = await logout();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      console.log('Logout successful, navigating to login');
      // Force navigation to login page with hard refresh
      window.location.href = '/#/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if there's an error, still redirect to login
      window.location.href = '/#/login';
    }
  };

  // If the sidebar is clicked in small screen mode, auto-close it
  const handleSidebarClick = () => {
    if (isSmallScreen && !collapsed) {
      onToggle();
    }
  };

  if (!userProfile) {
    console.log("No user profile available, not rendering sidebar");
    return null; // Don't render sidebar if user profile isn't loaded
  }

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 flex flex-col ${collapsed ? 'w-14' : 'w-56'}`}
      style={{ overflowY: 'auto' }}
      initial={{ x: collapsed ? -200 : 0 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Company Selector */}
      <div className="p-3 border-b relative">
        <button
          onClick={() => !collapsed && setShowCompanyDropdown(!showCompanyDropdown)}
          className="w-full flex items-center space-x-2"
        >
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">TH</span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left">
                <span className="font-bold text-dark text-sm truncate block">Tahfidz App</span>
                <span className="text-xs text-gray-500">SD Islam Al-Azhar</span>
              </div>
              <SafeIcon icon={FiChevronDown} className="w-4 h-4 text-gray-400" />
            </>
          )}
        </button>

        {/* Company Dropdown */}
        {!collapsed && showCompanyDropdown && (
          <motion.div
            className="absolute left-0 right-0 top-full mt-1 bg-white border shadow-lg rounded-lg z-50 mx-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  placeholder="Cari sekolah..."
                  value={companySearchTerm}
                  onChange={(e) => setCompanySearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredCompanies.map((company) => (
                <button
                  key={company.id}
                  className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{company.logo}</span>
                  </div>
                  <span className="text-xs text-dark">{company.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <ul className="space-y-0.5 px-2">
          {menuItems.map((item, index) => {
            // Skip items that don't match the user's role
            if (item.roles && !item.roles.includes(userProfile?.role)) {
              console.log(`Skipping menu item ${item.label || item.key} - user role ${userProfile?.role} not in allowed roles:`, item.roles);
              return null;
            }

            const isActive = location.pathname === item.path;
            return (
              <li key={item.path || index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={handleSidebarClick}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${isActive ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`}
                  >
                    <SafeIcon
                      icon={item.icon}
                      className={`w-4 h-4 ${collapsed ? 'mx-auto' : 'mr-3'} ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`}
                    />
                    {!collapsed && (
                      <motion.span
                        className="font-medium text-xs"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout - Sticky Bottom */}
      <div className="border-t p-3 sticky bottom-0 bg-white">
        {!collapsed && userProfile && (
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-dark truncate">{userProfile.full_name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {userProfile.role === 'superadmin'
                    ? 'Super Admin'
                    : userProfile.role === 'admin_sekolah'
                      ? 'Admin Sekolah'
                      : userProfile.role === 'guru'
                        ? 'Guru'
                        : 'Orang Tua'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 group"
        >
          <SafeIcon
            icon={FiLogOut}
            className={`w-4 h-4 ${collapsed ? 'mx-auto' : 'mr-3'} group-hover:text-primary`}
          />
          {!collapsed && <span className="font-medium text-xs">Keluar</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default RoleBasedSidebar;