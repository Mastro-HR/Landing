// src/components/TestAssessmentAnalysis/ErrorDisplay.jsx

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ error, language }) => (
  <div className="max-w-3xl mx-auto p-8">
    <div className="bg-red-50 p-6 rounded-lg flex items-start gap-4">
      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
      <div>
        <h3 className="text-red-700 font-medium text-lg">
          {language === 'it' ? "Errore nell'analisi" : 'Analysis Error'}
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  </div>
);

ErrorDisplay.propTypes = {
  error: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default ErrorDisplay;
