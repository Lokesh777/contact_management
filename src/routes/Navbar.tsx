import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const pageName = () => {
    switch (location.pathname) {
      case '/contacts':
        return 'Contacts';
      case '/dashboard':
        return 'Dashboard';
      default:
        return 'Map Screen';
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-xl font-bold">{pageName()}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
