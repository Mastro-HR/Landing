// src/components/TestAssessmentAnalysis/SectionsNavigation.jsx

import React from 'react';
import PropTypes from 'prop-types';

const SectionsNavigation = ({ sections, activeSection, setActiveSection, language }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    {sections.map((section, idx) => (
      <button
        key={idx}
        onClick={() => setActiveSection(idx)}
        className={`w-full text-left p-4 border-b last:border-0 transition-colors
          ${activeSection === idx 
            ? 'bg-accent-50 border-accent-100' 
            : 'hover:bg-gray-50'}`}
      >
        <h3 className={`font-medium ${
          activeSection === idx ? 'text-accent-900' : 'text-gray-900'
        }`}>
          {section.title}
        </h3>
      </button>
    ))}
  </div>
);

SectionsNavigation.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeSection: PropTypes.number.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default SectionsNavigation;
