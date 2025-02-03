import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const bubbles = Array.from({ length: 5 }, (_, i) => ({
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
      'animate-morph-slow'
    ][i % 5]
  }));

  const contentVariants = {
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
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-teal-500 to-black">
      {/* Animated background bubbles */}
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
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div 
          className="text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}>
          <motion.div variants={contentVariants}>
            <span className="text-8xl font-bold text-primary-50">404</span>
          </motion.div>
          
          <motion.div 
            className="space-y-4"
            variants={contentVariants}>
            <h1 className="text-3xl font-bold text-primary-50">Page Not Found</h1>
            <p className="text-lg text-primary-100/80 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            variants={contentVariants}>
            <Link
              to="/"
              className="group relative overflow-hidden px-6 py-3 rounded-full bg-primary-50 text-teal-800 font-medium hover:shadow-xl hover:shadow-accent-500/20 transition-all duration-500 flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/90 to-accent-400/90 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group px-6 py-3 rounded-full bg-primary-50/5 backdrop-blur-xl border border-primary-50/10 text-primary-50 font-medium hover:bg-primary-50/10 transition-all duration-300 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;