// HiringContext_Analysis/ErrorHandler.jsx

import React from 'react';
import PropTypes from 'prop-types';
import AnimatedLoader from '../../Loader';
import { AlertTriangle } from 'lucide-react';

const ErrorHandler = ({ isLoading, error, uiTranslations, language }) => {
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AnimatedLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-3 sm:p-4 rounded-lg flex items-start gap-2 sm:gap-3">
        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-normal text-red-700">
            {uiTranslations?.[language]?.error || 'Analysis Error'}
          </h3>
          <p className="text-xs sm:text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!error && !isLoading && !uiTranslations?.[language]?.noData) {
    return (
      <div className="text-center text-gray-500 py-8 sm:py-12">
        <p className="text-sm">
          {uiTranslations?.[language]?.noData || 'No analysis data available'}
        </p>
      </div>
    );
  }

  return null;
};

ErrorHandler.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  uiTranslations: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

export default ErrorHandler;
