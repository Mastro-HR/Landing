import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translation';

const teamMembers = [
  {
    id: 'elena',
    image: '/images/elena-rodriguez.jpg',
    linkedin: 'https://www.linkedin.com/in/elena-rodriguez',
    twitter: 'https://twitter.com/elenarod'
  },
  {
    id: 'marcus',
    image: '/images/marcus-chen.jpg',
    linkedin: 'https://www.linkedin.com/in/marcus-chen',
    twitter: 'https://twitter.com/marcuschen'
  },
  {
    id: 'aisha',
    image: '/images/aisha-patel.jpg',
    linkedin: 'https://www.linkedin.com/in/aisha-patel',
    twitter: 'https://twitter.com/aishapatel'
  },
  {
    id: 'david',
    image: '/images/david-muller.jpg',
    linkedin: 'https://www.linkedin.com/in/david-muller',
    twitter: 'https://twitter.com/davidmuller'
  }
];

const TeamMember = ({ member, translations }) => (
  <motion.div 
    className="bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 rounded-lg overflow-hidden shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
    <img 
      src={member.image} 
      alt={`${translations.name} - ${translations.role}`} 
      className="w-full h-64 object-cover" 
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-primary-50">{translations.name}</h3>
      <p className="text-accent-400 mb-4">{translations.role}</p>
      <p className="text-primary-100/80 mb-4">{translations.bio}</p>
      <div className="flex space-x-4">
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-100 hover:text-accent-400 transition-colors">
          <FaLinkedin size={24} />
        </a>
        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-100 hover:text-accent-400 transition-colors">
          <FaTwitter size={24} />
        </a>
      </div>
    </div>
  </motion.div>
);

const TeamPage = () => {
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
            <Users className="w-4 h-4 mr-2 text-accent-500 animate-pulse" />
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

export default TeamPage;