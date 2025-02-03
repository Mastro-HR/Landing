import React, { useMemo } from 'react';
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
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';
import BackgroundEffects from '@/components/ui/background_effects';

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

  const renderFeatureCard = ({ icon: Icon, title, description, key }) => (
    <motion.div
      key={key}
      className="group relative p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 hover:bg-primary-50/10 transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01, y: -2 }}>
      <div className="space-y-3 sm:space-y-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center text-primary-50 transform group-hover:scale-105 transition-transform duration-200">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </div>
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-primary-50">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-primary-100/80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-500 to-black min-h-screen">
      <BackgroundEffects />
      
      <motion.div
        ref={ref}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: parallaxY }}>
        <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
          <motion.div
            className="space-y-8 sm:space-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}>
            <motion.div 
              className="space-y-6 sm:space-y-8 max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary-50/5 backdrop-blur-xl border border-primary-50/10">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-accent-400" />
                <span className="text-primary-50 text-xs sm:text-sm font-medium">{t.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-50 leading-tight tracking-tight">
                {t.title.line1}
                <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text mt-2">
                  {t.title.line2}
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-primary-100/80 max-w-2xl leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/ai_form"
                className="group relative overflow-hidden px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full bg-primary-50 text-teal-800 font-medium text-sm sm:text-base lg:text-lg hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-300 flex items-center gap-2">
                <span className="relative z-10">{t.cta}</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </Link>
            </div>

            <div className="grid gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(renderFeatureCard)}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceOverview;