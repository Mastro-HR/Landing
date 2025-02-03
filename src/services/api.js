// src/services/api.js
const API_BASE_URL = 'http://localhost:8000';
import { cleanUrl } from '@/utils/validation';

export const hiringContextService = {
  analyzeHiringContext: async (formData, language) => {
    console.groupCollapsed('[SERVICE] HiringContext Analysis Request');
    
    try {
      // Define validation for only questions 1 to 8
      const fieldValidations = {
        '1': { type: 'url', required: true },
        '2': { type: 'array', required: true, minLength: 1, maxLength: 5 },
        '3': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '4': { type: 'array', required: true, minLength: 1, maxLength: 4 },
        '5': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '6': { type: 'array', required: true, minLength: 1, maxLength: 5 },
        '7': { type: 'string', required: true },
        '8': { type: 'string', required: true }
      };

      // Validate and transform answers
      const transformedAnswers = {};
      for (const [key, validation] of Object.entries(fieldValidations)) {
        const value = formData.answers[key];
        
        // Handle required fields
        if (validation.required) {
          // If it's an array, make sure it's not empty
          if (Array.isArray(value) && value.length === 0) {
            throw new Error(`Field ${key} is required`);
          }
          // If it's a string, make sure it's not undefined or empty
          if (!Array.isArray(value) && (value === undefined || value === '')) {
            throw new Error(`Field ${key} is required`);
          }
        }

        // Validate string length for text fields
        if (validation.type === 'string' && validation.minLength) {
          const stringValue = value?.toString() || '';
          if (
            stringValue.length < validation.minLength ||
            stringValue.length > validation.maxLength
          ) {
            throw new Error(
              `Field ${key} must be between ${validation.minLength}-${validation.maxLength} characters`
            );
          }
        }

        // Validate array length for multiple choice fields
        if (validation.type === 'array') {
          const arrayValue = Array.isArray(value) ? value : [];
          if (
            arrayValue.length < validation.minLength ||
            arrayValue.length > validation.maxLength
          ) {
            throw new Error(
              `Field ${key} must have between ${validation.minLength}-${validation.maxLength} selections`
            );
          }
        }

        // Handle 'url' type by cleaning the URL
        if (validation.type === 'url' && value) {
          const cleanedUrl = cleanUrl(value);
          transformedAnswers[key] = cleanedUrl;
        } else {
          transformedAnswers[key] = value;
        }
      }

      // IMPORTANT: Use 'session_id' exactly, so it matches your FastAPI model
      const requestBody = {
        session_id: formData.session_id,  // <-- Must match Pydantic’s session_id
        answers: transformedAnswers,
        metadata: {
          ...formData.metadata,
          submittedAt: new Date().toISOString()
        },
        language: language || 'en'
      };

      console.log('Transformed Request Body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/hiring_context/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language || 'en',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      console.log('Response Status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);

        // Sometimes FastAPI's "detail" is an array; handle gracefully:
        let errorMessage = 'Analysis failed';
        if (errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            // e.g. Pydantic validation errors array
            errorMessage = errorData.detail.map(e => e.msg || JSON.stringify(e)).join(', ');
          } else if (typeof errorData.detail === 'string') {
            errorMessage = errorData.detail;
          }
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Analysis Response:', result);
      return result;

    } catch (error) {
      console.error('Service Layer Error:', {
        message: error.message,
        formData: formData
      });
      
      return {
        error: true,
        title: "Analysis Failed",
        summary: error.message || "An unexpected error occurred",
        details: {}
      };
    } finally {
      console.groupEnd();
    }
  },

  clearRecruitmentSession: async () => {
    try {
      const sessionId = localStorage.getItem('recruitment_session_id');
      if (!sessionId) return;

      const response = await fetch(`${API_BASE_URL}/api/recruitment/clear/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to clear recruitment session');
      }

      localStorage.removeItem('recruitment_session_id');
      return await response.json();

    } catch (error) {
      console.error('Clear recruitment session error:', error);
      throw error;
    }
  }
};

export const candidatePersonaService = {
  analyzeCandidatePersona: async (formData, language) => {
    console.groupCollapsed('[SERVICE] CandidatePersona Analysis Request');
    
    try {
      // Transform form answers to expected format
      const transformedAnswers = {};
      Object.entries(formData.answers).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          // Handle choice answers with explanations
          transformedAnswers[key] = value.explanation ? [value.value, value.explanation] : [value.value];
        } else if (Array.isArray(value)) {
          // Handle multiselect
          transformedAnswers[key] = value;
        } else {
          // Handle simple values (url, text)
          transformedAnswers[key] = value;
        }
      });

      const requestBody = {
        session_id: formData.session_id,  // Use session_id instead of sessionId
        answers: transformedAnswers,
        metadata: {
          ...formData.metadata,
          submittedAt: new Date().toISOString()
        },
        language: language || 'en'
      };

      console.log('Transformed Request Body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/candidate_persona/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language || 'en',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      return await response.json();

    } catch (error) {
      console.error('Service Layer Error:', {
        message: error.message,
        formData: formData
      });
      
      return {
        error: true,
        title: "Analysis Failed",
        summary: error.message || "An unexpected error occurred",
        details: {}
      };
    } finally {
      console.groupEnd();
    }
  },

  clearRecruitmentSession: async () => {
    try {
      const sessionId = localStorage.getItem('recruitment_session_id');
      if (!sessionId) return;

      const response = await fetch(`${API_BASE_URL}/api/recruitment/clear/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to clear recruitment session');
      }

      localStorage.removeItem('recruitment_session_id');
      return await response.json();

    } catch (error) {
      console.error('Clear recruitment session error:', error);
      throw error;
    }
  }
};


