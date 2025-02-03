// CandidatePersonaContainer.js

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import useCandidatePersona from '@/hooks/useCandidatePersona';
import AnalysisTabs from './AnalysisTabs';
import PersonaSectionList from './PersonaSectionList';
import ReflectionQuestionList from './ReflectionQuestionList';
import FloatingActionButton from './FloatingActionButton';
import ContactModal from './ContactModal';
import AnimatedLoader from '../Loader';

import DescriptionBox from './DescriptionBox';

const CandidatePersonaContainer = ({
  isAnalyzing,
  analysisResult,
  onGoBack,
  answers,
  language,
}) => {
  const [activeTab, setActiveTab] = useState('sections');
  const [showContactModal, setShowContactModal] = useState(false);

  const descriptionBoxContent = {
    title:
      language === 'it'
        ? 'Analisi Persona Candidato'
        : 'Candidate Persona Analysis',
    text:
      language === 'it'
        ? 'Questa analisi preliminare vi aiuterà a definire il vostro candidato ideale per tale posizione.'
        : 'This preliminary analysis aims at helping you define your ideal candidate for this position.',
  };

  const { error, handleContactSubmit } = useCandidatePersona({
    analysisResult,
    answers,
    language,
    onCloseModal: () => setShowContactModal(false),
  });

  const goBackLabel = language === 'it' ? 'Torna Indietro' : 'Go Back';

  return (
    <div className="min-h-screen mx-auto px-4 py-6 sm:py-8 max-w-4xl">
      {/* Go Back Button */}
      <button
        onClick={onGoBack}
        className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>{goBackLabel}</span>
      </button>

      {/* Loader or Error */}
      {isAnalyzing ? (
        <div className="flex h-[50vh] items-center justify-center">
          <AnimatedLoader />
        </div>
      ) : error ? (
        <div className="mx-auto max-w-md p-4">
          <div className="bg-red-50 p-6 rounded-xl flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-shrink-0 text-red-600">
              {/* Use an appropriate error icon */}
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
        <>
          {/* Description */}
          <DescriptionBox
            title={descriptionBoxContent.title}
            text={descriptionBoxContent.text}
          />

          {/* Analysis Tabs */}
          <AnalysisTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            language={language}
          />

          {/* Tab Content */}
          {activeTab === 'sections' && (
            <PersonaSectionList sections={analysisResult?.sections} />
          )}
          {activeTab === 'questions' && (
            <ReflectionQuestionList questions={analysisResult?.reflection_questions} />
          )}

          {/* Floating Contact Button */}
          <FloatingActionButton
            label={language === 'it' ? 'Contattaci' : 'Contact Us'}
            onClick={() => setShowContactModal(true)}
          />

          {/* Single Contact Modal Instance */}
          <ContactModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
            onSubmit={handleContactSubmit}
            language={language}
            questionnaire={answers}
            analysisResult={analysisResult}
          />
        </>
      )}
    </div>
  );
};

export default CandidatePersonaContainer;
