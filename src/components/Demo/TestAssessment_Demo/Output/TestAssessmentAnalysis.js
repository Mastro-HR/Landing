import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft } from 'lucide-react';
import DescriptionBox from './DescriptionBox';
import Loader from '../Loader';
import ErrorDisplay from './ErrorDisplay';
import TestAssessmentDocument from './TestAssessmentDocument';
import EvaluationCriteriaTable from './EvaluationCriteriaTable';
import FloatingActionButton from './FloatingActionButton';
import ContactModal from './ContactModal';
import { useUITranslations } from '@/constants/HiringContext_demo/questionnaire_main_buttons';
import { sendContactEmail } from '@/services/api';
import { translations as localTranslations } from './translations';

const TestAssessmentAnalysis = memo(function TestAssessmentAnalysis({
  isAnalyzing,
  analysisResult,
  onGoBack,
  error,
  language,
  questionnaire,
}) {
  const uiTranslations = useUITranslations();
  const translations = localTranslations?.[language] || {};
  const descriptionBox = {
    title: translations?.title || 'Test Assessment Overview',
    text:
      translations?.description ||
      'This analysis provides insights into your test assessment performance.',
  };
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        if (
          !formData.contactInfo?.name?.trim() ||
          !formData.contactInfo?.email?.trim() ||
          !formData.contactInfo?.phone?.trim()
        ) {
          throw new Error(
            language === 'it'
              ? 'Per favore, completa tutti i campi di contatto'
              : 'Please complete all contact information fields'
          );
        }
        const submissionPayload = {
          questionnaireData: questionnaire,
          analysisData: {
            test_assessment_data: {
              title: analysisResult?.test_assessment?.title,
              focus: analysisResult?.test_assessment?.focus,
              time: analysisResult?.test_assessment?.time,
              context_and_challenge:
                analysisResult?.test_assessment?.context_and_challenge,
              assignment_overview:
                analysisResult?.test_assessment?.assignment_overview,
              format: analysisResult?.test_assessment?.format,
            },
            evaluation_criteria: analysisResult?.evaluation_criteria,
            analysis_summary: analysisResult?.analysis_summary,
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
        const response = await sendContactEmail(submissionPayload);
        if (response.status === 'success') {
          setIsContactModalOpen(false);
          return true;
        }
        throw new Error(
          response.message ||
            (language === 'it' ? 'Invio email fallito' : 'Failed to send email')
        );
      } catch (err) {
        alert(err.message);
        return false;
      }
    },
    [analysisResult, language, questionnaire]
  );

  const removeDuplicateNumbering = (text) => {
    if (!text || typeof text !== 'string') return text;
    return text.replace(/^(?:(\d+\.\s+))\1+/g, '$1');
  };

  const cleanedAnalysisResult = useMemo(() => {
    if (!analysisResult) return analysisResult;
    let cleanedTestAssessment = analysisResult.test_assessment
      ? { ...analysisResult.test_assessment }
      : null;
    if (cleanedTestAssessment) {
      if (cleanedTestAssessment.assignment_overview) {
        cleanedTestAssessment.assignment_overview = removeDuplicateNumbering(
          cleanedTestAssessment.assignment_overview
        );
      }
      if (cleanedTestAssessment.context_and_challenge) {
        cleanedTestAssessment.context_and_challenge = removeDuplicateNumbering(
          cleanedTestAssessment.context_and_challenge
        );
      }
    }
    let cleanedEvaluationCriteria = analysisResult.evaluation_criteria;
    if (Array.isArray(cleanedEvaluationCriteria)) {
      cleanedEvaluationCriteria = cleanedEvaluationCriteria.filter(
        (item, index, arr) => index === arr.findIndex((t) => t.id === item.id)
      );
    }
    return {
      ...analysisResult,
      test_assessment: cleanedTestAssessment,
      evaluation_criteria: cleanedEvaluationCriteria,
    };
  }, [analysisResult]);

  const renderMainContent = () => (
    <div className="space-y-6">
      <DescriptionBox title={descriptionBox.title} text={descriptionBox.text} />
      <div className="space-y-8 mt-6">
        {cleanedAnalysisResult?.test_assessment && (
          <TestAssessmentDocument
            testAssessment={cleanedAnalysisResult.test_assessment}
            language={language}
          />
        )}
        {cleanedAnalysisResult?.evaluation_criteria && (
          <EvaluationCriteriaTable
            evaluationCriteria={cleanedAnalysisResult.evaluation_criteria}
            language={language}
          />
        )}
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
        <button
          onClick={onGoBack}
          className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 mt-6 mb-6 sm:mb-12 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>
            {uiTranslations?.navigation?.backToAssessment ||
              'Back to Assessment'}
          </span>
        </button>
        {isAnalyzing || error ? (
          isAnalyzing ? (
            <Loader />
          ) : (
            <ErrorDisplay error={error} language={language} />
          )
        ) : (
          <>
            {renderMainContent()}
            <FloatingActionButton
              label={language === 'it' ? 'Contattaci' : 'Contact Us'}
              onClick={() => setIsContactModalOpen(true)}
            />
          </>
        )}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={handleModalClose}
          onSubmit={handleContactSubmit}
          language={language}
          analysisResult={analysisResult}
          questionnaire={questionnaire}
        />
      </div>
    </div>
  );
});

TestAssessmentAnalysis.propTypes = {
  isAnalyzing: PropTypes.bool.isRequired,
  analysisResult: PropTypes.shape({
    test_assessment: PropTypes.object,
    evaluation_criteria: PropTypes.any,
    analysis_summary: PropTypes.any,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  onGoBack: PropTypes.func.isRequired,
  error: PropTypes.string,
  language: PropTypes.string.isRequired,
  questionnaire: PropTypes.object.isRequired,
};

export default TestAssessmentAnalysis;
