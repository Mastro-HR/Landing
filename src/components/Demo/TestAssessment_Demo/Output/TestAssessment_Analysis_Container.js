import React, { memo, useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';

import AnimatedLoader from '../Loader'; // <-- Make sure this path is correct

const TestAssessmentAnalysis = memo(({ 
  isAnalyzing, 
  analysisResult, 
  onGoBack, 
  error, 
  language 
}) => {
  const [activeSection, setActiveSection] = useState(0);

  // Sections and Reflection Questions
  const sections = analysisResult?.sections || [];
  const reflectionQuestions = analysisResult?.reflection_questions || [];

  // Handle translations for "Back" label
  const backLabel = language === 'it' ? 'Indietro' : 'Back';

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Go Back button (always visible) */}
        <button
          onClick={onGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{backLabel}</span>
        </button>

        {/* Now we do our 3-state rendering (Loading, Error, or Content) */}
        {isAnalyzing ? (
          /* 1) If analyzing, show loader */
          <div className="flex h-[50vh] items-center justify-center">
            <AnimatedLoader />
          </div>
        ) : error ? (
          /* 2) If error, show error display */
          <div className="mx-auto max-w-md p-4">
            <div className="bg-red-50 p-6 rounded-xl flex flex-col sm:flex-row items-start gap-4">
              {/* Icon or alert graphic */}
              <div className="flex-shrink-0 text-red-600">
                {/* You could use something like <AlertTriangle className="w-6 h-6" /> here */}
                <ArrowLeft className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-red-700 font-medium text-lg mb-2">
                  {language === 'it' ? 'Errore di Analisi' : 'Analysis Error'}
                </h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          /* 3) Otherwise, show the analysis content */
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sections Navigation */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {sections.map((section, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSection(idx)}
                    className={`w-full text-left p-4 border-b last:border-0 transition-colors
                      ${
                        activeSection === idx
                          ? 'bg-accent-50 border-accent-100'
                          : 'hover:bg-gray-50'
                      }`}
                  >
                    <h3
                      className={`font-medium ${
                        activeSection === idx ? 'text-accent-900' : 'text-gray-900'
                      }`}
                    >
                      {section.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Active Section */}
              {sections[activeSection] && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {sections[activeSection].title}
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">
                      {sections[activeSection].content}
                    </p>
                  </div>
                  {sections[activeSection].highlights?.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 uppercase mb-3">
                        {language === 'it' ? 'Punti Chiave' : 'Key Points'}
                      </h4>
                      <ul className="space-y-2">
                        {sections[activeSection].highlights.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <ChevronRight className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Reflection Questions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {language === 'it'
                    ? 'Domande di Riflessione'
                    : 'Reflection Questions'}
                </h3>
                <div className="space-y-6">
                  {reflectionQuestions.map((q, idx) => (
                    <div key={idx} className="pb-6 border-b last:border-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 mb-2">{q.question}</h4>
                      <p className="text-gray-600 text-sm mb-3">{q.context}</p>
                      <ul className="space-y-1">
                        {q.considerations.map((c, i) => (
                          <li key={i} className="text-sm text-gray-500">
                            • {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default TestAssessmentAnalysis;
