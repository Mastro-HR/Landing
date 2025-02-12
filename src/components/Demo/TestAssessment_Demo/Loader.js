import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CONFIG = {
  TIMING: {
    TOTAL_DURATION: 2400,
    STEP_DURATION: 6000,
    COMPLETION_DELAY: 1000,
    ANIMATION_DURATION: 0.8,
  },
  DIMENSIONS: {
    DESKTOP: { CIRCLE_SIZE: 120, STROKE_WIDTH: 6, ICON_SIZE: 32 },
    TABLET: { CIRCLE_SIZE: 100, STROKE_WIDTH: 5, ICON_SIZE: 28 },
    MOBILE: { CIRCLE_SIZE: 80, STROKE_WIDTH: 4, ICON_SIZE: 28 },
  },
  COLORS: {
    accent: 'text-accent-500',
    success: 'text-green-500',
    error: 'text-red-500',
    text: 'text-gray-700 dark:text-gray-200',
    subtext: 'text-gray-500 dark:text-gray-400',
  },
};

const TRANSLATIONS = {
  en: {
    steps: [
      { id: 'preparation', message: 'Retrieving company data...' },
      { id: 'analysis', message: 'Analyzing data...' },
      { id: 'processing', message: 'Creating executive test assessment...' },
      { id: 'finalizing', message: 'Finalizing assessment...' }
    ],
    complete: 'Complete!',
    error: 'An error occurred. Please try again.',
    retry: 'Retry'
  },
  it: {
    steps: [
      { id: 'preparation', message: 'Ricerca dati aziendali...' },
      { id: 'analysis', message: 'Analisi dei dati...' },
      { id: 'processing', message: 'Creazione test valutazione competenze esecutive...' },
      { id: 'finalizing', message: 'Finalizzazione test esecutivo...' }
    ],
    complete: 'Completato!',
    error: 'Si è verificato un errore. Riprova.',
    retry: 'Riprova'
  }
};

// Custom hook for managing loader state
const useLoaderState = (steps, onComplete) => {
  const [state, setState] = useState({
    currentStep: 0,
    progress: 0,
    status: 'loading'
  });

  const startTimeRef = useRef(Date.now());
  const progressRef = useRef(null);
  const completionTimeout = useRef(null);

  const handleCompletion = useCallback(() => {
    setState(prev => ({ ...prev, progress: 1 }));
    completionTimeout.current = setTimeout(() => {
      setState(prev => ({ ...prev, status: 'complete' }));
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
      currentStepIndex / steps.length + (stepProgress / steps.length)
    );

    setState(prev => ({
      ...prev,
      currentStep: currentStepIndex,
      progress: overallProgress
    }));

    if (elapsedTime >= CONFIG.TIMING.TOTAL_DURATION) {
      handleCompletion();
      return;
    }

    progressRef.current = requestAnimationFrame(calculateProgress);
  }, [steps.length, handleCompletion]);

  const handleRetry = useCallback(() => {
    if (completionTimeout.current) {
      clearTimeout(completionTimeout.current);
    }
    setState({
      currentStep: 0,
      progress: 0,
      status: 'loading'
    });
    startTimeRef.current = Date.now();
    progressRef.current = requestAnimationFrame(calculateProgress);
  }, [calculateProgress]);

  useEffect(() => {
    if (state.status === 'loading') {
      progressRef.current = requestAnimationFrame(calculateProgress);
    }
    
    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
      if (completionTimeout.current) {
        clearTimeout(completionTimeout.current);
      }
    };
  }, [state.status, calculateProgress]);

  return { state, handleRetry };
};

// Custom hook for responsive configuration
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
    containerClasses: isMobile 
      ? 'p-4 mx-3 space-y-4' 
      : 'p-6 mx-4 space-y-6',
    textClasses: isMobile 
      ? 'text-sm mt-4' 
      : 'text-base mt-6'
  }), [isMobile, isTablet]);
};

const EnhancedLoader = ({
  onComplete,
  className = '',
  errorMessage,
  retryEnabled = true,
  customSteps,
  language = 'en'
}) => {
  const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
  const steps = customSteps || translations.steps;
  const { dimensions, isMobile, containerClasses, textClasses } = useResponsiveConfig();
  const { state, handleRetry } = useLoaderState(steps, onComplete);
  const { currentStep, progress, status } = state;

  const radius = (dimensions.CIRCLE_SIZE - dimensions.STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="alert"
      aria-live="polite"
    >
      {/* Backdrop with consistent blur effect */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md" />
      
      <div className={`relative flex flex-col items-center ${containerClasses} bg-white dark:bg-gray-800 max-w-md w-full rounded-lg shadow-xl ${className}`}>
        <div
          className="relative flex items-center justify-center"
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
              className="stroke-gray-100 dark:stroke-gray-700"
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
            className={`text-center ${textClasses}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className={`font-medium ${CONFIG.COLORS.text}`}>
              {status === 'complete'
                ? translations.complete
                : status === 'error'
                ? (errorMessage || translations.error)
                : steps[currentStep].message}
            </p>
            {status === 'loading' && (
              <p className={`mt-2 ${isMobile ? 'text-xs' : 'text-sm'} font-medium ${CONFIG.COLORS.subtext}`}>
                {Math.round(progress * 100)}%
              </p>
            )}
            {status === 'error' && retryEnabled && (
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-accent-500 rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
                aria-label="Retry loading"
              >
                {translations.retry}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
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
  ),
  language: PropTypes.oneOf(['en', 'it'])
};

export default React.memo(EnhancedLoader);