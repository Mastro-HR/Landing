// src/components/TestAssessmentForm/TestAssessmentFormQuestion.jsx
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
  },
};

const TestAssessmentFormQuestion = ({
  question,
  answer,
  onAnswer,
  disabled = false,
  language = 'en',
  onValidityChange,
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
  } = question;

  const [otherTextMap, setOtherTextMap] = useState({});
  const [otherErrorMap, setOtherErrorMap] = useState({});
  const [urlError, setUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const maxWords = useMemo(() => (maxLength ? Math.floor(maxLength / 5) : null), [maxLength]);

  // When answer changes (for choice/multiselect), update the local "other" text without trimming.
  useEffect(() => {
    if (answer && (type === 'choice' || type === 'multiselect')) {
      const answers = Array.isArray(answer) ? answer : [answer];
      answers.forEach((ans) => {
        if (ans.startsWith('other:')) {
          const otherText = ans.replace('other:', ''); // Do not trim here
          setOtherTextMap((prev) => ({ ...prev, [`${id}-other`]: otherText }));
        }
      });
    }
  }, [answer, id, type]);

  useEffect(() => {
    if (type === 'url' && answer) {
      validateAndHandleUrl(answer);
    }
  }, [answer, type]);

  const translations = useMemo(
    () => ({
      urlRequired: language === 'it' ? 'URL richiesto' : 'URL is required',
      urlInvalid:
        language === 'it'
          ? 'Inserisci un URL valido (es. https://example.com)'
          : 'Please enter a valid URL (e.g., https://example.com)',
      wordCount:
        language === 'it'
          ? maxWords
            ? `${maxWords}`
            : '∞'
          : maxWords
          ? `${maxWords}`
          : '∞',
      multiSelect:
        language === 'it'
          ? `Seleziona fino a ${maxSelection} opzioni applicabili`
          : `Select up to ${maxSelection} options that apply`,
      otherPlaceholder: language === 'it' ? 'Specificare...' : 'Please specify...',
    }),
    [language, maxWords, maxSelection]
  );

  const validateAndHandleUrl = (url) => {
    if (validation?.required && !url) {
      setUrlError(translations.urlRequired);
      return false;
    }
    if (!url) {
      setUrlError('');
      return true;
    }
    const isValid = URL_VALIDATOR.isValid(url);
    setUrlError(isValid ? '' : translations.urlInvalid);
    return isValid;
  };

  const handleTextInput = (value, questionId) => {
    if (type === 'url') {
      const isValid = validateAndHandleUrl(value);
      if (isValid && value) {
        onAnswer(URL_VALIDATOR.clean(value), questionId);
      } else {
        onAnswer(value, questionId);
      }
    } else if (type === 'open_text') {
      const words = value.split(/\s+/).filter(Boolean).length;
      if (!maxWords || words <= maxWords) {
        onAnswer(value, questionId);
      }
    } else {
      onAnswer(value, questionId);
    }
  };

  const baseButtonStyles = `
    w-full text-left px-4 py-2 rounded transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base
    relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50
  `;

  const selectedButtonStyles = `bg-accent-500 shadow-lg text-white`;
  const unselectedButtonStyles = `bg-gray-100 hover:bg-gray-200 text-primary-900 hover:shadow-md`;

  const inputStyles = (hasError) => `
    w-full px-3 py-2 bg-gray-100 rounded text-sm md:text-base text-primary-900 
    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
    focus:ring-1 focus:ring-accent-100 focus:ring-opacity-80
    border ${hasError ? 'border-red-500' : 'border-primary-300 focus:border-accent-500'}
  `;

  // ------------------------------
  // Render multiselect option
  // ------------------------------
  const renderMultiselectOption = (option) => {
    const isOther = option.value === 'other';
    const isSelected =
      Array.isArray(answer) &&
      answer.some((ans) =>
        isOther ? ans === 'other' || ans.startsWith('other:') : ans === option.value
      );
    const selectedCount = Array.isArray(answer) ? answer.length : 0;
    const disableOption = selectedCount >= maxSelection && !isSelected;
    const otherValue = otherTextMap[`${id}-other`] || '';
    const otherError = otherErrorMap[`${id}-other`] || '';
    const wordCount = otherValue.split(/\s+/).filter(Boolean).length;

    return (
      <div key={option.value} className="flex flex-col">
        <button
          onClick={() => {
            let updatedAnswers = Array.isArray(answer) ? [...answer] : [];
            if (isOther) {
              if (isSelected) {
                updatedAnswers = updatedAnswers.filter(
                  (val) => !(val === 'other' || val.startsWith('other:'))
                );
                setOtherTextMap((prev) => ({ ...prev, [`${id}-other`]: '' }));
              } else if (!disableOption) {
                // Remove any previous "other" values
                updatedAnswers = updatedAnswers.filter(
                  (val) => !(val === 'other' || val.startsWith('other:'))
                );
                if (otherValue !== '') {
                  updatedAnswers.push(`other:${otherValue}`);
                } else {
                  updatedAnswers.push('other');
                }
              }
            } else {
              if (isSelected) {
                updatedAnswers = updatedAnswers.filter((val) => val !== option.value);
              } else if (!disableOption) {
                updatedAnswers.push(option.value);
              }
            }
            onAnswer(updatedAnswers, id);
          }}
          disabled={disabled || disableOption}
          className={`${baseButtonStyles} ${isSelected ? selectedButtonStyles : unselectedButtonStyles}`}
          aria-label={option.label}
          aria-disabled={disabled || disableOption}
        >
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg">{option.label}</span>
            {isSelected && <Check className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        </button>

        {isOther && isSelected && (
          <div className="space-y-2 mt-2">
            <input
              type="text"
              placeholder={translations.otherPlaceholder}
              value={otherValue}
              onChange={(e) => handleOtherInputChange(e.target.value)}
              disabled={disabled}
              className={inputStyles(!!otherError)}
              aria-label={translations.otherPlaceholder}
              autoFocus
            />
            {maxWords && (
              <p className="text-xs md:text-sm text-primary-600">
                {`${wordCount}/${maxWords} ${language === 'it' ? 'parole' : 'words'}`}
              </p>
            )}
            {otherError && (
              <p className="text-red-500 text-xs italic mt-2">{otherError}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  // ------------------------------
  // Render single-choice option
  // ------------------------------
  const renderChoiceOption = (option) => {
    const isSelected = answer === option.value;
    const isOther = option.value === 'other';
    const otherValue = otherTextMap[`${id}-other`] || '';
    const otherError = otherErrorMap[`${id}-other`] || '';

    return (
      <div key={option.value} className="flex flex-col">
        <button
          onClick={() => {
            const value = isOther
              ? (otherValue !== '' ? `other:${otherValue}` : 'other')
              : option.value;
            onAnswer(value, id);
          }}
          disabled={disabled}
          className={`${baseButtonStyles} ${isSelected ? selectedButtonStyles : unselectedButtonStyles}`}
          aria-label={option.label}
          aria-disabled={disabled}
        >
          <div className="flex items-center justify-between">
            <span className="text-base md:text-lg">{option.label}</span>
            {isSelected && <Check className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
        </button>
        {isOther && isSelected && (
          <div className="space-y-2 mt-2">
            <input
              type="text"
              placeholder={translations.otherPlaceholder}
              value={otherValue}
              onChange={(e) => handleOtherInputChange(e.target.value)}
              disabled={disabled}
              className={inputStyles(!!otherError)}
              aria-label={translations.otherPlaceholder}
              autoFocus
            />
            {otherError && (
              <p className="text-red-500 text-xs md:text-sm">{otherError}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  // ------------------------------
  // Handler for "other" input changes (preserving spaces)
  // ------------------------------
  const handleOtherInputChange = (value) => {
    const stateKey = `${id}-other`;
    setOtherTextMap((prev) => ({ ...prev, [stateKey]: value }));

    const words = value.split(/\s+/).filter((word) => word.length > 0).length;
    if (maxWords && words > maxWords) {
      setOtherErrorMap((prev) => ({
        ...prev,
        [stateKey]:
          language === 'it'
            ? 'Hai superato il limite di parole'
            : 'You have exceeded the word limit',
      }));
      return;
    }
    setOtherErrorMap((prev) => ({ ...prev, [stateKey]: '' }));

    if (Array.isArray(answer)) {
      const updatedAnswers = answer.map((a) =>
        a === 'other' || a.startsWith('other:')
          ? value !== '' ? `other:${value}` : 'other'
          : a
      );
      onAnswer(updatedAnswers, id);
    } else if (typeof answer === 'string' && (answer === 'other' || answer.startsWith('other:'))) {
      onAnswer(value !== '' ? `other:${value}` : 'other', id);
    }
  };

  const isComplete = useMemo(() => {
    if (type === 'url') {
      if (validation?.required && (!answer || !answer)) return false;
      return !!answer && !urlError;
    }
    if (type === 'open_text') {
      if (validation?.required && (!answer || !answer)) return false;
      if (maxWords) {
        const wordCount = answer.split(/\s+/).filter(Boolean).length || 0;
        if (wordCount > maxWords) return false;
      }
      return true;
    }
    if (type === 'choice') {
      if (validation?.required && (!answer || !answer.toString())) return false;
      if (typeof answer === 'string' && answer.startsWith('other:')) {
        return answer !== 'other';
      }
      return true;
    }
    if (type === 'multiselect') {
      if (validation?.required && (!Array.isArray(answer) || answer.length === 0)) return false;
      if (Array.isArray(answer)) {
        for (const ans of answer) {
          if (ans === 'other') return false;
        }
      }
      return true;
    }
    return true;
  }, [answer, type, urlError, maxWords, validation]);

  useEffect(() => {
    if (typeof onValidityChange === 'function') {
      onValidityChange(isComplete);
    }
  }, [isComplete, onValidityChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg md:text-xl text-primary-900">
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
          <p className="text-xs md:text-sm text-primary-600">{translations.multiSelect}</p>
        )}
      </div>

      <div className="space-y-3">
        {type === 'choice' && options.map((option) => renderChoiceOption(option))}
        {type === 'multiselect' && options.map((option) => renderMultiselectOption(option))}
        {(type === 'url' || type === 'open_text') && (
          <div className="space-y-2">
            <input
              type={type === 'url' ? 'url' : 'text'}
              value={answer || ''}
              onChange={(e) => handleTextInput(e.target.value, id)}
              onBlur={() => type === 'url' && answer && validateAndHandleUrl(answer)}
              placeholder={placeholder}
              disabled={disabled}
              className={`
                w-full px-3 py-2 bg-gray-100 rounded text-sm md:text-base text-primary-900 
                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                focus:ring-1 focus:ring-accent-100 focus:ring-opacity-80 border ${
                  urlError ? 'border-red-500' : 'border-primary-300 focus:border-accent-500'
                }
              `}
              aria-label={placeholder}
            />
            {urlError && (
              <p className="text-red-500 text-xs md:text-sm">{urlError}</p>
            )}
            {type === 'open_text' && maxWords && (
              <p className="text-xs md:text-sm text-primary-600">
                {language === 'it'
                  ? `${(answer || '').split(/\s+/).filter(Boolean).length}/${maxWords} parole`
                  : `${(answer || '').split(/\s+/).filter(Boolean).length}/${maxWords} words`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAssessmentFormQuestion;
