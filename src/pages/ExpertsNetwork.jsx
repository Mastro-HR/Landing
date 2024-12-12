import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Briefcase, Award, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translation';

const ExpertCard = ({ icon, name, count, description }) => (
  <motion.div 
    className="bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 rounded-lg p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-primary-50">{name}</h3>
    <p className="text-3xl font-bold text-accent-400 mb-4">{count}</p>
    <p className="text-primary-100/80">{description}</p>
  </motion.div>
);

const ExpertsNetwork = () => {
  const { language } = useLanguage();
  const t = translations[language].expertsNetwork;
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  const experts = [
    {
      icon: <Briefcase className="w-8 h-8 text-accent-500" />,
      ...t.experts.tech
    },
    {
      icon: <Users className="w-8 h-8 text-accent-500" />,
      ...t.experts.hr
    },
    {
      icon: <Award className="w-8 h-8 text-accent-500" />,
      ...t.experts.industry
    }
  ];

  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 100,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1]
      }
    }
  };

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-teal-500 to-teal-700">
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
              )`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: bubble.delay,
              ease: "easeOut"
            }}
          />
        ))}

        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-flow opacity-30" />
      </div>

      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        style={{ y: parallaxY }}>
        <motion.div
          className="space-y-8 sm:space-y-10 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}>
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 shadow-lg shadow-accent-500/20"
            variants={titleVariants}>
            <Network className="w-4 h-4 mr-2 text-accent-500 animate-pulse" />
            <span className="text-primary-50 font-medium">{t.badge}</span>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-50 leading-tight tracking-tight"
            variants={titleVariants}>
            {t.title}
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl text-primary-100/80 max-w-2xl leading-relaxed"
            variants={titleVariants}>
            {t.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <ExpertCard key={index} {...expert} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExpertsNetwork;