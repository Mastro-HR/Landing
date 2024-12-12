import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { Users, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translation';

const teamMembers = [
  {
    id: 'michele',
    image: '/images/michele.jpg',
    linkedin: 'https://www.linkedin.com/in/michelepavone/',
  },
  {
    id: 'marta',
    image: '/images/marcus-chen.jpg',
    linkedin: 'https://www.linkedin.com/in/michelepavone/',
  },
  {
    id: 'gian',
    image: '/images/gian.jpg',
    linkedin: 'https://www.linkedin.com/in/gianmarco-scalabrin/',
  }
];

const TeamMember = ({ member, translations }) => (
  <motion.div 
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}>
    <div className="aspect-[3/4] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-900/90" />
      <img 
        src={member.image} 
        alt={`${translations.name} - ${translations.role}`} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute bottom-6 left-6 right-6">
        <p className="text-accent-400 font-medium mb-1">{translations.role}</p>
        <h3 className="text-2xl font-bold text-white">{translations.name}</h3>
      </div>
    </div>
    <div className="p-6 space-y-6">
      <p className="text-primary-100/80 leading-relaxed">
        {translations.bio}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-primary-100/60 text-sm">
          {translations.role}
        </span>
        <a 
          href={member.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex items-center gap-2 px-4 py-2 bg-accent-500/10 hover:bg-accent-500/20 
          rounded-full text-primary-50 transition-all duration-300">
          <FaLinkedin className="w-4 h-4" />
          <span className="text-sm font-medium">Connect</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
        </a>
      </div>
    </div>
  </motion.div>
);

const AboutUs = () => {
  const { language } = useLanguage();
  const t = translations[language].aboutUs;
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

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

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-teal-600 to-teal-800 pb-24">
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
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32"
        style={{ y: parallaxY }}>
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Users className="w-4 h-4 mr-2 text-accent-500" />
            <span className="text-primary-50 font-medium">{t.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-50 leading-tight 
            tracking-tight mb-8">
            {t.title}
          </h1>
          <p className="text-xl text-primary-100/80 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamMember 
              key={member.id} 
              member={member} 
              translations={t.team[member.id]} 
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;