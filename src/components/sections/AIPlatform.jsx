import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';

// Enhanced language transition with slower, more professional animations
const LanguageTransition = ({ children, language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(children);
  const previousLanguageRef = useRef(language);

  useEffect(() => {
    if (previousLanguageRef.current !== language) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setContent(children);
        setIsVisible(true);
      }, 700); // Slightly longer fade-out for smoother transition
      previousLanguageRef.current = language;
      return () => clearTimeout(timer);
    }
  }, [children, language]);

  return (
    <div
      className="transition-all duration-500 ease-in-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : -4}px)` // Reduced movement for subtlety
      }}>
      {content}
    </div>
  );
};

const AccordionSection = ({ section, isActive, onToggle, index, language }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [section.content, isActive]);

  return (
    <div
      className={`
        bg-white/90 backdrop-blur-md rounded-lg overflow-hidden
        transition-all duration-500 ease-in-out
        ${isActive ? 'shadow-lg border-primary-300' : 'border-primary-100'}
        border hover:border-primary-200
      `}>
      <button
        className="w-full text-left p-6 flex justify-between items-center gap-4 transition-all duration-500"
        onClick={onToggle}
        aria-expanded={isActive}
        aria-controls={`section-${index}-content`}>
        <LanguageTransition language={language}>
          <span className="text-xl md:text-2xl font-semibold text-primary-900 leading-tight">
            {section.title}
          </span>
        </LanguageTransition>
        <span className={`
          flex-shrink-0 transition-transform duration-500 ease-in-out
          ${isActive ? 'rotate-180' : 'rotate-0'}
        `}>
          {isActive ? (
            <Minus className="w-6 h-6 text-primary-400" />
          ) : (
            <Plus className="w-6 h-6 text-primary-400" />
          )}
        </span>
      </button>

      <div
        id={`section-${index}-content`}
        className="transition-all duration-700 ease-in-out overflow-hidden"
        style={{
          height: isActive ? `${contentHeight}px` : '0',
          opacity: isActive ? 1 : 0
        }}>
        <div ref={contentRef} className="px-6 pb-6 space-y-4">
          <LanguageTransition language={language}>
            <p className="text-base md:text-lg text-primary-600 leading-relaxed">
              {section.content}
            </p>
          </LanguageTransition>
        </div>
      </div>
    </div>
  );
};

const AIPlatform = () => {
  const [activeSection, setActiveSection] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].aiPlatform;

  const handleToggle = (index) => {
    setActiveSection(current => current === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <LanguageTransition language={language}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
              <span className="block mb-2">{t.title}</span>
              <span className="block bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text">
                {t.subtitle}
              </span>
            </h2>
          </div>
        </LanguageTransition>

        <div className="space-y-6 max-w-4xl mx-auto">
          {t.sections.map((section, index) => (
            <AccordionSection
              key={`${language}-${index}`}
              section={section}
              isActive={activeSection === index}
              onToggle={() => handleToggle(index)}
              index={index}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIPlatform;
