// Optional: Enhanced LanguageContext if you want direct language selection
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'it' : 'en');
  };

  const changeLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'it') {
      setLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);