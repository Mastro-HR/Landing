import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';

const CONFIG = {
  TIMING: {
    TOTAL_DURATION: 24000,
    STEP_DURATION: 6000,
    COMPLETION_DELAY: 300,
    ANIMATION_DURATION: 0.8,
  },
  DIMENSIONS: {
    DESKTOP: { CIRCLE_SIZE: 120, STROKE_WIDTH: 6, ICON_SIZE: 32 },
    TABLET: { CIRCLE_SIZE: 100, STROKE_WIDTH: 5, ICON_SIZE: 28 },
    MOBILE: { CIRCLE_SIZE: 84, STROKE_WIDTH: 4, ICON_SIZE: 26 },
  },
  COLORS: {
    accent: 'text-accent-500',
    success: 'text-green-500',
    error: 'text-red-500',
    text: 'text-gray-700 dark:text-gray-200',
    subtext: 'text-gray-500 dark:text-gray-400',
  }
};

const TRANSLATIONS = {
  en: {
    steps: [
      { id: 'preparation', message: 'Retrieving company data...' },
      { id: 'analysis', message: 'Analyzing data...' },
      { id: 'processing', message: 'Creating executive test assessment...' },
      { id: 'finalizing', message: 'Finalizing c-suite assessment...' }
    ],
    complete: 'Complete!',
    error: 'An error occurred. Please try again.',
    retry: 'Retry'
  },
  it: {
    steps: [
      { id: 'preparation', message: 'Ricerca dati aziendali...' },
      { id: 'analysis', message: 'Analisi dei dati aziendali...' },
      { id: 'processing', message: 'Creazione test esecutivo...' },
      { id: 'finalizing', message: 'Finalizzazione criteri di valutazione...' }
    ],
    complete: 'Completato!',
    error: 'Si è verificato un errore. Riprova.',
    retry: 'Riprova'
  }
};

const useResponsiveConfig = () => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return useMemo(() => ({
    dimensions: isMobile 
      ? CONFIG.DIMENSIONS.MOBILE 
      : isTablet 
      ? CONFIG.DIMENSIONS.TABLET 
      : CONFIG.DIMENSIONS.DESKTOP,
    isMobile,
    containerStyle: isMobile ? {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '0 16px'
    } : {
      maxWidth: '28rem',
      padding: '1.5rem'
    }
  }), [isMobile, isTablet]);
};

const EnhancedLoader = ({
  onComplete,
  className = '',
  errorMessage,
  retryEnabled = true,
  customSteps
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('loading');
  const startTimeRef = useRef(Date.now());
  const progressRef = useRef(null);
  const completionTimeout = useRef(null);
  const { dimensions, isMobile, containerStyle } = useResponsiveConfig();
  
  const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
  const steps = customSteps || translations.steps;

  const radius = (dimensions.CIRCLE_SIZE - dimensions.STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const handleCompletion = useCallback(() => {
    setProgress(1);
    completionTimeout.current = setTimeout(() => {
      setStatus('complete');
      onComplete?.();
    }, CONFIG.TIMING.COMPLETION_DELAY);
  }, [onComplete]);

  const calculateProgress = useCallback(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    
    const currentStepIndex = Math.min(
      Math.floor(elapsedTime / CONFIG.TIMING.STEP_DURATION),
      steps.length - 1
    );
    
    const stepProgress = (elapsedTime % CONFIG.TIMING.STEP_DURATION) / CONFIG.TIMING.STEP_DURATION;
    const overallProgress = Math.min(
      1,
      currentStepIndex >= steps.length - 1
        ? (currentStepIndex + stepProgress) / steps.length
        : currentStepIndex / steps.length + (stepProgress / steps.length)
    );

    setCurrentStep(currentStepIndex);
    setProgress(overallProgress);

    if (elapsedTime >= CONFIG.TIMING.TOTAL_DURATION) {
      handleCompletion();
      return;
    }

    progressRef.current = requestAnimationFrame(calculateProgress);
  }, [steps.length, handleCompletion]);

  useEffect(() => {
    if (status === 'loading') {
      progressRef.current = requestAnimationFrame(calculateProgress);
    }
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
      if (completionTimeout.current) clearTimeout(completionTimeout.current);
    };
  }, [status, calculateProgress]);

  const handleRetry = useCallback(() => {
    if (completionTimeout.current) clearTimeout(completionTimeout.current);
    setStatus('loading');
    setProgress(0);
    setCurrentStep(0);
    startTimeRef.current = Date.now();
    progressRef.current = requestAnimationFrame(calculateProgress);
  }, [calculateProgress]);

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div 
        className="w-full h-full flex items-center justify-center"
        style={containerStyle}
      >
        <motion.div
          className={`flex flex-col items-center ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="alert"
          aria-live="polite"
        >
          <div
            className="relative"
            style={{ width: dimensions.CIRCLE_SIZE, height: dimensions.CIRCLE_SIZE }}
          >
            <svg
              className="transform -rotate-90"
              width={dimensions.CIRCLE_SIZE}
              height={dimensions.CIRCLE_SIZE}
              aria-hidden="true"
            >
              <circle
                cx={dimensions.CIRCLE_SIZE / 2}
                cy={dimensions.CIRCLE_SIZE / 2}
                r={radius}
                className="stroke-gray-100"
                strokeWidth={dimensions.STROKE_WIDTH}
                fill="none"
              />
              <motion.circle
                cx={dimensions.CIRCLE_SIZE / 2}
                cy={dimensions.CIRCLE_SIZE / 2}
                r={radius}
                className={`stroke-current ${
                  status === 'error'
                    ? CONFIG.COLORS.error
                    : status === 'complete'
                    ? CONFIG.COLORS.success
                    : CONFIG.COLORS.accent
                }`}
                strokeWidth={dimensions.STROKE_WIDTH}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: CONFIG.TIMING.ANIMATION_DURATION, ease: 'linear' }}
              />
            </svg>

            <AnimatePresence mode="wait">
              {(status === 'complete' || status === 'error') && (
                <motion.div
                  key={status}
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  {status === 'complete' ? (
                    <CheckCircle2 className={CONFIG.COLORS.success} size={dimensions.ICON_SIZE} />
                  ) : (
                    <AlertCircle className={CONFIG.COLORS.error} size={dimensions.ICON_SIZE} />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${status}-${currentStep}`}
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className={`text-base font-medium text-gray-400`}>
                {status === 'complete'
                  ? translations.complete
                  : status === 'error'
                  ? (errorMessage || translations.error)
                  : steps[currentStep].message}
              </p>
              {status === 'loading' && (
                <p className="mt-2 text-sm font-medium text-gray-400">
                  {Math.round(progress * 100)}%
                </p>
              )}
              {status === 'error' && retryEnabled && (
                <button
                  onClick={handleRetry}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-accent-500 rounded-md 
                    hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 
                    transition-colors"
                  aria-label="Retry loading"
                >
                  {translations.retry}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

EnhancedLoader.propTypes = {
  onComplete: PropTypes.func,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  retryEnabled: PropTypes.bool,
  customSteps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  )
};

export default React.memo(EnhancedLoader);