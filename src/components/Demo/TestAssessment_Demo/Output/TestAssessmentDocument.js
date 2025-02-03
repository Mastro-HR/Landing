// src/components/TestAssessmentAnalysis/TestAssessmentDocument.jsx

import React from 'react';
import PropTypes from 'prop-types';

const TestAssessmentDocument = ({ testAssessment, language }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h1 className="text-3xl font-bold mb-4">{testAssessment.title}</h1>
    <p className="text-lg mb-2"><strong>{language === 'it' ? 'Focus' : 'Focus'}:</strong> {testAssessment.focus}</p>
    <p className="text-lg mb-4"><strong>{language === 'it' ? 'Tempo' : 'Time'}:</strong> {testAssessment.time}</p>
    
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{language === 'it' ? 'Contesto e Sfida' : 'Context and Challenge'}</h2>
      <ul className="list-disc list-inside space-y-1">
        {testAssessment.context_and_challenge.map((item, idx) => (
          <li key={idx} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </section>
    
    <section className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{language === 'it' ? 'Panoramica dell\'Assegnazione' : 'Assignment Overview'}</h2>
      <ul className="list-decimal list-inside space-y-1">
        {testAssessment.assignment_overview.map((item, idx) => (
          <li key={idx} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </section>
    
    <section>
      <h2 className="text-2xl font-semibold mb-2">{language === 'it' ? 'Formato' : 'Format'}</h2>
      <ul className="list-disc list-inside space-y-1">
        {testAssessment.format.map((item, idx) => (
          <li key={idx} className="text-gray-700">{item}</li>
        ))}
      </ul>
    </section>
  </div>
);

TestAssessmentDocument.propTypes = {
  testAssessment: PropTypes.shape({
    title: PropTypes.string.isRequired,
    focus: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    context_and_challenge: PropTypes.arrayOf(PropTypes.string).isRequired,
    assignment_overview: PropTypes.arrayOf(PropTypes.string).isRequired,
    format: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default TestAssessmentDocument;
