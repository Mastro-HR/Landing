import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const translations = {
  en: {
    ctaTitle: "Do you want to know more?",
    ctaContact: "Contact Us",
    ctaTry: "Try Us",
  },
  it: {
    ctaTitle: "Vuoi saperne di più?",
    ctaContact: "Contattaci",
    ctaTry: "Provaci",
  }
};

const AIPlatform = () => {
  const { language } = useLanguage();
  
  // Directly access translations without state
  const currentText = translations[language] || translations.en;

  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          className="text-center transition-all duration-300 ease-in-out"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
            {currentText.ctaTitle}
          </h2>
        </div>
        <div className="mt-12 flex justify-center gap-4">
          <a
            href="/contact-sales"
            className="px-6 py-3 bg-primary-600 text-white font-semibold rounded shadow hover:bg-primary-700 transition-colors"
          >
            {currentText.ctaContact}
          </a>
          <a
            href="/ai-form"
            className="px-6 py-3 bg-accent-500 text-white font-semibold rounded shadow hover:bg-accent-600 transition-colors"
          >
            {currentText.ctaTry}
          </a>
        </div>
      </div>
    </section>
  );
};

export default AIPlatform;