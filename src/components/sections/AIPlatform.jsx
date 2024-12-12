import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }
    }
  },
  content: {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeIn" },
        opacity: { duration: 0.2 }
      }
    }
  }
};

const AccordionSection = ({ section, isActive, onToggle, index }) => (
  <motion.div
    variants={ANIMATION_VARIANTS.item}
    className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden border border-primary-100 hover:border-primary-200 transition-all duration-300">
    <button
      className="w-full text-left p-6 flex justify-between items-center gap-4"
      onClick={onToggle}
      aria-expanded={isActive}
      aria-controls={`section-${index}-content`}>
      <span className="text-xl font-semibold text-primary-900 leading-tight">
        {section.title}
      </span>
      <span className="flex-shrink-0">
        {isActive ? (
          <Minus className="w-6 h-6 text-primary-400" />
        ) : (
          <Plus className="w-6 h-6 text-primary-400" />
        )}
      </span>
    </button>
    
    <AnimatePresence>
      {isActive && (
        <motion.div
          id={`section-${index}-content`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={ANIMATION_VARIANTS.content}
          className="overflow-hidden">
          <div className="px-6 pb-6 space-y-4">
            <p className="text-primary-600 leading-relaxed">
              {section.content}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const AIPlatform = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].aiPlatform;
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  const handleToggle = useCallback((index) => {
    setActiveSection(activeSection === index ? null : index);
  }, [activeSection]);

  return (
    <section className="py-24 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y: parallaxY }}
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible">
        <motion.div
          variants={ANIMATION_VARIANTS.item}
          className="text-center mb-16">

          <h2 className="text-4xl font-bold text-primary-900 mb-6">
            <span className="block">{t.title}</span>
            <span className="block bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text">
              {t.subtitle}
            </span>
          </h2>
        </motion.div>

        <motion.div 
          className="space-y-4 max-w-4xl mx-auto"
          variants={ANIMATION_VARIANTS.container}>
          {t.sections.map((section, index) => (
            <AccordionSection
              key={index}
              section={section}
              isActive={activeSection === index}
              onToggle={() => handleToggle(index)}
              index={index}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AIPlatform;