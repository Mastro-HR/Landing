import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translation';

export const useTranslations = (section) => {
  const { language } = useLanguage();
  return translations[language][section];
};