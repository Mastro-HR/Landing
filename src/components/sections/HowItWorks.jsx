import React, { useMemo, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Database, 
  ChartBar,
  Target,
  Shield,
  Users,
  ArrowRight,
  Plus,
  Minus,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';

const ProcessStep = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.9, delay, ease: [0.165, 0.84, 0.44, 1] }}
    className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg">
    <div className="absolute -top-4 rounded-full p-3 bg-accent-500/10 backdrop-blur-xl border border-accent-500/20">
      <Icon className="w-6 h-6 text-accent-500" />
    </div>
    <h3 className="mt-4 text-xl font-semibold text-primary-900 mb-3">{title}</h3>
    <p className="text-primary-600 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const TechnologyCard = ({ icon: Icon, title, description, tags, details, isExpanded, onToggle, index }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  return (
    <motion.div
      className={`group bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl border border-primary-100 hover:border-primary-200 relative overflow-hidden transition-all duration-500 ${isExpanded ? 'lg:col-span-2 row-span-2' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      onClick={() => !isMobile && onToggle()}>
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500/10 to-accent-400/10 flex items-center justify-center text-accent-500"
            whileHover={{ scale: 1.05 }}>
            <Icon className="w-7 h-7" />
          </motion.div>
          {!isMobile && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="p-2 rounded-full hover:bg-primary-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>
              {isExpanded ? (
                <Minus className="w-5 h-5 text-primary-400" />
              ) : (
                <Plus className="w-5 h-5 text-primary-400" />
              )}
            </motion.button>
          )}
        </div>

        <h3 className="text-xl font-semibold text-primary-900 mb-4">
          {title}
        </h3>

        <p className="text-primary-600 leading-relaxed mb-6">
          {description}
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6">
              <ul className="space-y-3">
                {details.map((detail, idx) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
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
                transition={{ delay: idx * 0.1 }}
                className="bg-primary-50/80 text-primary-600 rounded-full px-3 py-1 text-sm font-medium border border-primary-100 hover:bg-primary-100 transition-colors">
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HowItWorks = () => {
  const { scrollY } = useScroll();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [expandedCard, setExpandedCard] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].howItWorks;
  const tPillars = translations[language].technologyPillars;
  
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const renderBackground = useCallback(() => {
    const bubbles = Array.from({ length: 6 }, (_, i) => ({
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
              borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: bubble.rotation }}
            transition={{ duration: 1.2, delay: bubble.delay }}
          />
        ))}
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/50 to-white" />
      </div>
    );
  }, [isMobile]);

  const features = useMemo(() => [
    {
      icon: Brain,
      ...tPillars.features.leadership
    },
    {
      icon: Target,
      ...tPillars.features.matching
    },
    {
      icon: Shield,
      ...tPillars.features.enterprise
    }
  ], [tPillars.features]);

  const processSteps = [
    { icon: Database, ...t.steps.dataCollection },
    { icon: Brain, ...t.steps.neuralAnalysis },
    { icon: ChartBar, ...t.steps.smartResults }
  ];

  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      {renderBackground()}
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        style={{ y: parallaxY }}>
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 mb-6">
            <Brain className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{t.badge}</span>
          </motion.div>

          <h2 className="text-4xl font-bold text-primary-900 mb-6">
            <span className="block">{t.title.line1}</span>
            <span className="block bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text">
              {t.title.line2}
            </span>
          </h2>

          <p className="text-lg text-primary-600 max-w-2xl mx-auto mb-16">
            {t.description}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Technology Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <TechnologyCard
              key={index}
              {...feature}
              index={index}
              isExpanded={expandedCard === index}
              onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <Link
            to="/contact-sales"
            className="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-accent-500 to-accent-400 text-white font-medium text-lg inline-flex items-center gap-2 hover:shadow-xl hover:shadow-accent-500/20 transition-all">
            <span className="relative z-10">{tPillars.cta}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(HowItWorks);