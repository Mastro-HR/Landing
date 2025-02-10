import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/pages/static_translation';

const PARTNERS = [
  { src: '/images/OFP.png', alt: 'OFP' },
  { src: '/images/TP.png', alt: 'Together Price' },
  { src: '/images/MB.png', alt: 'MB' },
];

const getLogoSize = (isMobile, isTablet, isLargeScreen) => {
  if (isMobile) return { width: 80, height: 50 };
  if (isTablet) return { width: 100, height: 65 };
  if (isLargeScreen) return { width: 140, height: 95 };
  return { width: 120, height: 80 };
};

const PartnerLogo = memo(({ src, alt, logoSize, t }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="group relative flex items-center justify-center min-w-[120px] xs:min-w-[140px] sm:min-w-[180px] lg:min-w-[200px]"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}>
      <div className="relative overflow-hidden bg-transparent p-2 xs:p-3 sm:p-6 transition-all duration-300 w-full">
        <div className="relative z-10 flex items-center justify-center">
          {!imageError ? (
            <motion.img
              src={src}
              alt={`${alt} ${t.altText.logo}`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              style={{ ...logoSize, objectFit: 'contain' }}
              className="transition-all duration-300"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-400 text-sm">
              {alt}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

PartnerLogo.displayName = 'PartnerLogo';

const TrustedPartners = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isLargeScreen = useMediaQuery('(min-width: 1536px)');
  const { language } = useLanguage();
  const t = translations[language].trustedPartners;
  
  const logoSize = getLogoSize(isMobile, isTablet, isLargeScreen);
  const scrollDuration = isMobile ? 25 : isTablet ? 35 : 40;

  return (
    <section className="py-6 xs:py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <motion.header
          className="text-center mb-6 xs:mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-semibold text-gray-900">
            {t.title}
          </h2>
          <p className="mt-2 sm:mt-3 text-sm xs:text-md sm:text-base text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.header>

        <div className="relative">
          <div className="overflow-hidden mx-auto">
            <div className="flex logo-scroll">
              <div 
                className="flex gap-x-3 xs:gap-x-4 sm:gap-x-6 md:gap-x-8"
                style={{
                  animation: `continuous-scroll ${scrollDuration}s linear infinite`,
                  '@media (hover: hover)': {
                    '&:hover': {
                      animationPlayState: 'paused'
                    }
                  },
                  '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none',
                    transform: 'translateX(0)'
                  }
                }}>
                {[...Array(2)].map((_, setIndex) => (
                  <div
                    key={setIndex}
                    className="flex items-center gap-3 xs:gap-4 sm:gap-6 md:gap-8">
                    {PARTNERS.map((partner, index) => (
                      <PartnerLogo
                        key={`set${setIndex}-${index}`}
                        {...partner}
                        logoSize={logoSize}
                        t={t}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 left-0 w-8 xs:w-12 sm:w-24 lg:w-32 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 xs:w-12 sm:w-24 lg:w-32 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none" />
        </div>
      </div>

      <style>{`
        @keyframes continuous-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 8px)); }
        }
      `}</style>
    </section>
  );
};

export default memo(TrustedPartners);