import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const CONFIG = {
  TIMING: {
    TOTAL_DURATION: 20000, // 16 seconds total
    STEP_DURATION: 5000,   // 4 seconds per step
    COMPLETION_DELAY: 300, // Delay before showing completion
    ANIMATION_DURATION: 0.8,
  },
  DIMENSIONS: {
    DESKTOP: { CIRCLE_SIZE: 120, STROKE_WIDTH: 6, ICON_SIZE: 32 },
    TABLET: { CIRCLE_SIZE: 100, STROKE_WIDTH: 5, ICON_SIZE: 28 },
    MOBILE: { CIRCLE_SIZE: 50, STROKE_WIDTH: 3, ICON_SIZE: 24 },
  },
  COLORS: {
    accent: 'text-accent-500',
    success: 'text-green-500',
    error: 'text-red-500',
    background: 'bg-white dark:bg-gray-900',
    text: 'text-gray-700 dark:text-gray-200',
    subtext: 'text-gray-500 dark:text-gray-400',
  },
};

const TRANSLATIONS = {
  en: {
    steps: [
      { id: 'preparation', message: 'Retrieving company data...' },
      { id: 'analysis', message: 'Analyzing data...' },
      { id: 'processing', message: 'Processing hiring context...' },
      { id: 'finalizing', message: 'Finalizing questions...' }
    ],
    complete: 'Complete!',
    error: 'An error occurred. Please try again.',
    retry: 'Retry'
  },
  it: {
    steps: [
      { id: 'preparation', message: 'Ricerca dati aziendali...' },
      { id: 'analysis', message: 'Analisi dei dati aziendali...' },
      { id: 'processing', message: 'Elaborazione contesto aziendale...' },
      { id: 'finalizing', message: 'Finalizzazione domande...' }
    ],
    complete: 'Completato!',
    error: 'Si è verificato un errore. Riprova.',
    retry: 'Riprova'
  }
};

const useLoaderDimensions = () => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');
  return isMobile ? CONFIG.DIMENSIONS.MOBILE : isTablet ? CONFIG.DIMENSIONS.TABLET : CONFIG.DIMENSIONS.DESKTOP;
};

const EnhancedLoader = ({
  onComplete,
  className = '',
  errorMessage,
  retryEnabled = true,
  customSteps,
  language = 'en'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('loading');
  const startTimeRef = useRef(Date.now());
  const progressRef = useRef(null);
  const completionTimeout = useRef(null);
  const dimensions = useLoaderDimensions();
  
  const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
  const steps = customSteps || translations.steps;

  const radius = useMemo(
    () => (dimensions.CIRCLE_SIZE - dimensions.STROKE_WIDTH) / 2,
    [dimensions]
  );
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const strokeDashoffset = circumference * (1 - progress);

  const handleCompletion = useCallback(() => {
    // Ensure we reach 100% before completing
    setProgress(1);
    // Wait for the progress animation to finish
    completionTimeout.current = setTimeout(() => {
      setStatus('complete');
      onComplete?.();
    }, 400); // Short delay to ensure circle completes
  }, [onComplete]);

  const calculateProgress = useCallback(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;
    
    // Calculate step progress
    const currentStepIndex = Math.min(
      Math.floor(elapsedTime / CONFIG.TIMING.STEP_DURATION),
      steps.length - 1
    );
    
    // Calculate progress within current step
    const stepProgress = (elapsedTime % CONFIG.TIMING.STEP_DURATION) / CONFIG.TIMING.STEP_DURATION;
    
    // Calculate overall progress ensuring we reach exactly 1 at completion
    let overallProgress;
    if (currentStepIndex >= steps.length - 1) {
      overallProgress = Math.min(1, (currentStepIndex + stepProgress) / steps.length);
    } else {
      overallProgress = currentStepIndex / steps.length + (stepProgress / steps.length);
    }

    setCurrentStep(currentStepIndex);
    setProgress(overallProgress);

    // Handle completion
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
    setStatus('loading');
    setProgress(0);
    setCurrentStep(0);
    startTimeRef.current = Date.now();
    progressRef.current = requestAnimationFrame(calculateProgress);
  }, [calculateProgress]);

  useEffect(() => {
    if (status === 'loading') {
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
  }, [status, calculateProgress]);

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${CONFIG.COLORS.background} bg-opacity-95 dark:bg-opacity-95 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex flex-col items-center p-6 bg-white max-w-md w-full mx-4">
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
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className={`text-base font-medium ${CONFIG.COLORS.text}`}>
              {status === 'complete'
                ? translations.complete
                : status === 'error'
                ? (errorMessage || translations.error)
                : steps[currentStep].message}
            </p>
            {status === 'loading' && (
              <p className={`mt-2 text-sm font-medium ${CONFIG.COLORS.subtext}`}>
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