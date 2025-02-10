import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const AIPlatform = () => {
  const { language } = useLanguage();

  const getTranslatedContent = (lang) => {
    switch (lang) {
      case 'it':
        return {
          title: "Vuoi saperne di più?",
          contact: "Contattaci",
          try: "Provaci",
        };
      default:
        return {
          title: "Do you want to know more?",
          contact: "Contact Us",
          try: "Try Demo",
        };
    }
  };

  // Memoize content so it only recalculates on language change
  const content = useMemo(() => getTranslatedContent(language), [language]);

  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <AnimatePresence mode="wait">
            {/* Smoothly transitions the heading on language change */}
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 mb-6">
                {content.title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {/* Smoothly transitions the buttons on language change */}
          <motion.div
            key={`${language}-buttons`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="mt-12 flex justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact-sales"
                className="inline-block px-6 py-3 bg-primary-600 text-white font-semibold rounded shadow hover:bg-primary-700 transition-colors"
              >
                {content.contact}
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/ai_form"
                className="inline-block px-6 py-3 bg-accent-500 text-white font-semibold rounded shadow hover:bg-accent-600 transition-colors"
              >
                {content.try}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIPlatform;