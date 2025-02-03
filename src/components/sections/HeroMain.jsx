import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';
import BackgroundEffects from '@/components/ui/background_effects';

const HeroMain = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const { language } = useLanguage();
  const t = translations[language].hero;

  const profiles = [
    { id: 1, image: "/images/manager4.jpg" },
    { id: 2, image: "/images/manager2.jpg" },
    { id: 3, image: "/images/manager3.jpg" }
  ];

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

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-teal-500 to-black">
      <BackgroundEffects />
      
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: parallaxY }}>
        <div className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16">
          <div className="w-full lg:w-3/4 xl:w-3/5">
            <motion.div
              className="space-y-8 sm:space-y-10"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 }
                }
              }}>
              <motion.div
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 shadow-lg shadow-accent-500/20"
                variants={titleVariants}>
                <span className="w-2 h-2 rounded-full bg-accent-500 mr-3 animate-pulse" />
                <span className="text-primary-50 font-medium text-base sm:text-lg">{t.badge}</span>
              </motion.div>

              <div className="space-y-8">
                <motion.h1 className="space-y-4">
                  <motion.span
                    className="block text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-primary-50 leading-tight tracking-tight"
                    variants={titleVariants}>
                    {t.titleLine1}
                  </motion.span>
                  <motion.div variants={titleVariants}>
                    <span className="block text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text">
                      {t.titleLine2}
                    </span>
                  </motion.div>
                </motion.h1>
                
                <motion.p
                  className="text-base sm:text-lg lg:text-xl text-primary-100/80 max-w-2xl leading-relaxed"
                  variants={titleVariants}>
                  {t.description}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-8 sm:items-center"
                variants={titleVariants}>
                <Link
                  to="/contact-sales"
                  className="group relative overflow-hidden px-6 py-3.5 rounded-full bg-primary-50 text-teal-800 font-medium text-base sm:text-lg hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-500 flex items-center gap-2 w-fit">
                  <span className="relative z-10 whitespace-nowrap">{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </Link>

                <div className="flex items-center space-x-4">
                  <span className="text-primary-100/80 font-medium text-sm sm:text-base">
                    {t.trust}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroMain;