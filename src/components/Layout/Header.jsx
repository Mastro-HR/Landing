import React from 'react';
import ReactGA from 'react-ga4';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react'; // Notice Sparkles is imported here
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';
import LanguageSelector from '../LanguageToogle/LanguageSelector';

// ==========================
// 1) Enhanced TryUsButton
// ==========================
const TryUsButton = ({ onClick, label }) => (
  <motion.button
    onClick={onClick}
    className="group relative flex items-center gap-2 px-4 py-2 rounded-lg 
               bg-gradient-to-r from-accent-600 to-accent-500 text-gray-200 font-secondary font-medium
               transition-all duration-300 ease-in-out
               hover:from-accent-600 hover:to-accent-400 hover:shadow-lg hover:shadow-accent-500/50"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
    <span>{label}</span>
  </motion.button>
);

// ==========================
// 2) Styled NavLink
// ==========================
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

// ==========================
// 3) Mobile Menu Animations
// ==========================
const menuVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.16, ease: 'easeIn' },
  },
};

// ==========================
// 4) Mobile Menu
// ==========================
const MobileMenu = ({ isOpen, onClose, onDemoClick, onLanguageChange, translations }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        // Semi-transparent backdrop
        <motion.div
          className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
        >
          {/* Slide + fade container */}
          <motion.div
            className="relative flex flex-col w-full h-full"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-primary-50/10">
              <Link
                to="/"
                className="text-2xl font-primary text-primary-50 hover:text-accent-500 transition-colors"
                onClick={onClose}
              >
                MASTRO
              </Link>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full 
                           bg-primary-900/50 text-primary-50 hover:bg-primary-800/50 
                           transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {/* Example Nav Link */}
                <StyledNavLink to="/contact-sales" onClick={onClose}>
                  {translations.contactSales}
                </StyledNavLink>

                {/* Enhanced TryUs Button for Demo */}
                <TryUsButton onClick={onDemoClick} label={translations.Demo} />

                {/* Language Selector */}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================
// 5) Header
// ==========================
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const t = translations[language].nav;

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isMenuOpen]);

  const trackAndNavigate = React.useCallback(
    (path, label) => {
      ReactGA.event({
        category: 'Navigation',
        action: 'Click',
        label: label || path,
      });
      navigate(path);
    },
    [navigate]
  );

  const handleDemoClick = React.useCallback(() => {
    trackAndNavigate('/ai_form', 'demo_button');
    setIsMenuOpen(false);
  }, [trackAndNavigate]);

  const handleLanguageChange = React.useCallback(
    (newLang) => {
      ReactGA.event({
        category: 'Language',
        action: 'Change',
        label: newLang,
      });
      changeLanguage(newLang);
      setIsMenuOpen(false);
    },
    [changeLanguage]
  );

  return (
    <>
      {/* Header Bar */}
      <header
        className="fixed top-0 w-full z-50 border-b border-primary-50/10 
                   bg-black/95 md:bg-gradient-to-r md:from-black/90 md:via-black/80 md:to-black/90
                   backdrop-blur-md shadow-lg"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="font-primary text-2xl text-primary-50 hover:text-accent-500 transition-colors"
              onClick={() => trackAndNavigate('/', 'Logo_Home')}
            >
              <span className="sr-only">MASTRO Home</span>
              MASTRO
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <StyledNavLink to="/contact-sales">{t.contactSales}</StyledNavLink>
              <TryUsButton onClick={handleDemoClick} label={t.Demo} />
              <LanguageSelector
                className="ml-2"
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center
                         rounded-full bg-primary-900/50 text-primary-50
                         hover:bg-primary-800/50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onDemoClick={handleDemoClick}
        onLanguageChange={handleLanguageChange}
        translations={t}
      />
    </>
  );
};

export default Header;
