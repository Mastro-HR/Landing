import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';

const JobListing = ({ role, location, type, description, requirements, benefits, notionLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].careers;

  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <div 
        className="p-6 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-primary-50 mb-2">{role}</h3>
          <div className="flex items-center gap-4 text-primary-100/80">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <span>•</span>
            <span>{type}</span>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-primary-50" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary-50" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10">
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-medium text-primary-50 mb-3">
                  {t.description}
                </h4>
                <p className="text-primary-100/80 leading-relaxed">
                  {description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-primary-50 mb-3">
                  {t.requirements}
                </h4>
                <ul className="space-y-2 text-primary-100/80">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="block w-1 h-1 mt-2 rounded-full bg-accent-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium text-primary-50 mb-3">
                  {t.benefits}
                </h4>
                <ul className="space-y-2 text-primary-100/80">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="block w-1 h-1 mt-2 rounded-full bg-accent-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={notionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-6 py-3 bg-accent-500 hover:bg-accent-600 
                text-primary-50 rounded-full font-medium transition-colors items-center 
                gap-2 group">
                {t.apply}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CareersPage = () => {
  const { language } = useLanguage();
  const t = translations[language].careers;
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  const positions = [
    {
      role: t.positions.contentCreator.role,
      tagline: t.positions.contentCreator.tagline,
      location: t.positions.contentCreator.location,
      type: t.positions.contentCreator.type,
      description: t.positions.contentCreator.description,
      requirements: t.positions.contentCreator.requirements,
      benefits: t.positions.contentCreator.benefits,
      notionLink: 'https://bejewled-market-681.notion.site/Stiamo-cercando-IL-Content-Creator-e-Social-Media-Manager-145ea90dd6e68023b059e8462ce76abb'
    },
    {
      role: t.positions.partnershipManager.role,
      tagline: t.positions.partnershipManager.tagline,
      location: t.positions.partnershipManager.location,
      type: t.positions.partnershipManager.type,
      description: t.positions.partnershipManager.description,
      requirements: t.positions.partnershipManager.requirements,
      benefits: t.positions.partnershipManager.benefits,
      notionLink: 'https://bejewled-market-681.notion.site/OPPORTUNIT-D-ORO-Partnership-Manager-per-Mastro-HR-145ea90dd6e68060b756c35d59ad458e'
    },
    {
      role: t.positions.hrSpecialist.role,
      tagline: t.positions.hrSpecialist.tagline,
      location: t.positions.hrSpecialist.location,
      type: t.positions.hrSpecialist.type,
      description: t.positions.hrSpecialist.description,
      requirements: t.positions.hrSpecialist.requirements,
      benefits: t.positions.hrSpecialist.benefits,
      notionLink: 'https://bejewled-market-681.notion.site/RIVOLUZIONANTE-HR-Specialist-in-Mastro-HR-145ea90dd6e6800c8d39cfb6b0911f3b'
    },
    {
      role: t.positions.salesManager.role,
      tagline: t.positions.salesManager.tagline,
      location: t.positions.salesManager.location,
      type: t.positions.salesManager.type,
      description: t.positions.salesManager.description,
      requirements: t.positions.salesManager.requirements,
      benefits: t.positions.salesManager.benefits,
      notionLink: 'https://bejewled-market-681.notion.site/PERFORMANCE-RELAZIONI-145ea90dd6e680d8a8d8c9183ff1f4e0'
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-teal-600 to-teal-800 pb-24">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32"
        style={{ y: parallaxY }}>
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm 
            border border-white/10 mb-6">
            <Briefcase className="w-4 h-4 mr-2 text-accent-500" />
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

        <div className="space-y-6">
          {positions.map((position, index) => (
            <JobListing key={index} {...position} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CareersPage;