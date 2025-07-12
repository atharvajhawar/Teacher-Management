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
  status: 'active' | 'inactive';
}

const mockTeachers: Teacher[] = [
  { id: 1, name: "Alynia Allan", role: "Vocal Teacher", email: "alynia@example.com", phone: "(416) 648-9057", status: "active" },
  { id: 2, name: "John Smith", role: "Piano Teacher", email: "john@example.com", phone: "(416) 555-0123", status: "active" },
  { id: 3, name: "Sarah Johnson", role: "Guitar Teacher", email: "sarah@example.com", phone: "(416) 555-0456", status: "inactive" },
  { id: 4, name: "Mike Davis", role: "Drum Teacher", email: "mike@example.com", phone: "(416) 555-0789", status: "active" },
];

// Local Storage Keys
const STORAGE_KEYS = {
  TEACHERS: 'teachers_list',
};

// Helper functions for localStorage
const saveToStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const loadFromStorage = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
};

export default function TeachersPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>(() => 
    loadFromStorage(STORAGE_KEYS.TEACHERS, mockTeachers)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState<{
    name: string;
    role: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
  }>({
    name: '',
    role: '',
    email: '',
    phone: '',
    status: 'active'
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('loggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // Save teachers to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TEACHERS, teachers);
  }, [teachers]);

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
      status: 'active'
    });
    setShowAddModal(false);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setShowEditModal(true);
  };

  const handleUpdateTeacher = () => {
    if (!editingTeacher || !editingTeacher.name || !editingTeacher.email || !editingTeacher.role) {
      alert('Please fill in all required fields');
      return;
    }
    
    setTeachers(teachers.map(teacher => 
      teacher.id === editingTeacher.id ? editingTeacher : teacher
    ));
    setEditingTeacher(null);
    setShowEditModal(false);
  };

  const handleDeleteTeacher = (teacherId: number) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 bg-gray-50 flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Teachers</h1>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Search teachers..."
                className="px-4 py-2 border rounded-lg flex-1 max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Teacher
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{teacher.phone}</div>
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
                      <button 
                        onClick={() => handleEditTeacher(teacher)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Teacher Modal */}
          {showAddModal && (
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
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <select
                      value={newTeacher.status}
                      onChange={(e) => setNewTeacher({...newTeacher, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowAddModal(false)}
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

          {/* Edit Teacher Modal */}
          {showEditModal && editingTeacher && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Edit Teacher</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Name *</label>
                    <input
                      type="text"
                      value={editingTeacher.name}
                      onChange={(e) => setEditingTeacher({...editingTeacher, name: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Teacher name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Role *</label>
                    <input
                      type="text"
                      value={editingTeacher.role}
                      onChange={(e) => setEditingTeacher({...editingTeacher, role: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="e.g., Vocal Teacher"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email *</label>
                    <input
                      type="email"
                      value={editingTeacher.email}
                      onChange={(e) => setEditingTeacher({...editingTeacher, email: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="teacher@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editingTeacher.phone}
                      onChange={(e) => setEditingTeacher({...editingTeacher, phone: e.target.value})}
                      className="w-full border rounded px-3 py-2"
                      placeholder="(416) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Status</label>
                    <select
                      value={editingTeacher.status}
                      onChange={(e) => setEditingTeacher({...editingTeacher, status: e.target.value as 'active' | 'inactive'})}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingTeacher(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleUpdateTeacher}
                  >
                    Update Teacher
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