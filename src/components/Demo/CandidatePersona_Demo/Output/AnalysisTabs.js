// AnalysisTabs.jsx

import React from 'react';

/**
 * Simple tab navigation for "Persona Profile" vs "Reflection Questions"
 */
const AnalysisTabs = ({ activeTab, setActiveTab, language }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        onClick={() => setActiveTab('sections')}
        className={`px-4 py-3 rounded-lg font-medium transition-all ${
          activeTab === 'sections'
            ? 'bg-accent-100 text-accent-700 shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {language === 'it' ? 'Profilo Persona' : 'Persona Profile'}
      </button>

      <button
        onClick={() => setActiveTab('questions')}
        className={`px-4 py-3 rounded-lg font-medium transition-all ${
          activeTab === 'questions'
            ? 'bg-accent-100 text-accent-700 shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {language === 'it' ? 'Domande di Riflessone' : 'Reflection Questions'}
      </button>
    </div>
  );
};

export default AnalysisTabs;
