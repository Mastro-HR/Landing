// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Add logging when language changes
  useEffect(() => {
    console.log('Language changed to:', language);
    // Optionally persist to localStorage
    localStorage.setItem('preferred_language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'it' : 'en';
      console.log('Toggling language from', prev, 'to', newLang);
      return newLang;
    });
  };

  const changeLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'it') {
      console.log('Changing language to:', newLang);
      setLanguage(newLang);
    } else {
      console.warn('Invalid language requested:', newLang);
    }
  };

  const contextValue = {
    language,
    toggleLanguage,
    changeLanguage
  };

  console.log('Language Context Value:', contextValue);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};