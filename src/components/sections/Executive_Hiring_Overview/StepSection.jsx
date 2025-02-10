// StepSection.jsx
import React, { memo, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const StepSection = memo(({ 
  children, 
  className = "",
  priority = false,
  onInView
}) => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
          onInView?.();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls, onInView]);

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: priority ? 0.8 : 1
      }}
      className={`
        bg-gray-900/30 rounded-lg
        p-3 sm:p-4 md:p-6
        shadow-lg backdrop-blur-sm
        hover:bg-gray-900/40 
        hover:shadow-xl
        active:scale-[0.995]
        transform-gpu
        transition-all duration-200
        ${priority ? 'ring-1 ring-accent-500/20' : ''}
        ${className}
      `}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
});

StepSection.displayName = 'StepSection';
