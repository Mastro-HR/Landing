// src/components/LanguageToggle.jsx
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-full text-primary-50 hover:bg-primary-50/10 transition-all duration-300"
      aria-label="Toggle language">
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageToggle;