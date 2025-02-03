import React from 'react';
import ReactGA from 'react-ga4';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';
import LanguageSelector from '../LanguageToogle/LanguageSelector';

const StyledNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`
        relative group flex items-center px-4 py-3
        ${isActive ? 'text-accent-500' : 'text-primary-50'}
        text-lg md:text-base font-medium 
        transition-all duration-200 ease-in-out
        hover:bg-primary-50/5 md:hover:bg-transparent md:hover:text-accent-500
      `}
      onClick={onClick}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute left-0 bottom-0 h-[2px] w-full bg-accent-500 md:block"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      )}
    </Link>
  );
};

const MobileMenu = ({ isOpen, onClose, onDemoClick, onLanguageChange, translations }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 bg-black bg-opacity-90"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-primary-50/10">
        <Link
          to="/"
          className="text-xl font-semibold text-primary-50 hover:text-accent-500 transition-colors"
          onClick={onClose}
        >
          MASTRO
        </Link>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-900/50 text-primary-50"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
        <nav className="flex flex-col space-y-4">
          <StyledNavLink to="/contact-sales" onClick={onClose}>
            {translations.contactSales}
          </StyledNavLink>
          <motion.button
            onClick={onDemoClick}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-primary-800/20 text-primary-50"
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg font-medium">{translations.Demo}</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
          <div className="mt-4">
            <LanguageSelector
              isMobile
              onLanguageChange={onLanguageChange}
              className="w-full"
            />
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language].nav;

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isMenuOpen]);

  const trackAndNavigate = React.useCallback((path, label) => {
    ReactGA.event({
      category: 'Navigation',
      action: 'Click',
      label: label || path,
    });
    navigate(path);
  }, [navigate]);

  const handleDemoClick = React.useCallback(() => {
    trackAndNavigate('/ai_form', 'demo_button');
    setIsMenuOpen(false);
  }, [trackAndNavigate]);

  const handleLanguageChange = React.useCallback((newLang) => {
    ReactGA.event({
      category: 'Language',
      action: 'Change',
      label: newLang,
    });
    changeLanguage(newLang);
    setIsMenuOpen(false);
  }, [changeLanguage]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-primary-50/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl font-semibold text-primary-50 hover:text-accent-500 transition-colors"
              onClick={() => trackAndNavigate('/', 'Logo_Home')}
            >
              <span className="sr-only">MASTRO Home</span>
              MASTRO
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <StyledNavLink to="/contact-sales">
                {t.contactSales}
              </StyledNavLink>
              <motion.button
                onClick={handleDemoClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50/5 border border-primary-50/10 text-primary-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t.Demo}</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
              <LanguageSelector 
                className="ml-2" 
                onLanguageChange={handleLanguageChange}
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-primary-900/50 text-primary-50"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onDemoClick={handleDemoClick}
          onLanguageChange={handleLanguageChange}
          translations={t}
        />
      </AnimatePresence>
    </>
  );
};

export default Header;