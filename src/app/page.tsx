'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TeacherDetailsCard from '../components/TeacherDetailsCard';
import ContactInfoCard from '../components/ContactInfoCard';
import QualificationsTable, { Qualification } from '../components/QualificationsTable';
import ScheduleGrid, { Availability } from '../components/ScheduleGrid';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = [
  "all-day", "7:30am", "8am", "8:30am", "9am", "9:30am", "10am", "10:30am", "11am", "11:30am",
  "12pm", "12:30pm", "1pm", "1:30pm", "2pm", "2:30pm", "3pm", "3:30pm", "4pm", "4:30pm", "5pm", "5:30pm", "6pm"
];

function getInitialAvailability(): Availability {
  const avail: Availability = {};
  days.forEach(day => {
    avail[day] = {};
    times.forEach(time => {
      avail[day][time] = false;
    });
  });
  return avail;
}

const initialPrivateQualifications: Qualification[] = [
  { name: "Vocal Contemporary", rate: "$28.00" },
  { name: "Vocal Core", rate: "$28.00" },
  { name: "Vocal Hybrid", rate: "$28.00" },
  { name: "Vocal Plus", rate: "$28.00" },
  { name: "Instrument", rate: "$28.00" },
];

const initialGroupQualifications: Qualification[] = [];

const initialTeacher = {
  name: "Alynia Allan",
  role: "Teacher",
  birthDate: "Jan 1, 1980",
};

