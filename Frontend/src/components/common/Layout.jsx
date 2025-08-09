import React from 'react';
import Navbar from '../common/Navbar';
import HeroSection from '../hero/HeroSection';

const Layout = ({ children, showHero = false }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {showHero && <HeroSection />}
      {children}
    </div>
  );
};

export default Layout;
