import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Animation configurations
const BUBBLE_ANIMATION = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
};

// Utility function to generate bubbles
const generateBubbles = (isMobile) => {
  const baseSize = isMobile ? 60 : 100;
  const bubbleCount = isMobile ? 3 : 4;
  
  return Array.from({ length: bubbleCount }, (_, i) => ({
    id: i,
    size: Math.random() * baseSize + baseSize,
    initialX: Math.random() * 90,
    initialY: Math.random() * 90,
    delay: i * 0.1,
    animationClass: ['animate-float-1', 'animate-float-2', 'animate-float-3'][i % 3]
  }));
};

// Optimized Background Effects Component
export const BackgroundEffects = React.memo(() => {
  const bubbles = useMemo(() => {
    const isMobile = window.innerWidth < 640;
    return generateBubbles(isMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
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
                rgba(255,111,97,${0.06 + bubble.id * 0.01}),
                rgba(255,143,112,${0.06 + bubble.id * 0.01})
              )`,
              willChange: 'transform, opacity'
            }}
            {...BUBBLE_ANIMATION}
            transition={{
              duration: 0.6,
              delay: bubble.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 bg-flow opacity-20 pointer-events-none" />
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';

// Optimized CTA Button Component
export const CTAButton = React.memo(({ text, href, className = "" }) => (
  <Link
    to={href}
    className={`group relative overflow-hidden px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium text-base sm:text-lg hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-300 flex items-center gap-2 ${className}`}>
    <span className="relative z-10">{text}</span>
    <ChevronRight 
      className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
      aria-hidden="true"
    />
    <div 
      className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      aria-hidden="true"
    />
  </Link>
));

CTAButton.displayName = 'CTAButton';

// Prop Types
CTAButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string
};