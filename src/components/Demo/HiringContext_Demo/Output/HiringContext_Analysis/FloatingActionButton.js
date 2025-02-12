// FloatingActionButton.jsx

import React from 'react';
import { Mail } from 'lucide-react';

const FloatingActionButton = ({ label, onClick }) => {
  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={onClick}
        className="flex items-center gap-2 bg-accent-600 text-white px-6 py-3 rounded-lg shadow-lg
                   hover:bg-accent-700 transition-all focus:outline-none"
        style={{ minHeight: '48px', minWidth: '48px' }} // ensure a good tap target
      >
        <Mail className="w-5 h-5" />
        <span className="hidden sm:inline">{label}</span>
      </button>
    </div>
  );
};

export default FloatingActionButton;
