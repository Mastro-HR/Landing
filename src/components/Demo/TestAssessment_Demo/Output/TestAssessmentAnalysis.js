import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'lucide-react';

import DescriptionBox from './DescriptionBox';
import Loader from '../Loader';
import ErrorDisplay from './ErrorDisplay';
import TestAssessmentDocument from './TestAssessmentDocument';
import EvaluationCriteriaTable from './EvaluationCriteriaTable';
import FloatingActionButton from './FloatingActionButton';
import ContactModal from './ContactModal';

import { sendContactEmail } from '@/services/api';
import { translations as localTranslations } from './translations';

const TestAssessmentAnalysis = memo(({
  isAnalyzing,
  analysisResult,
  onGoBack,
  error,
  language,
  questionnaire,
}) => {
  const [showContactModal, setShowContactModal] = useState(false);

  // Get translations from localTranslations using language key
  const translations = localTranslations?.[language] || {};
  
  // Use proper translation structure matching HiringContext
  const descriptionBox = translations?.descriptionBox || {
    title: translations?.title || 'Test Assessment Overview',
    text: translations?.description || 'This analysis provides insights into your test assessment performance.'
  };

  const handleContactSubmit = useCallback(async (formData) => {
    try {
      console.log('[TestAssessmentAnalysis] Starting contact submission with:', {
        formData,
        analysisResult,
        questionnaire
      });
  
      if (!formData.contactInfo?.name?.trim() || !formData.contactInfo?.email?.trim() || !formData.contactInfo?.phone?.trim()) {
        throw new Error(
          language === 'it'
            ? 'Per favore, completa tutti i campi delle informazioni di contatto'
            : 'Please complete all contact information fields'
        );
      }
  
      // Build submission payload with both analysis and questionnaire data
      const submissionPayload = {
        questionnaireData: questionnaire,
        analysisData: {
          // Ensure test_assessment data is included
          test_assessment_data: {
            title: analysisResult?.test_assessment?.title,
            focus: analysisResult?.test_assessment?.focus,
            time: analysisResult?.test_assessment?.time,
            context_and_challenge: analysisResult?.test_assessment?.context_and_challenge,
            assignment_overview: analysisResult?.test_assessment?.assignment_overview,
            format: analysisResult?.test_assessment?.format
          },
          // Include evaluation criteria
          evaluation_criteria: analysisResult?.evaluation_criteria,
          // Include any additional analysis data
          analysis_summary: analysisResult?.analysis_summary
        },
        contactInfo: formData.contactInfo,
        metadata: {
          submittedAt: new Date().toISOString(),
          language,
          sessionId: localStorage.getItem('assessment_session_id') || '',
          submissionType: 'test_assessment',
          version: '1.0',
          source: 'test_assessment_analysis',
          analysisId: analysisResult?.id || null,
          userAgent: navigator.userAgent,
        },
      };
  
      console.log('[TestAssessmentAnalysis] Analysis data being sent:', 
        JSON.stringify(submissionPayload.analysisData, null, 2)
      );
      console.log('[TestAssessmentAnalysis] Questionnaire data being sent:', 
        JSON.stringify(submissionPayload.questionnaireData, null, 2)
      );
      console.log('[TestAssessmentAnalysis] Full submission payload:', 
        JSON.stringify(submissionPayload, null, 2)
      );
  
      const result = await sendContactEmail(submissionPayload);
      console.log('[TestAssessmentAnalysis] Email service response:', result);
      
      return result;
    } catch (error) {
      console.error('[TestAssessmentAnalysis] Error in contact submission:', {
        error: error.message,
        stack: error.stack,
        analysisData: analysisResult,
        questionnaireData: questionnaire
      });
      throw error;
    }
  }, [analysisResult, language, questionnaire]);

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          aria-label={language === 'it' ? 'Indietro' : 'Back'}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{language === 'it' ? 'Indietro' : 'Back'}</span>
        </button>

        {/* Description Box - Now properly implemented */}
        {!isAnalyzing && !error && (
          <DescriptionBox 
            title={descriptionBox.title} 
            text={descriptionBox.text}
          />
        )}

        {isAnalyzing ? (
          <Loader />
        ) : error ? (
          <ErrorDisplay error={error} language={language} />
        ) : (
          <>
            <div className="space-y-8 mt-6">
              {analysisResult?.test_assessment && (
                <TestAssessmentDocument 
                  testAssessment={analysisResult.test_assessment}
                  language={language} 
                />
              )}
              {analysisResult?.evaluation_criteria && (
                <EvaluationCriteriaTable 
                  evaluationCriteria={analysisResult.evaluation_criteria}
                  language={language} 
                />
              )}
            </div>

            <FloatingActionButton
              label={language === 'it' ? 'Contattaci' : 'Contact Us'}
              onClick={() => setShowContactModal(true)}
            />
          </>
        )}

        <ContactModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          onSubmit={handleContactSubmit}
          questionnaire={questionnaire}
          analysisResult={analysisResult}
          language={language}
        />
      </div>
    </div>
  );
});

TestAssessmentAnalysis.propTypes = {
  isAnalyzing: PropTypes.bool.isRequired,
  analysisResult: PropTypes.shape({
    test_assessment: PropTypes.object,
    evaluation_criteria: PropTypes.object,
    analysis_summary: PropTypes.object,
  }),
  onGoBack: PropTypes.func.isRequired,
  error: PropTypes.string,
  language: PropTypes.string.isRequired,
  questionnaire: PropTypes.object.isRequired,
};

export default TestAssessmentAnalysis;