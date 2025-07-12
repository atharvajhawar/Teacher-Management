'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

interface Teacher {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  status: 'active' | 'inactive';
}

interface Profile {
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  
  const [profile, setProfile] = useState<Profile>({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    phone: '(416) 555-0000',
    avatar: 'A'
  });

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    status: 'active' as const
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('loggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email || !newTeacher.role) {
      alert('Please fill in all required fields');
      return;
    }
    
    const teacher: Teacher = {
      id: Date.now(),
      ...newTeacher
    };
    
    setTeachers([...teachers, teacher]);
    setNewTeacher({
      name: '',
      role: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      status: 'active'
    });
    setShowAddTeacherModal(false);
  };

  const handleProfileUpdate = () => {
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 bg-gray-50 flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'profile', name: 'Profile Settings' },
                  { id: 'teachers', name: 'Teacher Management' },
                  { id: 'system', name: 'System Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({...profile, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={handleProfileUpdate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}

          {/* Teacher Management Tab */}
          {activeTab === 'teachers' && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Teacher Management</h2>
                <button
                  onClick={() => setShowAddTeacherModal(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add New Teacher
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {teacher.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {teacher.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {teacher.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            teacher.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {teacher.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* System Settings Tab */}
          {activeTab === 'system' && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">System Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      Email notifications for new teachers
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      Schedule change notifications
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      Weekly reports
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Display Settings</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      Show teacher avatars
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" defaultChecked />
                      Enable dark mode
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Teacher Modal */}
          {showAddTeacherModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add New Teacher</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Teacher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Role *</label>
                    <input
                      type="text"
                      value={newTeacher.role}
                      onChange={(e) => setNewTeacher({...newTeacher, role: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="e.g., Vocal Teacher"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email *</label>
                    <input
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="teacher@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newTeacher.phone}
                      onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="(416) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <textarea
                      value={newTeacher.address}
                      onChange={(e) => setNewTeacher({...newTeacher, address: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Teacher address"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Birth Date</label>
                    <input
                      type="date"
                      value={newTeacher.birthDate}
                      onChange={(e) => setNewTeacher({...newTeacher, birthDate: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowAddTeacherModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleAddTeacher}
                  >
                    Add Teacher
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 