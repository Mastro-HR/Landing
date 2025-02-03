// src/components/CandidatePersona_Form_Question.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Check } from 'lucide-react';

const URL_VALIDATOR = {
  PROTOCOLS: ['http:', 'https:'],
  MIN_LENGTH: 4,

  isValid: (urlString) => {
    try {
      if (!urlString?.trim()) return false;

      const urlToCheck = !/^\w+:\/\//i.test(urlString)
        ? `https://${urlString}`
        : urlString;

      const url = new URL(urlToCheck);

      return (
        URL_VALIDATOR.PROTOCOLS.includes(url.protocol.toLowerCase()) &&
        url.hostname?.length >= URL_VALIDATOR.MIN_LENGTH &&
        !url.hostname.startsWith('.') &&
        !url.hostname.endsWith('.') &&
        !url.hostname.includes('..') &&
        /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(url.hostname) &&
        !/\s/.test(urlString) &&
        /^[\w\-\.~:/?#\[\]@!$&'\(\)*+,;=%.]+$/.test(urlToCheck)
      );
    } catch {
      return false;
    }
  },

  clean: (url) => {
    if (!url?.trim()) return '';
    try {
      return url
        .trim()
        .toLowerCase()
        .replace(/^(https?:\/\/)+/i, 'https://')
        .replace(/^http:\/\//i, 'https://')
        .replace(/(?<!:)\/+/g, '/')
        .replace(/\/+$/, '');
    } catch {
      return '';
    }
  }
};

const CandidatePersona_Form_Question = ({
  question,
  answer,
  onAnswer,
  disabled = false,
  language = 'en',
  onValidationChange = () => {}
}) => {
  const {
    id,
    type,
    question: questionText,
    options,
    placeholder,
    maxLength,
    maxSelection,
    validation,
    multiSelectHint,
    conditional
  } = question;

  const [otherText, setOtherText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [urlError, setUrlError] = useState('');
  const [conditionalAnswer, setConditionalAnswer] = useState('');
  const [showConditionalError, setShowConditionalError] = useState(false);

  const maxWords = useMemo(
    () => (maxLength ? Math.floor(maxLength / 5) : null),
    [maxLength]
  );

  const translations = useMemo(() => ({
    urlRequired: language === 'it' ? 'URL richiesto' : 'URL is required',
    urlInvalid:
      language === 'it'
        ? 'Inserisci un URL valido (es. https://example.com)'
        : 'Please enter a valid URL (e.g., https://example.com)',
    wordCount:
      language === 'it'
        ? `${wordCount}/${maxWords} parole`
        : `${wordCount}/${maxWords} words`,
    multiSelect:
      language === 'it'
        ? `Seleziona fino a ${maxSelection} opzioni applicabili`
        : `Select up to ${maxSelection} options that apply`,
    otherPlaceholder: language === 'it' ? 'Specificare...' : 'Please specify...',
    requiredDetails: language === 'it' ? 'Dettagli richiesti' : 'Required details',
    provideDetails:
      language === 'it'
        ? 'Fornisci maggiori dettagli...'
        : 'Please provide more details...',
    fieldRequired: language === 'it'
      ? 'Questo campo è richiesto.'
      : 'This field is required.'
  }), [language, wordCount, maxWords, maxSelection]);

  useEffect(() => {
    // Handle URL validation if needed
    if (type === 'url' && answer) {
      validateAndHandleUrl(answer);
    }

    // Safely handle conditional answers
    if (conditional && answer) {
      const isObjectAnswer = typeof answer === 'object';
      const answerValue = isObjectAnswer ? answer.value : answer;

      if (answerValue === conditional.triggerValue) {
        const explanation = isObjectAnswer ? answer.explanation || '' : '';
        setConditionalAnswer(explanation);
        validateConditionalAnswer(explanation);
      }
    }
  }, [answer, type, conditional]);

  const validateConditionalAnswer = (value) => {
    const isValid = value.trim().length > 0;
    setShowConditionalError(!isValid);
    onValidationChange(isValid);
    return isValid;
  };

  const validateAndHandleUrl = (url) => {
    if (validation?.required && !url) {
      setUrlError(translations.urlRequired);
      onValidationChange(false);
      return false;
    }

    if (!url) {
      setUrlError('');
      onValidationChange(true);
      return true;
    }

    const isValid = URL_VALIDATOR.isValid(url);
    setUrlError(isValid ? '' : translations.urlInvalid);
    onValidationChange(isValid);
    return isValid;
  };

  const handleInputChange = (value, questionId) => {
    setUrlError('');

    if (type === 'url') {
      const isValid = validateAndHandleUrl(value);
      onAnswer(isValid && value ? URL_VALIDATOR.clean(value) : value, questionId);
    } else if (type === 'open_text' || type === 'text') {
      if (type === 'open_text' && maxWords) {
        const words = value.trim().split(/\s+/).filter(Boolean);
        if (words.length <= maxWords) {
          setWordCount(words.length);
          onAnswer(value, questionId);
          onValidationChange(true);
        }
      } else {
        onAnswer(value, questionId);
        onValidationChange(validation?.required ? value.trim().length > 0 : true);
      }
    }
  };

  const baseButtonStyles = `
    w-full text-left px-4 py-3 rounded-lg transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base
    relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50
  `;

  const selectedButtonStyles = `bg-accent-500 shadow-lg text-white`;
  const unselectedButtonStyles = `bg-gray-100 hover:bg-gray-200 text-primary-900 hover:shadow-md`;

  const inputStyles = `
    w-full px-3 py-2 bg-gray-100 rounded text-sm md:text-base text-primary-900
    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
    focus:ring-1 focus:ring-accent-100 focus:ring-opacity-80
    border ${urlError ? 'border-red-500' : 'border-primary-300 focus:border-accent-500'}
  `;

  // ------------------------------
  // Handle "other" input changes (for multiselect)
  // ------------------------------
  const handleOtherInputChange = (value) => {
    setOtherText(value);
    const trimmedValue = value.trim();

    if (trimmedValue.length > 0) {
      const updatedAnswers = [
        ...(answer || []).filter(item => !item.startsWith('other:')),
        `other:${value}`
      ];
      onAnswer(updatedAnswers, id);
      onValidationChange(true);
    } else {
      const updatedAnswers = (answer || []).filter(item => !item.startsWith('other:'));
      onAnswer(updatedAnswers, id);
      onValidationChange(updatedAnswers.length > 0);
    }
  };

  // ------------------------------
  // Render single-choice option
  // ------------------------------
  const renderChoiceOption = (option) => {
    const isSelected = typeof answer === 'object'
      ? answer.value === option.value
      : answer === option.value;

    const showConditionalInput =
      conditional && option.value === conditional.showWhen && isSelected;

    return (
      <div key={option.value}>
        <button
          onClick={() => {
            if (conditional && option.value === conditional.showWhen) {
              // Initialize with empty explanation when selecting conditional option
              onAnswer(
                {
                  value: option.value,
                  explanation: '',
                  isValid: false
                },
                id
              );
              setConditionalAnswer('');
              setShowConditionalError(true);
            } else {
              // Regular non-conditional answer
              onAnswer(option.value, id);
              setConditionalAnswer('');
              setShowConditionalError(false);
              onValidationChange(true);
            }
          }}
          disabled={disabled}
          className={`${baseButtonStyles} ${
            isSelected ? selectedButtonStyles : unselectedButtonStyles
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">{option.label}</span>
            {isSelected && <Check className="w-5 h-5" />}
          </div>
        </button>

        {showConditionalInput && (
          <div className="mt-3">
            <div className="flex items-center mb-2">
              <span className="text-sm text-primary-600">*</span>
              <span className="ml-1 text-sm text-primary-600">
                {translations.requiredDetails}
              </span>
            </div>
            <input
              type="text"
              placeholder={conditional.placeholder || translations.provideDetails}
              value={conditionalAnswer}
              onChange={(e) => {
                const value = e.target.value;
                setConditionalAnswer(value);
                onAnswer(
                  {
                    value: option.value,
                    explanation: value,
                    isValid: value.trim().length > 0
                  },
                  id
                );
                setShowConditionalError(!value.trim());
                onValidationChange(value.trim().length > 0);
              }}
              disabled={disabled}
              className={`${inputStyles} ${
                showConditionalError ? 'border-red-300 focus:border-red-500' : ''
              }`}
              required
            />
            {showConditionalError && (
              <p className="text-red-500 text-sm">{translations.fieldRequired}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  // ------------------------------
  // Render multiselect option
  // ------------------------------
  const renderMultiselectOption = (option) => {
    const isOther = option.value === 'other';
    const isSelected =
      Array.isArray(answer) && answer.includes(option.value);
    const selectedCount = Array.isArray(answer) ? answer.length : 0;
    const disableOption = selectedCount >= maxSelection && !isSelected;

    return (
      <div key={option.value} className="flex flex-col">
        <button
          onClick={() => {
            let updatedAnswers = Array.isArray(answer) ? [...answer] : [];
            if (isOther) {
              // For "other" option: toggle its selection separately.
              if (isSelected) {
                updatedAnswers = updatedAnswers.filter((value) => value !== option.value);
                setOtherText('');
              } else if (!disableOption) {
                updatedAnswers.push(option.value);
              }
            } else {
              // For non-"other" options, toggle without affecting "other"
              if (isSelected) {
                updatedAnswers = updatedAnswers.filter((value) => value !== option.value);
              } else if (!disableOption) {
                updatedAnswers.push(option.value);
              }
            }
            onAnswer(updatedAnswers, id);
            onValidationChange(updatedAnswers.length > 0);
          }}
          disabled={disabled || disableOption}
          className={`${baseButtonStyles} ${
            isSelected ? selectedButtonStyles : unselectedButtonStyles
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg">{option.label}</span>
            {isSelected && <Check className="w-5 h-5" />}
          </div>
        </button>
        {isOther && isSelected && (
          <input
            type="text"
            placeholder={translations.otherPlaceholder}
            value={otherText}
            onChange={(e) => handleOtherInputChange(e.target.value)}
            disabled={disabled}
            className={`mt-3 ${inputStyles}`}
          />
        )}
      </div>
    );
  };

  const renderTextInput = () => (
    <div className="space-y-2">
      <input
        type={type === 'url' ? 'url' : 'text'}
        value={answer || ''}
        onChange={(e) => handleInputChange(e.target.value, id)}
        onBlur={() => type === 'url' && answer && validateAndHandleUrl(answer)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputStyles}
        aria-label={placeholder}
      />
      {urlError && <p className="text-red-500 text-sm">{urlError}</p>}
      {(type === 'open_text' || type === 'text') && maxWords && (
        <p className="text-sm text-primary-600">{translations.wordCount}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl text-primary-900">
          {questionText.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < questionText.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h3>

        {question.description && (
          <p className="text-sm text-gray-600 mt-1">{question.description}</p>
        )}

        {multiSelectHint && type === 'multiselect' && (
          <p className="text-sm text-primary-600">{translations.multiSelect}</p>
        )}
      </div>

      <div className="space-y-3">
        {type === 'choice' && options.map((option) => renderChoiceOption(option))}
        {type === 'multiselect' && options.map((option) => renderMultiselectOption(option))}
        {(type === 'text' || type === 'open_text' || type === 'url') && renderTextInput()}
      </div>
    </div>
  );
};

export default CandidatePersona_Form_Question;
