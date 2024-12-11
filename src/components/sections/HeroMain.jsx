import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';

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
  
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: i * 0.2,
    animationClass: [
      'animate-float-1',
      'animate-float-2',
      'animate-float-3',
      'animate-morph',
      'animate-morph-slow',
      'animate-blob-spin',
      'animate-blob-pulse'
    ][i % 7]
  }));

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
    <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-teal-500 to-teal-700">
      {/* Background bubbles section - remains unchanged */}
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
                ${25 + bubble.id * 30}deg,
                rgba(255,111,97,${0.08 + bubble.id * 0.01}),
                rgba(255,143,112,${0.08 + bubble.id * 0.01})
              )`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: bubble.delay,
              ease: "easeOut"
            }}
          />
        ))}

        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-flow opacity-30" />
      </div>

      {/* Main content section with improved spacing */}
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: parallaxY }}>
        <div className="min-h-[100svh] flex flex-col justify-center pt-24 pb-16">
          <div className="w-full lg:w-3/4 xl:w-3/5"> {/* Increased width for better text accommodation */}
            <motion.div
              className="space-y-8 sm:space-y-10"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              {/* Badge section with improved padding */}
              <motion.div
                className="inline-flex items-center px-5 py-2.5 rounded-full
                         bg-primary-50/5 backdrop-blur-xl border border-primary-50/10
                         shadow-lg shadow-accent-500/20"
                variants={titleVariants}
              >
                <span className="w-2 h-2 rounded-full bg-accent-500 mr-3 animate-pulse" />
                <span className="text-primary-50 font-medium text-base sm:text-lg">{t.badge}</span>
              </motion.div>

              {/* Title and description section with improved spacing */}
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

              {/* CTA and trust section with improved layout */}
              <motion.div
                className="flex flex-col sm:flex-row gap-8 sm:items-center"
                variants={titleVariants}>
                <Link
                  to="/contact-sales"
                  className="group relative overflow-hidden px-6 py-3.5 rounded-full 
                           bg-primary-50 text-teal-700 font-medium text-lg 
                           hover:shadow-xl hover:shadow-accent-500/20 
                           transition-all duration-500 flex items-center gap-2
                           w-fit">
                  <span className="relative z-10 whitespace-nowrap">{t.cta}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 
                             opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </Link>

                {/* Trust indicators with improved spacing */}
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {profiles.map((profile) => (
                      <motion.div
                        key={profile.id}
                        className="relative w-10 h-10"
                        whileHover={{ scale: 1.1, zIndex: 10 }}>
                        <div className="absolute inset-0 rounded-full 
                                    bg-gradient-to-r from-primary-50/5 to-primary-50/5 
                                    backdrop-blur-md border border-primary-50/20" />
                        <img
                          src={profile.image}
                          alt={`${t.altText.profile} ${profile.id}`}
                          className="relative w-full h-full rounded-full object-cover opacity-80"
                        />
                      </motion.div>
                    ))}
                  </div>
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
