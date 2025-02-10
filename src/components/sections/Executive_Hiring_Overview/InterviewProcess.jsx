import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import EmailContent from './EmailContent';
import AssessmentContent from './AssessmentContent';
import ReportContent from './ReportContent';
import ExecutiveEvaluationDashboard from './MatchContent';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from './Translations';

/* ----------------------------------
 *  Process Quadrant Component
 * ---------------------------------- */
const ProcessQuadrant = ({ title, description, number, onClick, position }) => (
  <motion.div
    className={`relative h-full border-primary-50/10 ${
      position.includes('right') ? '' : 'border-r'
    } ${position.includes('bottom') ? '' : 'border-b'}`}
  >
    <motion.button
      onClick={onClick}
      className="w-full h-full p-6 sm:p-8 md:p-12 text-left group relative focus:outline-none"
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-6 sm:mb-8">
          <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full 
            bg-accent-500/10 text-accent-500 font-semibold"
          >
            {number}
          </span>
          <div className="h-px flex-grow bg-primary-50/10 group-hover:bg-accent-500/20 transition-colors" />
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-4"
        >
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md 
          group-hover:text-gray-300 transition-colors line-clamp-3 sm:line-clamp-none"
        >
          {description}
        </p>
      </div>

      {/* Hover overlay background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-accent-500/5 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
      />
      
      {/* "Learn More" arrow on hover */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 right-6 sm:right-8 md:right-12 
        flex items-center space-x-2 opacity-0 group-hover:opacity-100 
        translate-x-4 group-hover:translate-x-0 transition-all duration-300"
      >
        <span className="text-accent-500 font-medium text-sm sm:text-base"></span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </motion.button>
  </motion.div>
);

/* ----------------------------------
 *  Step Content Component
 * ---------------------------------- */
const StepContent = ({ step }) => (
  <div className="space-y-6 sm:space-y-8">
    <header className="border-b border-primary-50/10 pb-4 sm:pb-6">
      <div className="flex items-start space-x-3 sm:space-x-4">
        <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
          rounded-full bg-accent-500/10 text-accent-500 font-semibold mt-1"
        >
          {String(step.id).padStart(2, '0')}
        </span>
        <div className="space-y-1 sm:space-y-2 min-w-0 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white truncate">
            {step.title}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
            {step.description}
          </p>
        </div>
      </div>
    </header>
    
    <div className="h-[calc(100vh-18rem)] sm:h-[calc(100vh-22rem)] overflow-y-auto 
      pr-2 sm:pr-6 -mr-2 sm:-mr-6 custom-scrollbar"
    >
      <div className="space-y-4 sm:space-y-6">
        {step.component && <step.component />}
      </div>
    </div>
  </div>
);

/* ----------------------------------
 *  Header Section Component
 * ---------------------------------- */
const HeaderSection = ({ firstHalf, secondHalf, subtitle, languageKey }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={languageKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center max-w-4xl mx-auto 
        border-b border-primary-50/10 pb-6 sm:pb-8 md:pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold 
          mb-3 sm:mb-4 md:mb-6 flex flex-wrap justify-center gap-x-3"
        >
          <span className="text-white">{firstHalf}</span>
          <span className="text-accent-500">{secondHalf}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-gray-100">
          {subtitle}
        </p>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

/* ----------------------------------
 *  Main Interview Process Component
 * ---------------------------------- */
const InterviewProcess = () => {
  const [selectedStep, setSelectedStep] = useState(null);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Split the title into two halves for styling
  const { firstHalf, secondHalf } = useMemo(() => {
    const words = t.header.title.split(' ');
    const midpoint = Math.ceil(words.length / 2);
    return {
      firstHalf: words.slice(0, midpoint).join(' '),
      secondHalf: words.slice(midpoint).join(' '),
    };
  }, [t.header.title]);

  // Define your steps dynamically for easy management
  const steps = [
    {
      id: 1,
      title: t.steps.step1.title,
      description: t.steps.step1.description,
      component: EmailContent,
    },
    {
      id: 2,
      title: t.steps.step2.title,
      description: t.steps.step2.description,
      component: AssessmentContent,
    },
    {
      id: 3,
      title: t.steps.step3.title,
      description: t.steps.step3.description,
      component: ReportContent,
    },
    {
      id: 4,
      title: t.steps.step4.title,
      description: t.steps.step4.description,
      component: ExecutiveEvaluationDashboard,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-24">
        
        {/* Header Section */}
        <HeaderSection
          firstHalf={firstHalf}
          secondHalf={secondHalf}
          subtitle={t.header.subtitle}
          languageKey={language}
        />

        {/* Quadrants */}
        <div
          className="mt-12 sm:mt-16 md:mt-24 rounded-2xl overflow-hidden border border-primary-50/10
            shadow-2xl backdrop-blur-sm bg-black/40"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {steps.map((step, index) => (
              <ProcessQuadrant
                key={step.id}
                number={String(index + 1).padStart(2, '0')}
                title={step.title}
                description={step.description}
                onClick={() => setSelectedStep(step)}
                position={`${index > 1 ? 'bottom-' : 'top-'}${index % 2 ? 'right' : 'left'}`}
              />
            ))}
          </div>
        </div>

        {/* Step Modal */}
        <AnimatePresence>
          {selectedStep && (
            <Dialog
              open={true}
              onOpenChange={() => setSelectedStep(null)}
              modal={true} 
            >
              <DialogContent
                className="
                  w-full 
                  max-w-sm
                  sm:max-w-md 
                  md:max-w-3xl 
                  lg:max-w-5xl 
                  max-h-[90vh] 
                  overflow-auto
                  p-0 
                  text-white 
                  bg-black/80 
                  backdrop-blur-sm 
                  border-primary-50/10 
                  rounded-lg
                  focus:outline-none
                  focus-visible:ring-0
                "
              >
                <div className="p-3 sm:p-6 md:p-10">
                  <StepContent step={selectedStep} />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>

      {/* Global overrides for Dialog styling */}
      <style jsx global>{`
        /* Remove unwanted outlines/focus rings for the dialog */
        .fixed.inset-0:focus,
        .fixed.inset-0:focus-visible,
        div[data-radix-portal],
        div[role="dialog"],
        div[role="dialog"] *:focus,
        div[role="dialog"] *:focus-visible,
        .fixed.inset-0.bg-background/80,
        [data-radix-popper-content-wrapper] {
          outline: none !important;
          box-shadow: none !important;
        }

        /* In case any leftover ring is from Tailwind's default. This is optional but can be used to be extra sure. */
        *:focus {
          ring: 0 !important;
        }
        *:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default InterviewProcess;
