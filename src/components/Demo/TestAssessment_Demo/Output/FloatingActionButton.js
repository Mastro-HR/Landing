// src/components/TestAssessmentAnalysis/FloatingActionButton.jsx

import React from 'react';
import { Mail } from 'lucide-react';
import PropTypes from 'prop-types';

const FloatingActionButton = ({ label, onClick }) => (
  <div className="fixed bottom-6 right-6 md:right-8 lg:right-12">
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-accent-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg hover:bg-accent-700 transition-all focus:outline-none"
    >
      <Mail className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  </div>
);

FloatingActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FloatingActionButton;
