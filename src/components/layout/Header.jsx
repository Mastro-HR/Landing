import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';
import LanguageSelector from '../LanguageSelector';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language].nav;

  React.useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.touchAction = 'auto';
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const NavLink = useCallback(({ to, children, className = '' }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={`relative group flex items-center px-3 py-2 text-base font-medium transition-all duration-300 ease-out ${isActive ? 'text-accent-500' : 'text-primary-50 hover:text-primary-50'} ${className}`}
        onClick={() => setIsMenuOpen(false)}>
        {children}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent-500 to-accent-400 rounded-full group-hover:w-full transition-all duration-300"
          initial={false}
          animate={{ width: isActive ? '100%' : '0%' }}
        />
      </Link>
    );
  }, [location.pathname]);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-700/95 to-teal-700/80 backdrop-blur-xl" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex-shrink-0"
            initial={false}
            animate={{ scale: isMenuOpen ? 0.95 : 1 }}>
            <Link
              to="/"
              className="text-2xl font-semibold text-primary-50 hover:text-accent-500 transition-colors duration-300"
              aria-label="Home">
              MASTRO
            </Link>
          </motion.div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/about-us">{t.aboutUs}</NavLink>
            <NavLink to="/experts-network">{t.ourNetwork}</NavLink>
            <NavLink to="/careers">{t.careers}</NavLink>
            <NavLink to="/contact-sales">{t.contactSales}</NavLink>
            <motion.button
              onClick={() => navigate('/demo')}
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 text-primary-50 font-medium text-base hover:shadow-lg hover:shadow-accent-500/20 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              <span className="relative z-10">{t.Demo}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              />
            </motion.button>
            <LanguageSelector />
          </div>

          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-50 p-2 rounded-full text-primary-50 hover:bg-primary-50/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}>
            <span className="sr-only">
              {isMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 md:hidden bg-gradient-to-b 
                      from-teal-500 to-teal-700"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.3, ease: 'easeOut' }
                },
                closed: {
                  opacity: 0,
                  x: '100%',
                  transition: { duration: 0.2, ease: 'easeIn' }
                }
              }}>
              <div className="flex flex-col h-full pt-24 pb-6 px-4">
                <motion.nav
                  className="space-y-8"
                  initial="closed"
                  animate="open"
                  variants={{
                    open: {
                      transition: { staggerChildren: 0.1 }
                    }
                  }}>
                  <motion.div
                    className="space-y-4"
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 20 }
                    }}>
                    <NavLink to="/about-us" className="block text-xl">
                      {t.aboutUs}
                    </NavLink>
                    <NavLink to="/experts-network" className="block text-xl">
                      {t.ourNetwork}
                    </NavLink>
                    <NavLink to="/contact-sales" className="block text-xl">
                      {t.contactSales}
                    </NavLink>
                    <motion.button
                      onClick={() => navigate('/demo')}
                      className="w-full mt-4 group relative overflow-hidden px-6 py-3 rounded-full bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 text-primary-50 font-medium text-lg hover:shadow-lg hover:shadow-accent-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <span className="relative z-10">{t.Demo}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      />
                    </motion.button>
                    <div className="mt-4">
                      <LanguageSelector isMobile />
                    </div>
                  </motion.div>
                </motion.nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;