// pages/InterviewProcess.jsx
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './Translations';
import { StepHeader } from './StepHeader';
import EmailContent from './EmailContent';
import AssessmentContent from './AssessmentContent';
import ReportContent from './ReportContent';
import ExecutiveEvaluationDashboard from './MatchContent';
import { useLanguage } from '@/context/LanguageContext';

const LanguageTransition = React.memo(({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ 
      duration: 0.3, 
      ease: 'easeInOut' 
    }}
    className="w-full"
  >
    {children}
  </motion.div>
));

LanguageTransition.displayName = 'LanguageTransition';

const AnimatedStepSection = React.memo(({ 
  number, 
  stepKey, 
  translations, 
  children, 
  isLast 
}) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-8 sm:mb-12 last:mb-0"
  >
    <StepHeader 
      number={number} 
      title={translations.steps[stepKey].title}
      description={translations.steps[stepKey].description}
      isLast={isLast}
    >
      {children}
    </StepHeader>
  </motion.section>
));

AnimatedStepSection.displayName = 'AnimatedStepSection';

const HeaderSection = React.memo(({ firstHalf, secondHalf, subtitle, languageKey }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={languageKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center max-w-4xl mx-auto 
                 border-b border-gray-800 pb-8 sm:pb-12"
    >
      <LanguageTransition>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold 
                     mb-4 sm:mb-6 flex flex-wrap justify-center gap-x-3">
          <span className="text-white">{firstHalf}</span>
          <span className="text-accent-500">{secondHalf}</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-gray-100">
          {subtitle}
        </p>
      </LanguageTransition>
    </motion.div>
  </AnimatePresence>
));

HeaderSection.displayName = 'HeaderSection';

const ProcessSteps = React.memo(({ languageKey, translations }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={`content-${languageKey}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="space-y-8 sm:space-y-12"
    >
      <AnimatedStepSection
        number="1"
        stepKey="step1"
        translations={translations}
      >
        <EmailContent />
      </AnimatedStepSection>

      <AnimatedStepSection
        number="2"
        stepKey="step2"
        translations={translations}
      >
        <AssessmentContent />
      </AnimatedStepSection>

      <AnimatedStepSection
        number="3"
        stepKey="step3"
        translations={translations}
      >
        <ReportContent />
      </AnimatedStepSection>

      <AnimatedStepSection
        number="4"
        stepKey="step4"
        translations={translations}
        isLast
      >
        <ExecutiveEvaluationDashboard />
      </AnimatedStepSection>
    </motion.div>
  </AnimatePresence>
));

ProcessSteps.displayName = 'ProcessSteps';

const InterviewProcess = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const { firstHalf, secondHalf } = useMemo(() => {
    const words = t.header.title.split(' ');
    const midpoint = Math.ceil(words.length / 2);
    return {
      firstHalf: words.slice(0, midpoint).join(' '),
      secondHalf: words.slice(midpoint).join(' ')
    };
  }, [t.header.title]);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-10 md:py-16 
                    space-y-12 sm:space-y-16">
        <HeaderSection
          firstHalf={firstHalf}
          secondHalf={secondHalf}
          subtitle={t.header.subtitle}
          languageKey={language}
        />
        
        <ProcessSteps 
          languageKey={language}
          translations={t}
        />
      </div>
    </div>
  );
};

export default React.memo(InterviewProcess);