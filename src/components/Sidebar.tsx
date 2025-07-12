'use client';
import React from "react";
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { name: "Dashboard", icon: "🏠", path: "/" },
  { name: "Teachers", icon: "👥", path: "/teachers" },
  { name: "Schedule", icon: "📅", path: "/schedule" },
  { name: "Settings", icon: "⚙️", path: "/settings" },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
      <div className="text-2xl font-bold mb-8 tracking-tight">Teacher Mangement</div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
                  pathname === item.path 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto text-sm text-gray-400">© 2025 Teacher Management</div>
    </aside>
  );
};

export default Sidebar;