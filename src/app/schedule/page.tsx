'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = [
  "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", 
  "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm"
];

interface Teacher {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface ScheduleEvent {
  id: number;
  teacher: string;
  student: string;
  time: string;
  day: string;
  type: 'lesson' | 'practice' | 'meeting';
}

const mockEvents: ScheduleEvent[] = [
  { id: 1, teacher: "Alynia Allan", student: "Emma Wilson", time: "9:00am", day: "Monday", type: "lesson" },
  { id: 2, teacher: "John Smith", student: "Alex Johnson", time: "2:00pm", day: "Tuesday", type: "lesson" },
  { id: 3, teacher: "Sarah Johnson", student: "Mike Brown", time: "4:00pm", day: "Wednesday", type: "practice" },
];

// Local Storage Keys
const STORAGE_KEYS = {
  SCHEDULE_EVENTS: 'schedule_events',
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

export default function SchedulePage() {
  const router = useRouter();
  const [events, setEvents] = useState<ScheduleEvent[]>(() => 
    loadFromStorage(STORAGE_KEYS.SCHEDULE_EVENTS, mockEvents)
  );
  const [teachers, setTeachers] = useState<Teacher[]>(() => 
    loadFromStorage(STORAGE_KEYS.TEACHERS, [])
  );
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    teacher: string;
    student: string;
    day: string;
    time: string;
    type: 'lesson' | 'practice' | 'meeting';
  }>({
    teacher: '',
    student: '',
    day: 'Monday',
    time: '9:00am',
    type: 'lesson'
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('loggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // Save events to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SCHEDULE_EVENTS, events);
  }, [events]);

  const getEventsForDay = (day: string) => {
    return events.filter(event => event.day === day);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-800';
      case 'practice': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.teacher || !newEvent.student) {
      alert('Please fill in all required fields');
      return;
    }
    
    const event: ScheduleEvent = {
      id: Date.now(),
      ...newEvent
    };
    
    setEvents([...events, event]);
    setNewEvent({
      teacher: '',
      student: '',
      day: 'Monday',
      time: '9:00am',
      type: 'lesson'
    });
    setShowAddEventModal(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8 bg-gray-50 flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Schedule</h1>
            <div className="flex gap-4 mb-6">
              <button 
                onClick={() => setShowAddEventModal(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Event
              </button>
            </div>
          </div>

          {/* Day Selector */}
          <div className="mb-6">
            <div className="flex space-x-2 overflow-x-auto">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Grid */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="grid grid-cols-8 border-b">
              <div className="p-4 font-medium text-gray-500">Time</div>
              {days.map(day => (
                <div key={day} className="p-4 font-medium text-gray-500 text-center">
                  {day}
                </div>
              ))}
            </div>
            
            {times.map(time => (
              <div key={time} className="grid grid-cols-8 border-b last:border-b-0">
                <div className="p-4 text-sm text-gray-600 border-r">
                  {time}
                </div>
                {days.map(day => {
                  const dayEvents = events.filter(event => 
                    event.day === day && event.time === time
                  );
                  return (
                    <div key={day} className="p-2 border-r last:border-r-0 min-h-[60px]">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          className={`p-2 rounded text-xs mb-1 ${getEventTypeColor(event.type)}`}
                        >
                          <div className="font-medium">{event.teacher}</div>
                          <div className="text-xs opacity-75">{event.student}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Events List for Selected Day */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Events for {selectedDay}</h2>
            <div className="bg-white rounded-xl shadow">
              {getEventsForDay(selectedDay).length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No events scheduled for {selectedDay}
                </div>
              ) : (
                <div className="divide-y">
                  {getEventsForDay(selectedDay).map(event => (
                    <div key={event.id} className="p-4 flex justify-between items-center">
                      <div>
                        <div className="font-medium">{event.teacher} → {event.student}</div>
                        <div className="text-sm text-gray-600">{event.time} • {event.type}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Event Modal */}
          {showAddEventModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Teacher *</label>
                    <select 
                      className="w-full border rounded px-3 py-2"
                      value={newEvent.teacher}
                      onChange={(e) => setNewEvent({...newEvent, teacher: e.target.value})}
                    >
                      <option value="">Select a teacher</option>
                      {teachers.filter(teacher => teacher.status === 'active').map(teacher => (
                        <option key={teacher.id} value={teacher.name}>
                          {teacher.name} - {teacher.role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Student *</label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Student name"
                      value={newEvent.student}
                      onChange={(e) => setNewEvent({...newEvent, student: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Day</label>
                      <select 
                        className="w-full border rounded px-3 py-2"
                        value={newEvent.day}
                        onChange={(e) => setNewEvent({...newEvent, day: e.target.value})}
                      >
                        {days.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Time</label>
                      <select 
                        className="w-full border rounded px-3 py-2"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                      >
                        {times.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Type</label>
                    <select 
                      className="w-full border rounded px-3 py-2"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({...newEvent, type: e.target.value as 'lesson' | 'practice' | 'meeting'})}
                    >
                      <option value="lesson">Lesson</option>
                      <option value="practice">Practice</option>
                      <option value="meeting">Meeting</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setShowAddEventModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={handleAddEvent}
                  >
                    Add Event
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