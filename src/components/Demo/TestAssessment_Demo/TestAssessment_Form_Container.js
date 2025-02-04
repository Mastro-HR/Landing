// src/components/TestAssessmentForm/TestAssessmentFormContainer.jsx
import React, { memo, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useTestAssessmentQuestions } from '@/constants/TestAssessment_demo/questions_translations';
import { useUITranslations } from '@/constants/TestAssessment_demo/questionnaire_main_buttons';
import { useLanguage } from '@/context/LanguageContext';
import { testAssessmentService } from '@/services/api';

import TestAssessment_Form_ProgressBar from './TestAssessment_Form_ProgressBar';
import TestAssessment_Form_Question from './TestAssessment_Form_Question';
import TestAssessment_Analysis_Container from './Output/TestAssessmentAnalysis';

import AnimatedLoader from './Loader';
import { isValidUrl, cleanUrl } from '@/utils/validation';

const TestAssessmentFormContainer = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const translations = useUITranslations();
  const questions = useTestAssessmentQuestions();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [validationStates, setValidationStates] = useState({});

  // 1. Handle user input
  const handleAnswer = useCallback(
    (value, questionId) => {
      const question = questions.find((q) => q.id === questionId);

      // Live URL validation if needed
      if (question?.type === 'url') {
        const isValid = value ? isValidUrl(value) : true;
        setValidationStates((prev) => ({ ...prev, [questionId]: isValid }));
      }

      console.log(`Received Answer for Question ID ${questionId}: "${value}"`);
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setError(null);
    },
    [questions]
  );

  // 2. Validate a single question’s answer
  const validateQuestion = useCallback(
    (question, answer) => {
      if (!question.validation?.required) return null;

      if (question.type === 'url') {
        if (!answer) {
          return translations?.errors?.websiteRequired[language];
        }
        if (!isValidUrl(answer)) {
          return translations?.errors?.invalidUrl[language];
        }
        try {
          const cleanedUrl = cleanUrl(answer);
          if (!cleanedUrl || cleanedUrl === 'https://') {
            return translations?.errors?.invalidUrl[language];
          }
        } catch {
          return translations?.errors?.invalidUrl[language];
        }
      }

      if (['text', 'textarea'].includes(question.type)) {
        if (!answer?.trim() || answer.trim().length < (question.validation.minLength || 1)) {
          return translations?.errors?.fieldRequired[language];
        }
      }

      if (question.type === 'multiselect') {
        if (!Array.isArray(answer) || answer.length === 0) {
          return translations?.errors?.selectOne[language];
        }
      }

      if (question.type === 'choice' && !answer) {
        return translations?.errors?.selectOption[language];
      }

      return null;
    },
    [language, translations]
  );

  // 3. Handle navigation between questions
  const handleNavigation = useCallback(
    (direction) => {
      const currentQuestion = questions[currentStep];
      const currentAnswer = answers[currentQuestion.id];

      if (direction === 'next') {
        // Validate before moving forward
        const validationError = validateQuestion(currentQuestion, currentAnswer);
        if (validationError) {
          setError(validationError);
          return;
        }
        // Clean URL if needed
        if (currentQuestion.type === 'url' && currentAnswer) {
          try {
            const cleanedUrl = cleanUrl(currentAnswer);
            setAnswers((prev) => ({ ...prev, [currentQuestion.id]: cleanedUrl }));
          } catch {
            setError(translations?.errors?.invalidUrl[language]);
            return;
          }
        }
      }

      setError(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep((prev) =>
        direction === 'next'
          ? Math.min(questions.length - 1, prev + 1)
          : Math.max(0, prev - 1)
      );
    },
    [answers, currentStep, questions, validateQuestion, language, translations]
  );

  // 4. Final submission for analysis
  const handleSubmit = useCallback(async () => {
    try {
      // Validate all required questions
      const requiredQuestions = questions.filter((q) => q.validation?.required);
      for (const question of requiredQuestions) {
        const err = validateQuestion(question, answers[question.id]);
        if (err) {
          setError(err);
          return;
        }
      }

      setIsAnalyzing(true);
      setError(null);

      // Get session ID
      const sessionIdFromStorage = localStorage.getItem('assessment_session_id') || '';
      console.log('[TestAssessmentFormContainer] Session ID:', sessionIdFromStorage);

      // Format answers properly
      const formattedAnswers = Object.entries(answers).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          acc[key] = value;
        } else if (typeof value === 'object' && value !== null) {
          acc[key] = value.explanation ? [value.value, value.explanation] : [value.value];
        } else if (questions.find(q => q.id === key)?.type === 'url' && value) {
          acc[key] = cleanUrl(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Build questionnaire metadata using the correct keys:
      const questionnaireData = {
        answers: formattedAnswers,
        metadata: {
          submittedAt: new Date().toISOString(),
          language,
          totalQuestions: questions.length,
          sessionId: sessionIdFromStorage,
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          formType: 'test_assessment'
        },
        questions: questions.map(q => ({
          id: q.id,
          type: q.type,
          question: q.question, // Use the correct key from your constants
          options: q.options || undefined, // Options are already an array
          validation: q.validation
        }))
      };

      const submissionData = {
        session_id: sessionIdFromStorage,
        answers: formattedAnswers,
        metadata: questionnaireData.metadata,
        language
      };

      console.log('[TestAssessmentFormContainer] Submitting Form Data:', 
        JSON.stringify(submissionData, null, 2)
      );

      const result = await testAssessmentService.analyzeTestAssessment(submissionData, language);
      console.log('[TestAssessmentFormContainer] Received Analysis Result:', result);

      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format from the analysis service');
      }

      setAnalysisResult({
        ...result,
        questionnaire: questionnaireData
      });

    } catch (e) {
      console.error('[TestAssessmentFormContainer] Submission Error:', {
        error: e.message,
        stack: e.stack
      });
      setError(e.message || 'Analysis failed');
      setAnalysisResult({
        error: true,
        title: 'Analysis Failed',
        summary: e.message || 'Analysis failed'
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [answers, questions, language, validateQuestion]);

  // 5. Reset form
  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setAnalysisResult(null);
    setError(null);
    setValidationStates({});
  }, []);

  // 6. Return from results to the form
  const handleGoBack = useCallback(() => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setError(null);
  }, []);

  const handleGoBack_Page = () => (language === 'it' ? 'Torna indietro' : 'Go Back');

  const renderDescriptionSection = () => (
    <div className="mb-12">
      <div className="flex items-center justify-center">
        <div className="text-gray-600 rounded-lg shadow-lg p-6 md:p-8 lg:p-10 max-w-3xl w-full">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-accent-500 opacity-80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01
                     M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9
                     4.03-9 9-9 9 4.03 9 9z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 mt-1">
                {translations.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleValidityChange = useCallback(
    (isValid) => {
      if (!questions[currentStep]) return;
      setValidationStates((prev) => ({
        ...prev,
        [questions[currentStep].id]: isValid,
      }));
    },
    [currentStep, questions]
  );

  // When analyzing or after analysis, build the questionnaire data to pass along:
  if (isAnalyzing || analysisResult) {
    const analysisQuestionnaireData = {
      answers,
      metadata: {
        submittedAt: new Date().toISOString(),
        language,
        totalQuestions: questions.length,
        sessionId: localStorage.getItem('assessment_session_id') || '',
        formType: 'test_assessment',
        userAgent: navigator.userAgent,
        platform: navigator.platform
      },
      questions: questions.map(q => ({
        id: q.id,
        type: q.type,
        question: q.question, // Updated mapping
        options: q.options || undefined,
        validation: q.validation
      }))
    };

    return (
      <TestAssessment_Analysis_Container
        isAnalyzing={isAnalyzing}
        analysisResult={analysisResult}
        onGoBack={handleGoBack}
        error={error}
        language={language}
        questionnaire={analysisResult?.questionnaire || analysisQuestionnaireData}
      />
    );
  }

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const isCurrentAnswered =
    answers[currentQuestion?.id] !== undefined && answers[currentQuestion?.id] !== '';
  const isCurrentValid = validationStates[currentQuestion?.id] ?? false;

  return (
    <div className="w-full min-h-screen py-2">
      <div className="max-w-3xl mx-auto">
        {/* Go Back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/ai_form')}
            className="group flex items-left rounded-full bg-white"
          >
            <div className="flex items-center justify-left space-x-1">
              <span className="flex items-center justify-center w-8 h-8">
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-accent-500" />
              </span>
              <span className="font-medium text-gray-600 group-hover:text-accent-500">
                {handleGoBack_Page()}
              </span>
            </div>
          </button>
        </div>

        {renderDescriptionSection()}

        {/* Form Container */}
        <div className="rounded-2xl p-8 bg-white shadow-lg border border-gray-200">
          <div className="mb-8">
            <TestAssessment_Form_ProgressBar
              currentStep={currentStep}
              totalSteps={questions.length}
              title={translations?.title}
              onRestart={handleReset}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-8">
            {currentQuestion && (
              <TestAssessment_Form_Question
                question={currentQuestion}
                answer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
                disabled={isAnalyzing}
                language={language}
                onValidityChange={handleValidityChange}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => handleNavigation('prev')}
              disabled={currentStep === 0 || isAnalyzing}
              className="flex items-center px-6 py-3 rounded-full text-primary-900 disabled:opacity-50 transition-all hover:scale-[1.02]"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              {translations?.navigation?.previous}
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={isAnalyzing || !isCurrentValid}
                className="flex items-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white disabled:opacity-50 transition-transform hover:scale-[1.02]"
              >
                {isAnalyzing ? <AnimatedLoader /> : translations?.analysis?.button}
              </button>
            ) : (
              <button
                onClick={() => handleNavigation('next')}
                disabled={!isCurrentAnswered}
                className="flex items-center px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 text-white disabled:opacity-50 transition-transform hover:scale-[1.02]"
              >
                {translations?.navigation?.next}
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TestAssessmentFormContainer);
