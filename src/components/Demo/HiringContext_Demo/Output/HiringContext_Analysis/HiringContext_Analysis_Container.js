import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Target, Brain, Users } from 'lucide-react';

import DescriptionBox from './DescriptionBox';
import SectionMenu from './SectionMenu';
import ContentRenderer from './ContentRenderer';
import ErrorHandler from './ErrorHandler';
import ContactModal from './ContactModal';
import FloatingActionButton from './FloatingActionButton';

import { formatQuestionnaireData } from './utils';
import { translations as localTranslations } from './translations';
import { useUITranslations } from '@/constants/HiringContext_demo/questionnaire_main_buttons';
import { sendContactEmail } from '@/services/api';

const HiringContext_Analysis_Container = memo(function HiringContext_Analysis_Container({
  isAnalyzing,
  analysisResult,
  onGoBack,
  error,
  language,
  answers = {},
}) {
  // Pull the main UI translations (already filtered by the current language)
  const uiTranslations = useUITranslations();
  const localContact = localTranslations?.[language]?.contact || {};

  // The descriptionBox translations from your localTranslations.
  const descriptionBox = localTranslations?.[language]?.descriptionBox || {};

  const sections = {
    strategic_foundation: {
      icon: Target,
      title: uiTranslations?.sections?.strategic_foundation || 'Strategic Foundation',
      description:
        uiTranslations?.descriptions?.strategic_foundation ||
        'Market position & organizational dynamics',
    },
    talent_architecture: {
      icon: Users,
      title: uiTranslations?.sections?.talent_architecture || 'Talent Architecture',
      description:
        uiTranslations?.descriptions?.talent_architecture ||
        'Capabilities & cultural alignment',
    },
    growth_catalysts: {
      icon: Brain,
      title: uiTranslations?.sections?.growth_catalysts || 'Growth Catalysts',
      description:
        uiTranslations?.descriptions?.growth_catalysts ||
        'Impact & risk optimization',
    },
  };

  // The user-selected section, e.g. "strategic_foundation"
  const [selectedSection, setSelectedSection] = useState('strategic_foundation');

  // Mobile/responsive states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Local state for fade-in effect
  const [isVisible, setIsVisible] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger fade-in after the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll to top once the analysis is available (only once)
  useEffect(() => {
    if (!isAnalyzing && analysisResult) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isAnalyzing, analysisResult]);

  const handleModalClose = useCallback(() => {
    setIsContactModalOpen(false);
  }, []);

  const handleContactSubmit = useCallback(
    async (formData) => {
      try {
        console.log('[HiringContext_Analysis_Container] Received form data:', {
          formData,
          analysisResult,
          answers,
        });

        if (
          !formData.contactInfo?.name?.trim() ||
          !formData.contactInfo?.email?.trim() ||
          !formData.contactInfo?.phone?.trim()
        ) {
          console.error('[HiringContext_Analysis_Container] Validation failed:', {
            name: formData.contactInfo?.name,
            email: formData.contactInfo?.email,
            phone: formData.contactInfo?.phone,
          });
          throw new Error(
            language === 'it'
              ? 'Per favore, completa tutti i campi delle informazioni di contatto'
              : 'Please complete all contact information fields'
          );
        }

        console.log('[HiringContext_Analysis_Container] Contact info validation passed');

        // Safely access hiring context data
        const hiringContext = analysisResult?.hiring_context;

        if (!hiringContext || !hiringContext.strategic_foundation) {
          console.error('[HiringContext_Analysis_Container] Missing hiring context:', analysisResult);
          throw new Error(
            language === 'it'
              ? 'Nessun dato di contesto di assunzione disponibile'
              : 'No hiring context data available'
          );
        }

        const submissionPayload = {
          questionnaireData: formatQuestionnaireData(answers),
          analysisData: {
            analysis_summary: analysisResult.analysis_summary,
            company_insights: analysisResult.company_insights || {},
            hiring_context: hiringContext,
            sections: [
              {
                title: 'Strategic Foundation',
                data: hiringContext.strategic_foundation,
              },
              {
                title: 'Talent Architecture',
                data: hiringContext.talent_architecture,
              },
              {
                title: 'Growth Catalysts',
                data: hiringContext.growth_catalysts,
              },
            ],
          },
          contactInfo: formData.contactInfo,
          metadata: {
            submittedAt: new Date().toISOString(),
            language,
            sessionId: localStorage.getItem('recruitment_session_id') || '',
            submissionType: 'hiring_context',
            version: '1.0',
            source: 'analysis_container',
            analysisId: analysisResult?.id || null,
            userAgent: navigator.userAgent,
          },
        };

        console.log(
          '[HiringContext_Analysis_Container] Final submission payload:',
          JSON.stringify(submissionPayload, null, 2)
        );

        const response = await sendContactEmail(submissionPayload);
        console.log('[HiringContext_Analysis_Container] Email service response:', response);

        if (response.status === 'success') {
          setIsContactModalOpen(false);
          return true;
        }

        throw new Error(
          response.message ||
            (language === 'it' ? 'Invio email fallito' : 'Failed to send email')
        );
      } catch (err) {
        console.error('[HiringContext_Analysis_Container] Contact submission error:', {
          error: err.message,
          stack: err.stack,
          formData,
        });
        alert(err.message);
        return false;
      }
    },
    [analysisResult, answers, language]
  );

  // Main content with the DescriptionBox up top
  const renderMainContent = () => (
    <div className="space-y-6">
      {/* The top DescriptionBox */}
      <DescriptionBox title={descriptionBox.title} text={descriptionBox.text} />

      <div className="grid grid-cols-12 gap-4 sm:gap-6">
        <SectionMenu
          sections={sections}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <div className="col-span-12 lg:col-span-8">
          <ContentRenderer
            selectedSection={selectedSection}
            analysisResult={analysisResult}
            language={language}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Go Back Button */}
        <button
          onClick={onGoBack}
          className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 mt-6 mb-6 sm:mb-12 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{uiTranslations?.navigation?.backToAssessment || 'Back to Assessment'}</span>
        </button>

        {/* Loader or error display */}
        {isAnalyzing || error ? (
          <ErrorHandler
            isLoading={isAnalyzing}
            error={error}
            uiTranslations={uiTranslations}
            language={language}
          />
        ) : (
          <>
            {renderMainContent()}

            {/* Floating Contact Button */}
            <FloatingActionButton
              label={language === 'it' ? 'Contattaci' : 'Contact Us'}
              onClick={() => setIsContactModalOpen(true)}
            />
          </>
        )}

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleModalClose}
          onSubmit={handleContactSubmit}
          language={language}
          analysisResult={analysisResult}
          answers={answers}
          isSubmitting={false}
          hasAnalysisData={!!analysisResult?.hiring_context?.strategic_foundation}
          useSidebar={isMobile}
        />
      </div>
    </div>
  );
});

HiringContext_Analysis_Container.propTypes = {
  isAnalyzing: PropTypes.bool.isRequired,
  analysisResult: PropTypes.object,
  onGoBack: PropTypes.func.isRequired,
  error: PropTypes.string,
  language: PropTypes.string.isRequired,
  answers: PropTypes.object,
};

export default HiringContext_Analysis_Container;
