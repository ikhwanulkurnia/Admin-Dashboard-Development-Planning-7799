/**
 * Sample Users for Tahfidz App
 * 
 * This file contains sample user data for all roles in the application.
 * Use these credentials to login and test different permission levels.
 */

const sampleUsers = {
  superadmin: {
    email: 'superadmin@tahfidz.app',
    password: 'Super@dmin123',
    name: 'Ahmad Superviser',
    role: 'superadmin',
    description: 'Super Administrator dengan akses penuh ke seluruh sistem'
  },
  admin_sekolah: {
    email: 'admin@sdit-alazhar.sch.id',
    password: 'Admin@123',
    name: 'Budi Santoso',
    role: 'admin_sekolah',
    school: 'SD Islam Al-Azhar',
    description: 'Administrator Sekolah dengan akses pengelolaan data sekolah'
  },
  guru: {
    email: 'guru@sdit-alazhar.sch.id',
    password: 'Guru@123',
    name: 'Siti Aminah',
    role: 'guru',
    school: 'SD Islam Al-Azhar',
    subject: 'Tahfidz Al-Quran',
    description: 'Guru dengan akses ke data siswa dan pencatatan hafalan'
  },
  orang_tua: {
    email: 'orangtua@gmail.com',
    password: 'Ortu@123',
    name: 'Joko Widodo',
    role: 'orang_tua',
    children: ['Ahmad Farhan (Kelas 7A)'],
    description: 'Orang tua dengan akses ke laporan perkembangan anak'
  }
};

export default sampleUsers;