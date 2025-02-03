import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSelector = ({ isMobile = false, hideToggleIcon = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode) => {
    if (langCode !== language) {
      toggleLanguage();
    }
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-3 rounded-xl bg-primary-50/5 hover:bg-primary-50/10 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-accent-500" />
            <span className="text-primary-50 font-medium">Select Language</span>
          </div>
          <ChevronDown className={`w-5 h-5 text-primary-50 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-2 w-full rounded-xl bg-black/90 backdrop-blur-lg border border-primary-50/10 shadow-xl"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full flex items-center justify-between px-4 py-3 text-primary-50 hover:bg-primary-50/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-lg">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <Check className="w-5 h-5 text-accent-500" />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 rounded-full hover:bg-primary-50/10 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {!hideToggleIcon && <Globe className="w-5 h-5 text-primary-50" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-black/90 backdrop-blur-lg border border-primary-50/10 shadow-xl"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full flex items-center justify-between px-4 py-3 text-primary-50 hover:bg-primary-50/5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-accent-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;