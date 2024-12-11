import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Timer, Users, TrendingUp, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translation';

const PowerStat = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay, ease: [0.165, 0.84, 0.44, 1] }}
    className="relative bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 
               rounded-2xl p-6 flex flex-col items-center text-center"
  >
    <div className="absolute -top-4 rounded-full p-3 bg-accent-500/10 backdrop-blur-xl 
                    border border-accent-500/20">
      <Icon className="w-6 h-6 text-accent-500" />
    </div>
    <div className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 
                    bg-gradient-to-r from-accent-500 to-accent-400 
                    text-transparent bg-clip-text">
      {value}
    </div>
    <p className="text-primary-100/80 text-sm sm:text-base max-w-[200px] leading-relaxed">
      {label}
    </p>
  </motion.div>
);

const PowerSection = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);
  const { language } = useLanguage();
  const t = translations[language].powerSection;

  const stats = [
    {
      icon: Timer,
      ...t.stats.timeToFill
    },
    {
      icon: Users,
      ...t.stats.internalHires
    },
    {
      icon: TrendingUp,
      ...t.stats.spending
    },
    {
      icon: Clock,
      ...t.stats.timeSaved
    }
  ];

  const bubbles = Array.from({ length: 6 }, (_, i) => ({
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
      'animate-blob-spin'
    ][i % 6]
  }));

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-teal-500 to-teal-700">
      {/* Background Elements */}
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

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y: parallaxY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-primary-50">
            {t.title.split('Mastro HR').map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="bg-gradient-to-r from-accent-500 to-accent-400 
                                 text-transparent bg-clip-text">
                    Mastro HR
                  </span>
                )}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-primary-100/80 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <PowerStat
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-primary-100/80 text-base sm:text-lg">
            {t.footerText}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PowerSection;