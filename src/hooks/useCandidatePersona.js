// hooks/useCandidatePersona.js

import { useEffect } from 'react';
import { sendContactEmail } from '@/services/api';

/**
 * A custom hook that:
 *  - Logs when the component is mounted/unmounted
 *  - Validates analysis data
 *  - Handles contact submission
 */
const useCandidatePersona = ({
  analysisResult,
  answers,
  language,
  onCloseModal,
}) => {
  const error = analysisResult?.error ? analysisResult.summary : null;

  // Log component mount
  useEffect(() => {
    console.group('CandidatePersonaContainer Initialization');
    console.log('analysisResult:', analysisResult);
    console.log('answers:', answers);
    console.log('language:', language);
    console.groupEnd();
  }, [analysisResult, answers, language]);

  // Validation helper
  const validateAnalysisData = (data) => {
    if (!data) return false;
    if (!data.sections || !data.reflection_questions) return false;

    const sectionsValid = data.sections.every(
      (section) =>
        section.title && section.content && Array.isArray(section.highlights)
    );
    const questionsValid = data.reflection_questions.every(
      (q) => q.question && q.context && Array.isArray(q.considerations)
    );

    return sectionsValid && questionsValid;
  };

  const handleContactSubmit = async (contactData) => {
    console.group('Contact Submission Process');
    try {
      // **Correctly access nested contactInfo properties**
      const contactInfo = {
        name: contactData.contactInfo.name.trim(),
        email: contactData.contactInfo.email.trim(),
        phone: contactData.contactInfo.phone.trim(),
        companyRole: contactData.contactInfo.companyRole.trim(),
        message: contactData.contactInfo.message.trim(),
      };

      // Transform answers data
      const transformedAnswers = {};
      Object.entries(answers || {}).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          transformedAnswers[key] = value.explanation
            ? `${value.value} - ${value.explanation}`
            : value.value;
        } else {
          transformedAnswers[key] = value;
        }
      });

      // Validate analysis data
      if (!validateAnalysisData(analysisResult)) {
        const msg =
          language === 'it'
            ? 'I dati di analisi non sono validi.'
            : 'Analysis data is not valid.';
        alert(msg);
        return;
      }

      // Structure analysis
      const structuredAnalysis = {
        sections: analysisResult.sections.map((section) => ({
          title: section.title,
          content: section.content,
          highlights: section.highlights,
        })),
        reflection_questions: analysisResult.reflection_questions.map(
          (question) => ({
            question: question.question,
            context: question.context,
            considerations: question.considerations,
          })
        ),
      };

      // Prepare final payload
      const submissionPayload = {
        contactInfo,
        questionnaireData: transformedAnswers,
        analysisData: structuredAnalysis,
        metadata: {
          submittedAt: new Date().toISOString(),
          language,
          sessionId: localStorage.getItem('recruitment_session_id') || '',
          submissionType: 'candidate_persona',
          totalQuestions: Object.keys(answers || {}).length,
          analysisStats: {
            sectionsCount: analysisResult.sections.length,
            questionsCount: analysisResult.reflection_questions.length,
          },
        },
      };

      console.log('Full Submission Payload:', submissionPayload);

      // Call API service
      const response = await sendContactEmail(submissionPayload);
      if (response.status === 'success') {
        alert(
          language === 'it'
            ? 'Messaggio inviato con successo!'
            : 'Message sent successfully!'
        );
        onCloseModal();
        return true;
      }

      throw new Error(
        response.message ||
          (language === 'it' ? 'Invio email fallito' : 'Failed to send email')
      );
    } catch (err) {
      console.error('Contact Submission Error:', err);
      alert(
        language === 'it'
          ? "Errore durante l'invio del messaggio. Riprova più tardi."
          : 'Error sending message. Please try again later.'
      );
      return false;
    } finally {
      console.groupEnd();
    }
  };

  return {
    error,
    handleContactSubmit,
  };
};

export default useCandidatePersona;
