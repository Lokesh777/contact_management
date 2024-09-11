import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative">
      <Sidebar />
      <Navbar />
      <div className="ml-64 pt-16 pl-4 pr-4" style={{ paddingTop: '4rem' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
