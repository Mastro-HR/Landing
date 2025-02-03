// src/components/TestAssessmentAnalysis/ActiveSectionContent.jsx

import React from 'react';
import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';

const ActiveSectionContent = ({ section, language }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
    <div className="prose prose-slate max-w-none">
      <p className="text-gray-700 whitespace-pre-line">
        {section.content}
      </p>
    </div>
    {section.highlights?.length > 0 && (
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">
          {language === 'it' ? 'Punti Chiave' : 'Key Highlights'}
        </h4>
        <ul className="space-y-2">
          {section.highlights.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <ChevronRight className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

ActiveSectionContent.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default ActiveSectionContent;
