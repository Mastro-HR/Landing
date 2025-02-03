import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useUITranslations } from '@/constants/CandidatePersona_demo/questionnaire_main_buttons';

const CandidatePersona_ProgressBar = ({ currentStep, totalSteps, onRestart }) => {
  const translations = useUITranslations();

  const handleRestart = (e) => {
    e.preventDefault();
    onRestart?.();
  };

  const progress = Math.min(Math.max(((currentStep + 1) / totalSteps) * 100, 5), 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-primary-900 mb-2">
            {translations.title}
          </h1>
          <div className="hidden sm:flex items-center gap-2 text-primary-600">
            <span className="font-medium">
              {translations.progress.step} {currentStep + 1}
            </span>
            <span>{translations.progress.of}</span>
            <span className="font-medium">{totalSteps}</span>
          </div>
        </div>
        <button
          onClick={handleRestart}
          className="flex items-center px-2 py-2 hover:bg-accent-100 text-accent-500 rounded-xl transition-all"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          {translations.progress.restart}
        </button>
      </div>

      <div className="space-y-2">
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="h-full bg-accent-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-primary-600">
          <span>{Math.round(progress)}% {translations.progress.complete}</span>
          <span>
            {currentStep + 1}/{totalSteps} {translations.progress.steps}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CandidatePersona_ProgressBar;