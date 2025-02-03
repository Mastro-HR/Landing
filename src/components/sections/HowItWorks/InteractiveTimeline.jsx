import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const animations = {
  icon: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.1 } // Reduced from 0.2
  },
  content: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.1 } // Reduced from 0.2
  }
};

const TimelineIcon = memo(({ icon: Icon, isActive, isCompleted }) => (
  <div className="relative flex items-center justify-center">
    <motion.div
      variants={animations.icon}
      className="relative z-10"
    >
      {isActive && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }} // Reduced from 2
          className="absolute inset-0 bg-accent-500/20 rounded-full"
        />
      )}
      <div className={`
        w-12 h-12 rounded-full 
        flex items-center justify-center
        transition-colors duration-150
        ${isActive || isCompleted ? 'bg-accent-500 text-white' : 'bg-white border-2 border-primary-100 text-primary-400'}
      `}>
        <Icon className="w-6 h-6" />
      </div>
    </motion.div>
  </div>
));

const TimelineConnector = memo(({ progress, isVertical }) => {
  const baseClasses = isVertical
    ? "absolute left-6 h-full w-px -translate-x-1/2 bg-primary-100"
    : "absolute top-6 w-full h-px bg-primary-100";

  const progressClasses = isVertical
    ? "absolute h-full w-full bg-accent-500 origin-top"
    : "absolute w-full h-full bg-accent-500 origin-left";

  return (
    <div className={baseClasses}>
      <motion.div
        className={progressClasses}
        animate={{ 
          scaleY: isVertical ? progress : 1,
          scaleX: isVertical ? 1 : progress
        }}
        transition={{ duration: 0.4 }} // Reduced from 0.8
      />
    </div>
  );
});

const TimelineContent = memo(({ title, description, isActive }) => (
  <motion.div
    variants={animations.content}
    className={`
      text-center space-y-2 mt-4
      ${isActive ? 'opacity-100' : 'opacity-70'}
    `}
  >
    <h3 className={`
      text-lg font-semibold
      ${isActive ? 'text-primary-900' : 'text-primary-700'}
    `}>
      {title}
    </h3>
    <p className={`
      text-sm leading-relaxed
      ${isActive ? 'text-primary-700' : 'text-primary-500'}
    `}>
      {description}
    </p>
  </motion.div>
));

const TimelineStep = memo(({ 
  step, 
  index, 
  isActive, 
  isCompleted,
  isVertical 
}) => (
  <div className={`
    relative
    ${isVertical ? 'pl-16 pr-4 py-8' : 'px-8'}
    flex flex-col items-center
  `}>
    <TimelineIcon
      icon={step.icon}
      isActive={isActive}
      isCompleted={isCompleted}
    />
    <TimelineContent
      title={step.title}
      description={step.description}
      isActive={isActive}
    />
  </div>
));

const InteractiveTimeline = ({ 
  steps, 
  autoAdvanceInterval = 2000, // Reduced from 4000
  language 
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [inView, steps.length, autoAdvanceInterval]);

  return (
    <div 
      ref={ref}
      className={`
        relative w-full max-w-6xl mx-auto
        ${isVertical ? 'px-4 py-12' : 'px-8 py-20'}
      `}
    >
      <TimelineConnector 
        progress={(activeStep + 1) / steps.length}
        isVertical={isVertical}
      />
      
      <div className={`
        relative
        ${isVertical ? 'flex flex-col space-y-8' : 'flex justify-between'}
      `}>
        <AnimatePresence mode="wait">
          {steps.map((step, index) => (
            <TimelineStep
              key={step.id || index}
              step={step}
              index={index}
              isActive={activeStep === index}
              isCompleted={activeStep > index}
              isVertical={isVertical}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default memo(InteractiveTimeline);
