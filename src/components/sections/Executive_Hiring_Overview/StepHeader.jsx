import React, { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// StepHeader.jsx
export const StepHeader = memo(({
  number,
  title,
  description,
  children,
  isLast = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative w-full">
      {/* Container for the step header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 overflow-hidden bg-black transition-colors"
      >
        {/* Clickable button to expand/collapse */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="w-full text-left focus:outline-none"
          aria-expanded={isExpanded}
        >
          <div className="flex items-center justify-between p-3 sm:p-4 gap-6">
            {/* Rest of your button content */}
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-accent-500/50 text-accent-500 flex items-center justify-center">
              <span className="font-semibold text-sm sm:text-base">
                {number}
              </span>
            </div>
            
            {/* Title and description */}
            <div className="flex-1 overflow-hidden">
              <h2 className="font-semibold text-white text-sm sm:text-base md:text-lg truncate">
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-400 leading-snug line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            
            <ChevronDown
              className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-gray-200 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Expandable content area */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="px-4 sm:px-6 pb-4 overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Horizontal divider */}
      {!isLast && <div className="h-px w-full bg-gray-800/50 mb-4" />}
    </div>
  );
});

StepHeader.displayName = 'StepHeader';