export const testAssessmentService = {
  analyzeTestAssessment: async (formData, language) => {
    console.groupCollapsed('[SERVICE] Test Assessment Analysis Request');
    
    try {
      // Log incoming data
      console.log('Incoming formData:', {
        session_id: formData.session_id,
        websiteUrl: formData.answers['1'],
        answerKeys: Object.keys(formData.answers)
      });

      const fieldValidations = {
        '1': { type: 'url', required: true },
        '2': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '3': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '4': { type: 'array', required: true, minLength: 1, maxLength: 4 },
        '5': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '6': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '7': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '8': { type: 'array', required: true, minLength: 1, maxLength: 3 },
        '9': { type: 'array', required: true, minLength: 1, maxLength: 4 }
      };

      // Handle website URL first, similar to hiringContextService
      const websiteUrl = formData.answers['1'];
      console.log('Processing website URL:', websiteUrl);
      
      if (!websiteUrl) {
        console.error('Website URL is missing');
        throw new Error('Company website is required');
      }

      // Validate and transform answers
      const transformedAnswers = {};
      
      // Handle URL separately first
      if (websiteUrl) {
        try {
          const cleanedUrl = cleanUrl(websiteUrl);
          console.log('Cleaned URL:', cleanedUrl);
          transformedAnswers['1'] = cleanedUrl;
        } catch (error) {
          console.error('URL cleaning error:', error);
          throw new Error('Invalid website URL format');
        }
      }

      // Handle other answers
      for (const [key, validation] of Object.entries(fieldValidations)) {
        if (key === '1') continue; // Skip URL as it's already handled
        
        const value = formData.answers[key];
        console.log(`Processing answer ${key}:`, value);

        if (validation.required) {
          if (Array.isArray(value) && value.length === 0) {
            throw new Error(`Field ${key} is required`);
          }
          if (!Array.isArray(value) && !value) {
            throw new Error(`Field ${key} is required`);
          }
        }

        if (validation.type === 'array') {
          const arrayValue = Array.isArray(value) ? value : [];
          if (arrayValue.length < validation.minLength || arrayValue.length > validation.maxLength) {
            throw new Error(
              `Field ${key} must have between ${validation.minLength}-${validation.maxLength} selections`
            );
          }
          transformedAnswers[key] = arrayValue;
        }
      }

      console.log('Final transformed answers:', transformedAnswers);

      const requestBody = {
        session_id: formData.session_id,
        answers: transformedAnswers,
        metadata: {
          ...formData.metadata,
          submittedAt: new Date().toISOString(),
          formType: 'test_assessment',
          source: 'test_assessment_form'
        },
        language: language || 'en'
      };
    
      console.log('[TestAssessmentService] Final request payload with metadata:', 
        JSON.stringify(requestBody, null, 2)
      );

      console.log('Final request payload:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${API_BASE_URL}/api/test_assessment/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language || 'en',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', {
          status: response.status,
          errorData
        });
        
        const errorMessage = Array.isArray(errorData.detail)
          ? errorData.detail.map(e => e.msg || JSON.stringify(e)).join(', ')
          : errorData.detail || 'Analysis failed';
        throw new Error(errorMessage);
      }

      return await response.json();

    } catch (error) {
      console.error('Assessment analysis failed:', {
        error: error.message,
        stack: error.stack
      });
      return {
        error: true,
        title: "Analysis Failed",
        summary: error.message || "An unexpected error occurred",
        details: {}
      };
    } finally {
      console.groupEnd();
    }
  }
};

// ----------- sendContactEmail ----------------------- //

export const sendContactEmail = async (data) => {
  try {
    console.log('[ContactService] Received data structure:', {
      hasContactInfo: !!data.contactInfo,
      contactInfoType: typeof data.contactInfo,
      contactFields: data.contactInfo ? Object.keys(data.contactInfo) : []
    });

    // Detailed validation logging
    const validationResults = {
      hasName: !!data.contactInfo?.name,
      nameLength: data.contactInfo?.name?.length,
      hasEmail: !!data.contactInfo?.email,
      hasPhone: !!data.contactInfo?.phone,
      phoneLength: data.contactInfo?.phone?.length
    };

    console.log('[ContactService] Validation results:', validationResults);

    if (!data.contactInfo?.name || !data.contactInfo?.email || !data.contactInfo?.phone) {
      console.error('[ContactService] Missing required fields:', {
        name: !!data.contactInfo?.name,
        email: !!data.contactInfo?.email,
        phone: !!data.contactInfo?.phone
      });
      throw new Error('Missing required contact information');
    }

    // Construct the payload (message is optional)
    const payload = {
      contactInfo: {
        name: data.contactInfo.name,
        email: data.contactInfo.email,
        phone: data.contactInfo.phone,
        companyRole: data.contactInfo.companyRole || '',
        message: data.contactInfo.message || '', // Make it optional
        additionalNotes: data.contactInfo.additionalNotes || ''
      },
      questionnaireData: data.questionnaireData,
      analysisData: data.analysisData,
      metadata: {
        ...data.metadata,
        userAgent: window.navigator.userAgent,
        submittedAt: new Date().toISOString(),
        platform: window.navigator.platform,
        language: data.metadata?.language || 'en'
      },
      timestamp: new Date().toISOString()
    };

    console.log('[ContactService] Sending email request:', payload);

    const response = await fetch(`${API_BASE_URL}/api/email/send-contact-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('[ContactService] Email service error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(errorData?.message || 'Failed to send email');
    }

    const result = await response.json();
    console.log('[ContactService] Email sent successfully:', result);
    return result;

  } catch (error) {
    console.error('[ContactService] Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      data: JSON.stringify(data, null, 2)
    });
    throw error;
  }
};