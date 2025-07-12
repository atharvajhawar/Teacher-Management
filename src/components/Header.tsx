'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setUserEmail(localStorage.getItem('userEmail'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold text-gray-800">Teacher Management</div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">
          {userEmail ? `Welcome, ${userEmail}` : 'Welcome'}
        </span>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-lg font-semibold text-gray-500">A</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;