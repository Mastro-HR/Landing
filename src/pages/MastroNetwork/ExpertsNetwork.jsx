import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Briefcase, Award, Users, ArrowUpRight } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';

const StatsCard = ({ icon, name, count, description }) => (
  <motion.div 
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-accent-500/10 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-accent-400">{count}</p>
        <h3 className="text-lg font-medium text-primary-50">{name}</h3>
      </div>
    </div>
    <p className="text-primary-100/80">{description}</p>
  </motion.div>
);

const ExpertProfile = ({ profile, translations }) => (
  <motion.div 
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}>
    <div className="aspect-[4/3] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-teal-900/90" />
      <img 
        src={profile.image} 
        alt={`${translations.name} - ${translations.role}`} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-2xl font-bold text-white mb-1">{translations.name}</h3>
        <p className="text-accent-400 font-medium">{translations.role}</p>
      </div>
    </div>
    <div className="p-6">
      <p className="text-primary-100/80 mb-6">{translations.bio}</p>
      <div className="flex items-center justify-between">
        <a 
          href={profile.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-accent-400 hover:text-accent-300 transition-colors inline-flex items-center gap-2">
          <span className="font-medium">View Profile</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <a 
          href={profile.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 px-4 py-2 bg-accent-500/10 hover:bg-accent-500/20 
          rounded-full text-primary-50 transition-colors">
          <FaLinkedin className="w-4 h-4" />
          <span className="text-sm font-medium">Connect</span>
        </a>
      </div>
    </div>
  </motion.div>
);

const ExpertsNetwork = () => {
  const { language } = useLanguage();
  const t = translations[language].expertsNetwork;
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  const stats = [
    {
      icon: <Briefcase className="w-6 h-6 text-accent-500" />,
      ...t.experts.tech
    },
    {
      icon: <Users className="w-6 h-6 text-accent-500" />,
      ...t.experts.hr
    },
    {
      icon: <Award className="w-6 h-6 text-accent-500" />,
      ...t.experts.industry
    }
  ];

  const expertProfiles = [
    {
      id: 'davide',
      image: '/images/davide-cervellin.jpg',
      linkedin: 'https://www.linkedin.com/in/davidecervellin'
    },
    {
      id: 'massimo',
      image: '/images/massimo-martini.jpg',
      linkedin: 'https://www.linkedin.com/in/massimoernestomartini'
    },
    {
      id: 'marco',
      image: '/images/marco-ottolini.jpg',
      linkedin: 'https://www.linkedin.com/in/marcoottolini'
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-teal-600 to-teal-800 pb-24">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32"
        style={{ y: parallaxY }}>
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm 
            border border-white/10 mb-6">
            <Network className="w-4 h-4 mr-2 text-accent-500" />
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

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Experts Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertProfiles.map((profile) => (
            <ExpertProfile 
              key={profile.id} 
              profile={profile}
              translations={t.profiles[profile.id]}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExpertsNetwork;