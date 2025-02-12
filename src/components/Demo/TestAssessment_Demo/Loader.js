import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';

/* ---------------------------------- CONFIG --------------------------------- */
const CONFIG = {
  TIMING: {
    TOTAL_DURATION: 24000,
    STEP_DURATION: 6000,
    COMPLETION_DELAY: 300,
    ANIMATION_DURATION: 0.8,
    OVERLAY_FADE_DURATION: 0.4
  },
  DIMENSIONS: {
    DESKTOP: { CIRCLE_SIZE: 120, STROKE_WIDTH: 6, ICON_SIZE: 32 },
    TABLET: { CIRCLE_SIZE: 100, STROKE_WIDTH: 5, ICON_SIZE: 28 },
    MOBILE: { CIRCLE_SIZE: 84, STROKE_WIDTH: 4, ICON_SIZE: 26 }
  },
  COLORS: {
    accent: 'text-accent-500',
    success: 'text-green-500',
    error: 'text-red-500',
    text: 'text-gray-400',
    background: 'bg-white' // or "bg-white/90" if you want slight transparency
  }
};

/* ------------------------------- TRANSLATIONS ------------------------------- */
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

/* --------------------------- USE RESPONSIVE CONFIG -------------------------- */
const useResponsiveConfig = () => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 640px)');

  return useMemo(
    () => ({
      dimensions: isMobile
        ? CONFIG.DIMENSIONS.MOBILE
        : isTablet
        ? CONFIG.DIMENSIONS.TABLET
        : CONFIG.DIMENSIONS.DESKTOP
    }),
    [isMobile, isTablet]
  );
};

/* ------------------------------ LOADER CONTENT ------------------------------ */
const LoaderContent = ({
  dimensions,
  radius,
  status,
  strokeDashoffset,
  circumference,
  progress,
  currentStep,
  translations,
  steps,
  errorMessage,
  retryEnabled,
  handleRetry
}) => (
  <div className="flex flex-col items-center justify-center">
    {/* Circular Progress + Status Icons */}
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
        {/* Background track */}
        <circle
          cx={dimensions.CIRCLE_SIZE / 2}
          cy={dimensions.CIRCLE_SIZE / 2}
          r={radius}
          className="stroke-gray-100"
          strokeWidth={dimensions.STROKE_WIDTH}
          fill="none"
        />
        {/* Progress indicator */}
        <motion.circle
          cx={dimensions.CIRCLE_SIZE / 2}
          cy={dimensions.CIRCLE_SIZE / 2}
          r={radius}
          strokeWidth={dimensions.STROKE_WIDTH}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: CONFIG.TIMING.ANIMATION_DURATION, ease: 'linear' }}
          className={`stroke-current ${
            status === 'error'
              ? CONFIG.COLORS.error
              : status === 'complete'
              ? CONFIG.COLORS.success
              : CONFIG.COLORS.accent
          }`}
        />
      </svg>

      {/* Success or Error Icon */}
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
              <CheckCircle2
                className={CONFIG.COLORS.success}
                size={dimensions.ICON_SIZE}
              />
            ) : (
              <AlertCircle
                className={CONFIG.COLORS.error}
                size={dimensions.ICON_SIZE}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>

    {/* Step Message & Percentage or Retry */}
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
            ? errorMessage || translations.error
            : steps[currentStep]?.message}
        </p>

        {status === 'loading' && (
          <p className={`mt-2 text-sm font-medium ${CONFIG.COLORS.text}`}>
            {Math.round(progress * 100)}%
          </p>
        )}

        {status === 'error' && retryEnabled && (
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-accent-500 rounded-md
                       hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-accent-500 transition-colors"
            aria-label="Retry loading"
          >
            {translations.retry}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
);

LoaderContent.propTypes = {
  dimensions: PropTypes.object.isRequired,
  radius: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['loading', 'complete', 'error']).isRequired,
  strokeDashoffset: PropTypes.number.isRequired,
  circumference: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  translations: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  errorMessage: PropTypes.string,
  retryEnabled: PropTypes.bool,
  handleRetry: PropTypes.func
};

