import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (showContactModal || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal, isMenuOpen]);

  const descriptionBoxContent = {
    title: language === 'it' ? 'Analisi Persona Candidato' : 'Candidate Persona Analysis',
    text: language === 'it'
      ? 'Questa analisi preliminare vi aiuterà a definire il vostro candidato ideale per tale posizione.'
      : 'This preliminary analysis aims at helping you define your ideal candidate for this position.',
  };

  const { error, handleContactSubmit } = useCandidatePersona({
    analysisResult,
    answers,
    language,
    onCloseModal: () => setShowContactModal(false),
  });

  const backToAssessmentLabel = language === 'it' ? 'Torna all\'assessment' : 'Back to Assessment';

  if (isAnalyzing) {
    return (
      <div className="flex h-screen items-center justify-center px-4">
        <AnimatedLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="mx-auto max-w-md">
          <div className="bg-red-50 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-red-600 flex-shrink-0" />
              <h3 className="text-red-700 font-medium">
                {language === 'it' ? 'Errore di Analisi' : 'Analysis Error'}
              </h3>
            </div>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-opacity duration-700 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile-optimized header */}
        <header className="sticky top-0 bg-white z-10 py-4 border-b">
          <div className="flex items-center justify-between">
            <button
              onClick={onGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{backToAssessmentLabel}</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="py-6 space-y-6">
          {/* Description Section with improved mobile spacing */}
          <div className="space-y-4">
            <DescriptionBox
              title={descriptionBoxContent.title}
              text={descriptionBoxContent.text}
              className="p-4 sm:p-6"
            />
          </div>

          {/* Mobile-optimized tabs */}
          <div className="overflow-x-auto -mx-4 px-4">
            <AnalysisTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              language={language}
              className="flex-nowrap"
            />
          </div>

          {/* Content with improved mobile spacing */}
          <div className="space-y-4">
            {activeTab === 'sections' && (
              <PersonaSectionList 
                sections={analysisResult?.sections}
                className="space-y-4 sm:space-y-6"
              />
            )}
            {activeTab === 'questions' && (
              <ReflectionQuestionList
                questions={analysisResult?.reflection_questions}
                className="space-y-4 sm:space-y-6"
              />
            )}
          </div>
        </main>

        {/* Mobile-optimized floating button */}
        <FloatingActionButton
          label={language === 'it' ? 'Contattaci' : 'Contact Us'}
          onClick={() => setShowContactModal(true)}
          className="fixed bottom-6 right-4 shadow-lg"
        />

        {/* Full-screen modal on mobile */}
        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          onSubmit={handleContactSubmit}
          language={language}
          questionnaire={answers}
          analysisResult={analysisResult}
          className="md:rounded-lg md:m-4 m-0 h-full md:h-auto"
        />
      </div>
    </div>
  );
};

export default CandidatePersonaContainer;