// HowItWorks.jsx
import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Database, ChartBar, Target, Shield, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';
import InteractiveTimeline from './InteractiveTimeline';
import FeatureCard from './FeatureCard';

const LanguageTransition = memo(({ children, language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(children);
  const previousLanguageRef = useRef(language);
  
  useEffect(() => {
    if (previousLanguageRef.current !== language) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setContent(children);
        setIsVisible(true);
      }, 700);
      previousLanguageRef.current = language;
      return () => clearTimeout(timer);
    }
  }, [children, language]);

  return (
    <div
      className="transition-all duration-500 ease-in-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : -4}px)`
      }}>
      {content}
    </div>
  );
});

const SectionHeader = memo(({ badge, title, description, language }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-20">
    <LanguageTransition language={language}>
    </LanguageTransition>
    
    <LanguageTransition language={language}>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900 mb-6"
        style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}>
        {title.line1}
        <span className="block bg-gradient-to-r from-accent-500 to-accent-400 bg-clip-text text-transparent">
          {title.line2}
        </span>
      </h1>
    </LanguageTransition>
    
    <LanguageTransition language={language}>
      <p className="text-lg sm:text-xl text-primary-600 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </LanguageTransition>
  </motion.div>
));

const FeatureSection = memo(({ title, features, language }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [maxHeight, setMaxHeight] = useState(0);
  const cardRefs = useRef([]);

  const handleCardToggle = useCallback((index) => {
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  useEffect(() => {
    // Calculate the tallest card height when all cards are closed
    const calculateMaxHeight = () => {
      const heights = cardRefs.current.map((ref) => ref?.offsetHeight || 0);
      const tallest = Math.max(...heights);
      setMaxHeight(tallest);
    };

    // Delay calculation to ensure all cards have rendered
    setTimeout(calculateMaxHeight, 100);
    
    window.addEventListener('resize', calculateMaxHeight);
    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, [features]);

  return (
    <div ref={ref} className="mt-16 sm:mt-20 lg:mt-32">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 text-center mb-8 sm:mb-12"
        style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
      >
        {title}
      </motion.h2>

      {/* Feature Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={`${feature.id}-${index}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            ref={(el) => (cardRefs.current[index] = el)} // Attach refs
          >
            <FeatureCard
              feature={feature}
              index={index}
              isActive={activeIndex === index}
              onToggle={() => handleCardToggle(index)}
              minHeight={maxHeight}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
});

const HowItWorks = () => {
  const { language } = useLanguage();
  const { scrollY } = useScroll();
  const t = translations[language].howItWorks;
  const tPillars = translations[language].technologyPillars;
  
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 300, 600, 900], [1, 0.5, 0.5, 0]);

  const processSteps = [
    { icon: Database, ...t.steps.dataCollection },
    { icon: Brain, ...t.steps.neuralAnalysis },
    { icon: ChartBar, ...t.steps.smartResults }
  ];

  const features = [
    { 
      id: 'leadership',
      icon: Brain, 
      title: tPillars.features.leadership.title,
      description: tPillars.features.leadership.description,
      details: tPillars.features.leadership.details || []
    },
    { 
      id: 'matching',
      icon: Target, 
      title: tPillars.features.matching.title,
      description: tPillars.features.matching.description,
      details: tPillars.features.matching.details || []
    },
    { 
      id: 'enterprise',
      icon: Shield, 
      title: tPillars.features.enterprise.title,
      description: tPillars.features.enterprise.description,
      details: tPillars.features.enterprise.details || []
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          badge={t.badge}
          title={t.title}
          description={t.description}
          language={language}
        />

        <LanguageTransition language={language}>
          <InteractiveTimeline 
            steps={processSteps}
            autoPlayInterval={4000}
            language={language}
          />
        </LanguageTransition>

        <FeatureSection
          title={tPillars.title}
          features={features}
          language={language}
        />

        <LanguageTransition language={language}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20">
            <a
              href="/ai_form"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-500 text-white font-medium hover:bg-accent-600 transition-colors">
              {tPillars.cta}
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </LanguageTransition>
      </div>
    </div>
  );
};

export default memo(HowItWorks);
