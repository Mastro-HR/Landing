import React, { useState, useEffect, useMemo } from 'react';
import { Loader } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TRANSITION_DURATION = 3000; // Duration for each step
const TYPING_DURATION = 90; // Speed of the typing effect

const messages = {
  en: [
    'Analyzing company insights...',
    'Defining strategic candidate specifications...',
    'Evaluating business impact...',
    'Preparing hiring context...',
    'Finalizing analysis...'
  ],
  it: [
    'Analisi dati aziendali...',
    'Generazione raccomandazioni...',
    'Analisi impatto business...',
    'Preparazione contesto...',
    'Finalizzazione analisi...'
  ]
};

const AnimatedLoader = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentMessages = useMemo(() => messages[language] || messages.en, [language]);

  useEffect(() => {
    if (isComplete || currentIndex >= currentMessages.length) return;

    const currentMessage = currentMessages[currentIndex];
    const typingInterval = setInterval(() => {
      if (typingIndex < currentMessage.length) {
        setDisplayText(currentMessage.substring(0, typingIndex + 1));
        setTypingIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          if (currentIndex + 1 < currentMessages.length) {
            setCurrentIndex((prev) => prev + 1);
            setTypingIndex(0);
            setDisplayText('');
          } else {
            setIsComplete(true);
          }
        }, 5500);
      }
    }, TYPING_DURATION);

    return () => clearInterval(typingInterval);
  }, [currentIndex, typingIndex, currentMessages, isComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {!isComplete ? (
            <>
              <Loader className="w-8 h-8 text-accent-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-accent-500 rounded-full animate-pulse" />
              </div>
            </>
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-full">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            {!isComplete ? (
              <>
                {displayText}
                <span className="ml-1 inline-block w-1 h-5 bg-gray-900 animate-blink" />
              </>
            ) : (
              'Analysis complete!'
            )}
          </p>
        </div>
      </div>

      {!isComplete && (
        <div className="mt-6 text-sm text-gray-500">
          {currentIndex + 1} / {currentMessages.length}
        </div>
      )}
    </div>
  );
};

export default AnimatedLoader;