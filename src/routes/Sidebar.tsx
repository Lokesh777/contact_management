import React, { useState } from 'react';
import { FiMenu, FiX, FiPieChart, FiMap, FiUsers } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 h-[100vh] bg-gray-900 text-white p-4 ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 z-40`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`${isOpen ? 'text-xl' : 'text-sm'} font-bold transition-all duration-300`}>
          {isOpen ? 'Contact Manager' : ''}
        </h1>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      <nav className={`space-y-4 ${isOpen ? '' : 'flex flex-col items-center pt-4'}`}>
        <Link
          to="/dashboard"
          className={`flex items-center px-2 py-3 rounded-lg transition-all duration-300 ${
            isActive('/dashboard') ? 'bg-blue-600' : 'hover:bg-gray-700'
          } ${isOpen ? '' : 'justify-center'}`}
        >
          <FiPieChart size={20} className={`${isOpen ? 'mr-4' : ''}`} />
          {isOpen && 'Dashboard'}
        </Link>
        <Link
          to="/map"
          className={`flex items-center px-2 py-3 rounded-lg transition-all duration-300 ${
            isActive('/map') ? 'bg-blue-600' : 'hover:bg-gray-700'
          } ${isOpen ? '' : 'justify-center'}`}
        >
          <FiMap size={20} className={`${isOpen ? 'mr-4' : ''}`} />
          {isOpen && 'Map'}
        </Link>
        <Link
          to="/contacts"
          className={`flex items-center px-2 py-3 rounded-lg transition-all duration-300 ${
            isActive('/contacts') ? 'bg-blue-600' : 'hover:bg-gray-700'
          } ${isOpen ? '' : 'justify-center'}`}
        >
          <FiUsers size={20} className={`${isOpen ? 'mr-4' : ''}`} />
          {isOpen && 'Contacts'}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
