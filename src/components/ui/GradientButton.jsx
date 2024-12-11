// src/components/ui/GradientButton.jsx
import React from 'react';

const GradientButton = ({ children, className = '', ...props }) => (
  <button
    className={`relative overflow-hidden group px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 
    bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
    text-white shadow-lg hover:shadow-xl ${className}`}
    {...props}
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 
    group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
);

export default GradientButton;
