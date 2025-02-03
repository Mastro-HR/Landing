import React, { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, UserCheck, ClipboardCheck, Target, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { valuePropositionTranslations } from '@/constants/valueprop_translations';
import { useMediaQuery } from 'react-responsive';

const SolutionCard = memo(({ 
  icon: Icon, 
  title, 
  problem, 
  improvement, 
  route,
  isActive,
  stepNumber,
  setActiveStep,
  position,
  id
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { language } = useLanguage();
  const t = useMemo(() => valuePropositionTranslations[language], [language]);
  
  const handleButtonClick = useCallback((e, path) => {
    e.stopPropagation();
    navigate(path || route);
  }, [navigate, route]);

  const getButtonText = useCallback(() => {
    if (id === 'matchExpert') {
      return t.buttons.access_experts;
    }
    return `${t.buttons.try_now} ${t.buttons.step} ${stepNumber}`;
  }, [id, stepNumber, t.buttons]);

  return (
    <div 
      className={`
        absolute w-full transition-all duration-500 ease-out
        ${isMobile ? 'max-w-[60vw]' : 'max-w-md'}
        ${position === 'center' ? 'z-20 scale-100 opacity-100' : 
          position === 'hidden' ? 'opacity-0 scale-75' :
          'z-10 scale-90 opacity-75'}
        ${position === 'left' ? '-translate-x-[30%]' : 
          position === 'right' ? 'translate-x-[30%]' : ''}
      `}
      onClick={() => position !== 'center' && setActiveStep(stepNumber - 1)}>
      <div className={`
        bg-white rounded-xl p-4 sm:p-6 border cursor-pointer
        transform transition-all duration-200
        ${isActive ? 'border-accent-500 shadow-lg sm:shadow-xl' : 'border-gray-200 shadow-sm'}
        ${position === 'center' ? 'h-full' : 'h-[90%] mt-2'}
      `}>
        <div className="absolute -top-3 left-4 bg-accent-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
          {t.buttons.step} {stepNumber}
        </div>
        
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6 mt-1 sm:mt-3">
          <div className={`
            p-2 sm:p-3 rounded-lg flex-shrink-0
            ${isActive ? 'bg-accent-100' : 'bg-accent-50'}
          `}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-primary-900">{title}</h3>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2 sm:space-y-3">
            <p className="text-primary-600 text-xs sm:text-sm leading-relaxed text-center">
              {problem}
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent" />

          <div className="space-y-2 sm:space-y-3">
            <p className="text-accent-600 text-xs sm:text-sm leading-relaxed font-medium text-center">
              {improvement}
            </p>
          </div>
        </div>

        {isActive && (
          <button
            onClick={(e) => handleButtonClick(e, id === 'matchExpert' ? '/contact-sales' : undefined)}
            className="mt-4 sm:mt-6 w-full flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-accent-500 text-white font-medium hover:bg-accent-600 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base">
            <span>{getButtonText()}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
});


const getCardPosition = (index, activeStep, totalSteps) => {
  let relativePosition = index - activeStep;
  
  if (relativePosition > totalSteps / 2) {
    relativePosition -= totalSteps;
  } else if (relativePosition < -totalSteps / 2) {
    relativePosition += totalSteps;
  }

  if (relativePosition === 0) return 'center';
  if (relativePosition === 1 || relativePosition === -(totalSteps - 1)) return 'right';
  if (relativePosition === -1 || relativePosition === (totalSteps - 1)) return 'left';
  return 'hidden';
};

const ProgressIndicator = memo(({ currentStep, totalSteps, onStepChange }) => (
  <div className="flex justify-center gap-2 mb-6 sm:mb-8 overflow-x-hidden">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <button
        key={index}
        onClick={() => onStepChange(index)}
        className={`
          h-2 rounded-full transition-all duration-200
          ${index === currentStep ? 'w-8 bg-accent-500' : 'w-2 bg-accent-200'}
        `}
        aria-label={`Step ${index + 1}`}
      />
    ))}
  </div>
));

const SolutionSteps = () => {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const t = useMemo(() => valuePropositionTranslations[language], [language]);

  const steps = useMemo(() => [
    {
      id: 'hiring_context',
      icon: FileText,
      route: '/ai_form/hiring_context',
      ...t.sections.hiring_context
    },
    {
      id: 'candidateProfile',
      icon: UserCheck,
      route: '/ai_form/candidate_profile',
      ...t.sections.candidateProfile
    },
    {
      id: 'hiringAssessment',
      icon: ClipboardCheck,
      route: '/ai_form/test_assessment',
      ...t.sections.hiringAssessment
    },
    {
      id: 'matchExpert',
      icon: Target,
      route: '/contact-sales',
      ...t.sections.matchExpert
    }
  ], [t.sections]);

  const handleStepChange = useCallback((newStep) => {
    setActiveStep(newStep);
    setIsAutoRotating(false);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep(prev => (prev + 1) % steps.length);
    setIsAutoRotating(false);
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setActiveStep(prev => (prev - 1 + steps.length) % steps.length);
    setIsAutoRotating(false);
  }, [steps.length]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    if (Math.abs(deltaX) > 30) {
      deltaX > 0 ? handleNext() : handlePrev();
    }
  };

  useEffect(() => {
    let intervalId;
    if (isAutoRotating && !isMobile) {
      intervalId = setInterval(handleNext, 5000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [isAutoRotating, handleNext, isMobile]);

  return (
    <div className="h-screen bg-gradient-to-b from-white to-accent-100 py-24 sm:py-16 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-2 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4 sm:mb-6">
            {t.title.line1}
            <span className="block bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent">
              {t.title.line2}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-primary-500 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="relative h-[500px] sm:h-[600px] overflow-x-hidden">
          <div 
            className="relative h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            {steps.map((step, index) => {
              const position = getCardPosition(index, activeStep, steps.length);
              return (
                <SolutionCard
                  key={step.id}
                  {...step}
                  isActive={index === activeStep}
                  stepNumber={index + 1}
                  setActiveStep={handleStepChange}
                  position={position}
                />
              );
            })}
          </div>

          <div className="flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-2 sm:px-4">
            <button
              onClick={handlePrev}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md sm:shadow-xl hover:bg-accent-50">
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-accent-600" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 sm:p-3 rounded-full bg-white shadow-md sm:shadow-xl hover:bg-accent-50">
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-accent-600" />
            </button>
          </div>
        </div>

        <ProgressIndicator
          currentStep={activeStep}
          totalSteps={steps.length}
          onStepChange={handleStepChange}
        />
      </div>
    </div>
  );
};

export default memo(SolutionSteps);