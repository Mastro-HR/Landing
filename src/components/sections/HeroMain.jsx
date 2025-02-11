import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';

const HeroMain = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const { language } = useLanguage();
  const t = translations[language].hero;

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 4,
      transition: {
        duration: 0.9,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  const StepCard = ({ step }) => (
    <div className="flex-1">
      <motion.div
        className="h-full p-6 sm:p-8 rounded backdrop-blur-xl border border-primary-50/10 relative">
          <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-4 mt-2">
          {step.title}
        </h3>
        <p className="text-primary-100/80 text-base sm:text-lg leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );

  const Operator = ({ type }) => (
    <div className="flex items-center justify-center h-16 md:h-auto md:w-16">
      <span className="text-4xl md:text-5xl text-accent-500 font-light">
        {type}
      </span>
    </div>
  );

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black">      
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: parallaxY }}>
        <div className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16">
          <div className="w-full max-w-5xl mx-auto text-center">
            <motion.div
              className="space-y-8 sm:space-y-10"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 }
                }
              }}>
              {/* Badge */}
              <motion.div
                className="flex justify-center"
                variants={titleVariants}>
                <div className="inline-flex items-center px-5 py-2.5 rounded bg-black backdrop-blur-xl border border-primary-50/10 shadow-lg shadow-accent-500/20">
                  <span className="w-2 h-2 rounded-full bg-accent-500 mr-3 animate-pulse" />
                  <span className="text-primary-50 font-medium text-base sm:text-lg">{t.badge}</span>
                </div>
              </motion.div>

              {/* Title Section */}
              <div className="space-y-8">
                <motion.h1 className="space-y-4">
                  <motion.span
                    className="block text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-primary-50 leading-tight tracking-tight"
                    variants={titleVariants}>
                    {t.titleLine1}
                  </motion.span>
                  <motion.div variants={titleVariants}>
                    <span className="block text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-accent-500 to-accent-500 text-transparent bg-clip-text">
                      {t.titleLine2}
                    </span>
                  </motion.div>
                </motion.h1>
                
                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl text-primary-100/80 max-w-3xl mx-auto leading-relaxed"
                  variants={titleVariants}>
                  {t.description}
                </motion.p>
              </div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-xl mx-auto"
                variants={titleVariants}>
                <Link
                  to="/contact-sales"
                  className="group relative overflow-hidden px-4 py-2 rounded bg-primary-50 text-black font-medium text-base sm:text-lg hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-300 flex items-center justify-center gap-2 flex-1">
                  <span className="relative z-10 whitespace-nowrap">{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Link>

                <Link
                  to="/ai_form"
                  className="group px-4 py-2 rounded border border-primary-50/20 text-primary-50 font-medium text-base sm:text-lg hover:bg-primary-50/5 transition-colors flex items-center justify-center gap-2 flex-1">
                  <span>{t.secondaryCta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Process Steps */}
              <motion.div 
                className="flex flex-col md:flex-row items-stretch gap-6 md:gap-4 mt-24"
                variants={titleVariants}>
                <StepCard step={t.steps[0]} />
                <Operator type="+" />
                <StepCard step={t.steps[1]} />
                <Operator type="=" />
                <StepCard step={t.steps[2]} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroMain;