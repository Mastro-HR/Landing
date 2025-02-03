import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = ({ className = '' }) => {
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
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
      'animate-blob-spin',
      'animate-blob-pulse'
    ][i % 7]
  }));

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
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
  );
};

export default BackgroundEffects;