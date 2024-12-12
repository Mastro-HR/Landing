import React, { useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Brain, 
  Target, 
  Shield,
  Users,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';

const TechnologyPillars = () => {
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [expandedCard, setExpandedCard] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].technologyPillars;
  
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = useMemo(() => [
    {
      icon: Brain,
      ...t.features.leadership
    },
    {
      icon: Target,
      ...t.features.matching
    },
    {
      icon: Shield,
      ...t.features.enterprise
    }
  ], [t.features]);

  const renderBackground = useCallback(() => {
    const bubbles = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 60 : 100) + (isMobile ? 60 : 100),
      initialX: Math.random() * 90,
      initialY: Math.random() * 90,
      delay: i * 0.1,
      rotation: i * 45,
      animationClass: ['animate-float-1', 'animate-float-2', 'animate-float-3'][i % 3]
    }));

    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className={`absolute rounded-blob backdrop-blur-xl ${bubble.animationClass}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.initialX}%`,
              top: `${bubble.initialY}%`,
              background: `linear-gradient(
                ${bubble.rotation}deg,
                rgba(72, 106, 130, ${0.08 + bubble.id * 0.01}),
                rgba(120, 144, 169, ${0.08 + bubble.id * 0.01})
              )`,
              willChange: 'transform',
              filter: 'blur(2px)',
              borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%'
            }}
            initial={{ 
              scale: 0.8, 
              opacity: 0,
              rotate: 0 
            }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              rotate: bubble.rotation 
            }}
            transition={{
              duration: 1.2,
              delay: bubble.delay,
              ease: "easeOut",
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        ))}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50/50" />
      </div>
    );
  }, [isMobile]);

  const renderFeatureCard = useCallback(({ icon: Icon, title, description, tags, details }, index) => {
    const isExpanded = expandedCard === index;
    
    return (
      <motion.div
        key={title}
        className={`group bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl border border-primary-100 hover:border-primary-200 relative overflow-hidden transition-all duration-500 ${isExpanded ? 'lg:col-span-2 row-span-2' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.15,
          ease: "easeOut" 
        }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.3 } 
        }}
        onClick={() => !isMobile && setExpandedCard(isExpanded ? null : index)}>
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-start justify-between mb-6">
            <motion.div 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-accent-500/10 to-accent-400/10 flex items-center justify-center text-accent-500"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}>
              <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
            </motion.div>
            {!isMobile && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedCard(isExpanded ? null : index);
                }}
                className="p-2 rounded-full hover:bg-primary-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isExpanded ? "Collapse" : "Expand"}>
                {isExpanded ? (
                  <Minus className="w-5 h-5 text-primary-400" />
                ) : (
                  <Plus className="w-5 h-5 text-primary-400" />
                )}
              </motion.button>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-semibold text-primary-900 group-hover:text-accent-600 transition-colors duration-300 mb-4">
            {title}
          </h3>

          <p className="text-primary-600 leading-relaxed mb-6">
            {description}
          </p>

          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: 'auto',
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: { duration: 0.3, ease: "easeIn" }
                }}
                className="mb-6">
                <ul className="space-y-3">
                  {details.map((detail, idx) => (
                    <motion.li
                      key={detail}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="flex items-center text-primary-600">
                      <ArrowRight className="w-4 h-4 mr-2 text-accent-500" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="bg-primary-50/80 text-primary-600 rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap border border-primary-100 hover:bg-primary-100 transition-colors duration-200">
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }, [expandedCard, isMobile]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {renderBackground()}
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
        style={{ y: parallaxY }}>
        <motion.div
          className="space-y-12 sm:space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 mb-4 backdrop-blur-sm">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{t.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 leading-tight tracking-tight mt-4 mb-6">
                {t.title}
              </h2>

              <p className="text-lg sm:text-xl text-primary-600 leading-relaxed max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 auto-rows-fr">
            {features.map(renderFeatureCard)}
          </div>

          <motion.div
            className="mt-12 sm:mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <Link
              to="/assessment-demo"
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-gradient-to-r from-accent-500 to-accent-400 text-white font-medium text-lg inline-flex items-center gap-2 hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-300">
              <span className="relative z-10">{t.cta}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(TechnologyPillars);