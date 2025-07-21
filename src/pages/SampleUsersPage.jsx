import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import sampleUsers from '../assets/sampleUsers';
import supabase from '../lib/supabase';

const { FiUser, FiCopy, FiCheck, FiRefreshCw } = FiIcons;

const SampleUsersPage = () => {
  const [copiedField, setCopiedField] = useState(null);
  const [isCreatingUsers, setIsCreatingUsers] = useState(false);
  const [creationStatus, setCreationStatus] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const createSampleUsers = async () => {
    setIsCreatingUsers(true);
    setCreationStatus('Creating sample users...');

    try {
      for (const [role, user] of Object.entries(sampleUsers)) {
        try {
          // Check if user exists
          const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers({
            filters: { email: user.email }
          });
          
          if (checkError) {
            // If admin API not available, try to sign in instead to check if user exists
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: user.email,
              password: user.password
            });
            
            if (!signInError) {
              setCreationStatus(prev => prev + `\nUser ${user.email} already exists`);
              continue;
            }
          } else if (existingUsers?.users?.length > 0) {
            setCreationStatus(prev => prev + `\nUser ${user.email} already exists`);
            continue;
          }

          // Create user
          const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
              data: {
                full_name: user.name,
                role: role
              }
            }
          });

          if (error) {
            if (error.message.includes('already registered')) {
              setCreationStatus(prev => prev + `\nUser ${user.email} already exists`);
              continue;
            }
            throw error;
          }

          setCreationStatus(prev => prev + `\nCreated user ${user.email}`);

          // Create profile
          if (data?.user?.id) {
            const { error: profileError } = await supabase
              .from('user_profiles_xyz123')
              .insert([{
                id: data.user.id,
                full_name: user.name,
                role: role,
                created_at: new Date()
              }]);

            if (profileError) {
              setCreationStatus(prev => prev + `\nError creating profile for ${user.email}: ${profileError.message}`);
            }
          }
        } catch (err) {
          setCreationStatus(prev => prev + `\nError with ${user.email}: ${err.message}`);
        }
      }

      setCreationStatus(prev => prev + '\nSample users creation completed');
    } catch (err) {
      setCreationStatus(prev => prev + `\nUnexpected error: ${err.message}`);
    } finally {
      setIsCreatingUsers(false);
    }
  };

  const renderUserCard = (user, key) => {
    const roleColors = {
      superadmin: 'bg-red-100 text-red-800',
      admin_sekolah: 'bg-blue-100 text-blue-800',
      guru: 'bg-green-100 text-green-800',
      orang_tua: 'bg-yellow-100 text-yellow-800'
    };

    const roleLabels = {
      superadmin: 'Super Admin',
      admin_sekolah: 'Admin Sekolah',
      guru: 'Guru',
      orang_tua: 'Orang Tua'
    };

    const fieldId = `${key}-${user.email}`;

    return (
      <motion.div
        key={key}
        className="bg-white rounded-xl shadow-sm border overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Object.keys(sampleUsers).indexOf(key) * 0.1, duration: 0.3 }}
      >
        <div className="border-b px-4 py-3 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-dark">{user.name}</h3>
              <div className="flex items-center mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[user.role]}`}>
                  {roleLabels[user.role]}
                </span>
                {user.school && (
                  <span className="text-xs text-gray-500 ml-2">{user.school}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-600 mb-3">{user.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-700">Email</p>
                <p className="text-sm text-dark">{user.email}</p>
              </div>
              <button
                onClick={() => copyToClipboard(user.email, `${fieldId}-email`)}
                className="text-primary p-1.5 hover:bg-primary hover:bg-opacity-10 rounded-md transition-colors"
                title="Copy email"
              >
                <SafeIcon
                  icon={copiedField === `${fieldId}-email` ? FiCheck : FiCopy}
                  className={`w-4 h-4 ${copiedField === `${fieldId}-email` ? 'text-green-500' : ''}`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-700">Password</p>
                <p className="text-sm text-dark">{user.password}</p>
              </div>
              <button
                onClick={() => copyToClipboard(user.password, `${fieldId}-password`)}
                className="text-primary p-1.5 hover:bg-primary hover:bg-opacity-10 rounded-md transition-colors"
                title="Copy password"
              >
                <SafeIcon
                  icon={copiedField === `${fieldId}-password` ? FiCheck : FiCopy}
                  className={`w-4 h-4 ${copiedField === `${fieldId}-password` ? 'text-green-500' : ''}`}
                />
              </button>
            </div>
            {user.children && (
              <div>
                <p className="text-xs font-medium text-gray-700 mt-2">Anak</p>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-1">
                  {user.children.map((child, index) => (
                    <li key={index}>{child}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-lg font-bold text-dark mb-1">Akun Demo</h1>
          <p className="text-xs text-gray-600">Gunakan akun berikut untuk menguji aplikasi dengan berbagai peran</p>
        </div>
        <button
          onClick={createSampleUsers}
          disabled={isCreatingUsers}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-primary text-white hover:bg-red-600 transition-colors ${
            isCreatingUsers ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <SafeIcon icon={FiRefreshCw} className={`w-3 h-3 ${isCreatingUsers ? 'animate-spin' : ''}`} />
          <span className="text-xs">Create Sample Users</span>
        </button>
      </motion.div>

      {creationStatus && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gray-50 border rounded-lg p-3 mb-4 overflow-auto max-h-40"
        >
          <pre className="text-xs text-gray-700 whitespace-pre-wrap">{creationStatus}</pre>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(sampleUsers).map(([key, user]) => renderUserCard(user, key))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-xs text-blue-700">
          <strong>Catatan:</strong> Akun-akun ini hanya untuk demonstrasi. Dalam lingkungan produksi, gunakan kredensial yang lebih aman.
        </p>
      </div>
    </div>
  );
};

export default SampleUsersPage;