import React, { memo, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';
import BackgroundEffects from '@/components/ui/background_effects';

const LanguageTransition = ({ children, language }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [content, setContent] = useState(children);
  const previousLanguageRef = useRef(language);
  
  useEffect(() => {
    if (previousLanguageRef.current !== language) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setContent(children);
        setIsVisible(true);
      }, 700);
      previousLanguageRef.current = language;
      return () => clearTimeout(timer);
    }
  }, [children, language]);

  return (
    <div
      className="transition-all duration-500 ease-in-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : -4}px)`
      }}>
      {content}
    </div>
  );
};

const StatIcons = {
  Timer: memo(({ className }) => (
    <svg 
      viewBox="0 0 24 24" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )),
  Users: memo(({ className }) => <Users className={className} />),
  TrendingUp: memo(({ className }) => <TrendingUp className={className} />),
  Clock: memo(({ className }) => <Clock className={className} />)
};

const StatCard = memo(({ icon: Icon, value, label, language }) => (
  <div className="relative group h-full">
    <div className="bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 rounded-2xl p-6 transition-all duration-300 hover:border-accent-500/20 h-full flex flex-col">
      <div className="flex flex-col items-center text-center flex-1 justify-between">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full p-3 bg-[#1C1C1C] border border-accent-500/20 transition-all duration-300 group-hover:border-accent-500/40">
          <Icon className="w-6 h-6 text-accent-500" />
        </div>
        
        <LanguageTransition language={language}>
          <div 
            className="mt-6 font-bold bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
          >
            {value}
          </div>
          
          <p className="text-primary-100/80 text-sm sm:text-base mt-3 max-w-[200px] leading-relaxed">
            {label}
          </p>
        </LanguageTransition>
      </div>
    </div>
  </div>
));

const PowerSection = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const { language } = useLanguage();
  const t = translations[language].powerSection;

  const stats = [
    {
      icon: StatIcons.Timer,
      ...t.stats.timeToFill
    },
    {
      icon: StatIcons.Users,
      ...t.stats.internalHires
    },
    {
      icon: StatIcons.TrendingUp,
      ...t.stats.spending
    },
    {
      icon: StatIcons.Clock,
      ...t.stats.timeSaved
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-teal-500 to-black">
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" 
        style={{ transform: `translateY(${parallaxY}px)` }}
      >
        <LanguageTransition language={language}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary-50">
              {t.title.split('Mastro HR').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="bg-gradient-to-r from-accent-500 to-accent-400 text-transparent bg-clip-text">
                      Mastro HR
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h2>
            
            <p className="text-primary-100/80 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </LanguageTransition>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={`${language}-${index}`}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              language={language}
            />
          ))}
        </div>

        <LanguageTransition language={language}>
          <div className="mt-16 text-center">
            <p className="text-primary-100/80 text-base sm:text-lg">
              {t.footerText}
            </p>
          </div>
        </LanguageTransition>
      </div>
    </section>
  );
};

export default memo(PowerSection);