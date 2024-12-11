import React from 'react';

const HeroSection = ({ children }) => {
  return (
    <div className="relative min-h-screen pt-24 overflow-hidden">
      {children}
    </div>
  );
};

export default HeroSection;