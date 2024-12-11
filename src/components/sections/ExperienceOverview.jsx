import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ChevronRight, 
  Sparkles, 
  Workflow, 
  Network,
  Shield 
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';

const ExperienceOverview = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const { language } = useLanguage();
  const t = translations[language].experienceOverview;

  const features = useMemo(() => [
    {
      icon: Workflow,
      ...t.features.workflow,
      key: 'workflow'
    },
    {
      icon: Network,
      ...t.features.matching,
      key: 'matching'
    },
    {
      icon: Shield,
      ...t.features.security,
      key: 'security'
    },
    {
      icon: Sparkles,
      ...t.features.analytics,
      key: 'analytics'
    }
  ], [t.features]);

  const renderBackground = useCallback(() => {
    const bubbles = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: Math.random() * (window.innerWidth < 640 ? 60 : 100) + (window.innerWidth < 640 ? 60 : 100),
      initialX: Math.random() * 90,
      initialY: Math.random() * 90,
      delay: i * 0.1,
      animationClass: ['animate-float-1', 'animate-float-2', 'animate-float-3'][i % 3]
    }));

    return (
      <div className="absolute inset-0 z-0">
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
                ${45 + bubble.id * 30}deg,
                rgba(255,111,97,${0.08 + bubble.id * 0.01}),
                rgba(255,143,112,${0.08 + bubble.id * 0.01})
              )`,
              willChange: 'transform'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: bubble.delay,
              ease: "easeOut"
            }}
          />
        ))}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-flow opacity-30 pointer-events-none" />
      </div>
    );
  }, []);

  const renderFeatureCard = useCallback(({ icon: Icon, title, description, key }) => (
    <motion.div
      key={key}
      className="group relative p-6 sm:p-8 rounded-2xl bg-primary-50/5 backdrop-blur-xl 
                 border border-primary-50/10 hover:bg-primary-50/10 transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, y: -2 }}
    >
      <div className="space-y-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br 
                       from-accent-500 to-accent-400 flex items-center justify-center 
                       text-primary-50 transform group-hover:scale-105 transition-transform duration-200">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-primary-50">
          {title}
        </h3>
        <p className="text-primary-100/80 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  ), []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-500 to-teal-700">
      {renderBackground()}
      
      <motion.div
        ref={ref}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: parallaxY }}
      >
        <div className="py-16 sm:py-20 lg:py-28">
          <motion.div
            className="space-y-8 sm:space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="space-y-4 sm:space-y-6 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full
                           bg-primary-50/5 backdrop-blur-xl border border-primary-50/10">
                <Sparkles className="w-4 h-4 mr-2 text-accent-400" />
                <span className="text-primary-50 text-sm font-medium">{t.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-50 
                           leading-tight tracking-tight">
                {t.title.line1}
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold 
                               bg-gradient-to-r from-accent-500 to-accent-400 text-transparent 
                               bg-clip-text mt-2">
                  {t.title.line2}
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-primary-100/80 max-w-2xl leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Link
                to="/demo"
                className="group relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 rounded-full
                         bg-primary-50 text-teal-700 font-medium text-base sm:text-lg
                         hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-300
                         flex items-center gap-2"
              >
                <span className="relative z-10">{t.cta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90
                             opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Link>
            </div>

            <div className="grid gap-6 sm:gap-8 pt-8 sm:pt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(renderFeatureCard)}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceOverview;