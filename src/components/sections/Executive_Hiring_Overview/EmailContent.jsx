// components/EmailContent.jsx
import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from './Translations';

const DetailItem = memo(({ Icon, text }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-2 sm:gap-3 text-gray-300 w-full"
  >
    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500 flex-shrink-0" />
    <span className="text-sm sm:text-base text-gray-300">{text}</span>
  </motion.div>
));

DetailItem.displayName = 'DetailItem';

const EmailContent = memo(() => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const handleContactClick = () => {
    window.location.href = '/contact-sales';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-500/40
                 p-4 sm:p-6 md:p-8
                 space-y-4 sm:space-y-6
                 max-w-[95vw] sm:max-w-none mx-auto"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Header */}
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              {t.email.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">{t.email.from}</p>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            {t.email.description}
          </p>

          {/* Details Card */}
          <div className="border border-gray-800/80
                        p-3 sm:p-4
                        space-y-2 sm:space-y-3
                        text-sm sm:text-base">
            <DetailItem Icon={Clock} text={t.email.details.time} />
            <DetailItem Icon={Calendar} text={t.email.details.validity} />
            <DetailItem Icon={MapPin} text={t.email.details.location} />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 w-full">
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto
                        border border-accent-500/40
                        hover:bg-accent-500/10
                        text-accent-500
                        px-4 sm:px-6
                        py-2.5 sm:py-3
                        text-sm sm:text-base
                        rounded-lg font-medium
                        transition-colors duration-200
                        flex items-center justify-center gap-2"
            >
              {t.email.cta.schedule}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

EmailContent.displayName = 'EmailContent';
export default EmailContent;