// Local Storage Keys
const STORAGE_KEYS = {
  TEACHER: 'teacher_data',
  PRIVATE_QUALIFICATIONS: 'private_qualifications',
  GROUP_QUALIFICATIONS: 'group_qualifications',
  AVAILABILITY: 'availability_data',
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

interface Teacher {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export default function Home() {
  const router = useRouter();
  
  // Load data from localStorage on component mount
  const [privateQualifications, setPrivateQualifications] = useState<Qualification[]>(() => 
    loadFromStorage(STORAGE_KEYS.PRIVATE_QUALIFICATIONS, initialPrivateQualifications)
  );
  const [groupQualifications, setGroupQualifications] = useState<Qualification[]>(() => 
    loadFromStorage(STORAGE_KEYS.GROUP_QUALIFICATIONS, initialGroupQualifications)
  );
  const [availability, setAvailability] = useState<Availability>(() => 
    loadFromStorage(STORAGE_KEYS.AVAILABILITY, getInitialAvailability())
  );
  const [teacher, setTeacher] = useState(() => 
    loadFromStorage(STORAGE_KEYS.TEACHER, initialTeacher)
  );
  const [allTeachers, setAllTeachers] = useState<Teacher[]>(() => 
    loadFromStorage(STORAGE_KEYS.TEACHERS, [])
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'private' | 'group'>('private');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Qualification>({ name: '', rate: '' });
  const [editTeacherModal, setEditTeacherModal] = useState(false);
  const [teacherForm, setTeacherForm] = useState(initialTeacher);
  const [teacherFormError, setTeacherFormError] = useState("");
  const [teacherFormSuccess, setTeacherFormSuccess] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('loggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRIVATE_QUALIFICATIONS, privateQualifications);
  }, [privateQualifications]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.GROUP_QUALIFICATIONS, groupQualifications);
  }, [groupQualifications]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.AVAILABILITY, availability);
  }, [availability]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TEACHER, teacher);
  }, [teacher]);

  // Load teachers from localStorage
  useEffect(() => {
    const storedTeachers = loadFromStorage(STORAGE_KEYS.TEACHERS, []);
    setAllTeachers(storedTeachers);
  }, []);

  // Get active teachers
  const activeTeachers = allTeachers.filter(t => t.status === 'active');

  // Handlers for add/edit/delete
  const handleAdd = (type: 'private' | 'group') => {
    setModalType(type);
    setForm({ name: '', rate: '' });
    setEditIndex(null);
    setModalOpen(true);
  };

  const handleEdit = (type: 'private' | 'group', index: number) => {
    setModalType(type);
    setEditIndex(index);
    setForm(
      type === 'private' ? privateQualifications[index] : groupQualifications[index]
    );
    setModalOpen(true);
  };

  const handleDelete = (type: 'private' | 'group', index: number) => {
    if (type === 'private') {
      setPrivateQualifications(qs => qs.filter((_, i) => i !== index));
    } else {
      setGroupQualifications(qs => qs.filter((_, i) => i !== index));
    }
  };

  const handleModalSave = () => {
    if (!form.name.trim() || !form.rate.trim()) return;
    if (editIndex !== null) {
      // Edit
      if (modalType === 'private') {
        setPrivateQualifications(qs =>
          qs.map((q, i) => (i === editIndex ? form : q))
        );
      } else {
        setGroupQualifications(qs =>
          qs.map((q, i) => (i === editIndex ? form : q))
        );
      }
    } else {
      // Add
      if (modalType === 'private') {
        setPrivateQualifications(qs => [...qs, form]);
      } else {
        setGroupQualifications(qs => [...qs, form]);
      }
    }
    setModalOpen(false);
    setEditIndex(null);
    setForm({ name: '', rate: '' });
  };

  const handleToggleAvailability = (day: string, time: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: !prev[day][time],
      },
    }));
  };

  const handleEditTeacher = () => {
    setTeacherForm(teacher);
    setTeacherFormError("");
    setTeacherFormSuccess("");
    setEditTeacherModal(true);
  };

  const handleSaveTeacher = () => {
    if (!teacherForm.name.trim() || !teacherForm.role.trim() || !teacherForm.birthDate.trim()) {
      setTeacherFormError("All fields are required.");
      setTeacherFormSuccess("");
      return;
    }
    setTeacher(teacherForm);
    setTeacherFormSuccess("Saved successfully!");
    setTeacherFormError("");
    setTimeout(() => setEditTeacherModal(false), 1000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 bg-gray-50 flex-1">
          <TeacherDetailsCard
            name={teacher.name}
            role={teacher.role}
            birthDate={teacher.birthDate}
            onEdit={handleEditTeacher}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ContactInfoCard label="Email" value="Alyniaallan@example.com" type="email" />
            <ContactInfoCard label="Phone" value="(416) 648-9057" type="phone" />
            <ContactInfoCard label="Address" value="56 Odoardo Di Santo Cir, North York, Ontario, Canada" type="address" />
          </div>

          {/* Active Teachers Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Active Teachers</h2>
              <button 
                onClick={() => router.push('/teachers')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All →
              </button>
            </div>
            {activeTeachers.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-6 text-center">
                <div className="text-gray-400 mb-2">👥</div>
                <p className="text-gray-500">No active teachers found</p>
                <button 
                  onClick={() => router.push('/teachers')}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Add your first teacher
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTeachers.slice(0, 6).map((teacher) => (
                  <div key={teacher.id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{teacher.name}</h3>
                        <p className="text-sm text-gray-600">{teacher.role}</p>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="text-gray-600">{teacher.email}</div>
                      <div className="text-gray-600">{teacher.phone}</div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <QualificationsTable
            title="Private Qualifications"
            qualifications={privateQualifications}
            onAdd={() => handleAdd('private')}
            onEdit={idx => handleEdit('private', idx)}
            onDelete={idx => handleDelete('private', idx)}
          />
          <QualificationsTable
            title="Group Qualifications"
            qualifications={groupQualifications}
            onAdd={() => handleAdd('group')}
            onEdit={idx => handleEdit('group', idx)}
            onDelete={idx => handleDelete('group', idx)}
          />
          <ScheduleGrid
            availability={availability}
            onToggle={handleToggleAvailability}
          />
        </main>
        {/* Modal for Add/Edit Qualification */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">{editIndex !== null ? 'Edit' : 'Add'} {modalType === 'private' ? 'Private' : 'Group'} Qualification</h2>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Qualification name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Rate ($/hr)</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={form.rate}
                  onChange={e => setForm(f => ({ ...f, rate: e.target.value }))}
                  placeholder="$28.00"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleModalSave}
                  disabled={!form.name.trim() || !form.rate.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modal for Edit Teacher Info */}
        {editTeacherModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Edit Teacher Info</h2>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={teacherForm.name}
                  onChange={e => setTeacherForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Role</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={teacherForm.role}
                  onChange={e => setTeacherForm(f => ({ ...f, role: e.target.value }))}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Birth Date</label>
                <input
                  className="w-full border rounded px-3 py-2"
                  value={teacherForm.birthDate}
                  onChange={e => setTeacherForm(f => ({ ...f, birthDate: e.target.value }))}
                />
              </div>
              {teacherFormError && <div className="text-red-600 mb-2">{teacherFormError}</div>}
              {teacherFormSuccess && <div className="text-green-600 mb-2">{teacherFormSuccess}</div>}
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setEditTeacherModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleSaveTeacher}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 