/* ------------------------------ ENHANCED LOADER ----------------------------- */
const EnhancedLoader = ({
  onComplete,
  className = '',
  errorMessage,
  retryEnabled = true,
  customSteps
}) => {
  const { language } = useLanguage();
  const { dimensions } = useResponsiveConfig();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('loading');

  const startTimeRef = useRef(Date.now());
  const requestRef = useRef(null);
  const completionTimeoutRef = useRef(null);

  const translations = TRANSLATIONS[language] || TRANSLATIONS.en;
  const steps = customSteps || translations.steps;

  // Circle geometry
  const radius = (dimensions.CIRCLE_SIZE - dimensions.STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  /* --------------------------- Handle Completion --------------------------- */
  const handleCompletion = useCallback(() => {
    // Force progress to 100% visually
    setProgress(1);
    completionTimeoutRef.current = setTimeout(() => {
      setStatus('complete');
      onComplete?.();
    }, CONFIG.TIMING.COMPLETION_DELAY);
  }, [onComplete]);

  /* -------------------------- Calculate Progress --------------------------- */
  const calculateProgress = useCallback(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTimeRef.current;

    // Determine which step we are currently on
    const currentStepIndex = Math.min(
      Math.floor(elapsedTime / CONFIG.TIMING.STEP_DURATION),
      steps.length - 1
    );
    setCurrentStep(currentStepIndex);

    // Fraction of current step progress
    const stepProgress =
      (elapsedTime % CONFIG.TIMING.STEP_DURATION) / CONFIG.TIMING.STEP_DURATION;

    // Overall progress: clamp to 1
    const overallProgress = Math.min(
      1,
      currentStepIndex >= steps.length - 1
        ? currentStepIndex + stepProgress / steps.length
        : currentStepIndex / steps.length + stepProgress / steps.length
    );
    setProgress(overallProgress);

    // Check if we are done
    if (elapsedTime >= CONFIG.TIMING.TOTAL_DURATION) {
      handleCompletion();
    } else {
      requestRef.current = requestAnimationFrame(calculateProgress);
    }
  }, [steps.length, handleCompletion]);

  /* --------------------------- Start / Cleanup ---------------------------- */
  useEffect(() => {
    if (status === 'loading') {
      requestRef.current = requestAnimationFrame(calculateProgress);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
    };
  }, [status, calculateProgress]);

  /* ------------------------------ Handle Retry ---------------------------- */
  const handleRetry = useCallback(() => {
    if (completionTimeoutRef.current) {
      clearTimeout(completionTimeoutRef.current);
    }
    setStatus('loading');
    setProgress(0);
    setCurrentStep(0);
    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(calculateProgress);
  }, [calculateProgress]);

  return (
    <AnimatePresence>
      {/** 
       * We always show the loader when status is 'loading' or 'error' or 
       * 'complete'. If you want to hide it after complete, 
       * you can conditionally render based on your own logic.
       */}
      {status && (
        <motion.div
          key="enhanced-loader-backdrop"
          className={`fixed inset-0 z-50 flex items-center justify-center ${CONFIG.COLORS.background}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CONFIG.TIMING.OVERLAY_FADE_DURATION }}
        >
          <motion.div
            key="enhanced-loader-container"
            className={`w-full max-w-md ${className}`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: CONFIG.TIMING.ANIMATION_DURATION }}
          >
            <LoaderContent
              dimensions={dimensions}
              radius={radius}
              status={status}
              strokeDashoffset={strokeDashoffset}
              circumference={circumference}
              progress={progress}
              currentStep={currentStep}
              translations={translations}
              steps={steps}
              errorMessage={errorMessage}
              retryEnabled={retryEnabled}
              handleRetry={handleRetry}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
      message: PropTypes.string.isRequired
    })
  )
};

export default React.memo(EnhancedLoader);
