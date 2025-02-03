// FeatureCard.jsx
import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FeatureCard = memo(({ feature, index, isActive, onToggle, minHeight }) => {
  const Icon = feature.icon;
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Dynamically measure the expandable content
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [feature.details, isActive]);

  return (
    <div
      className={`
        relative bg-white/90 backdrop-blur-md rounded-2xl
        transition-all duration-300 ease-in-out border border-primary-100
        hover:border-primary-200
        ${isActive ? 'shadow-xl border-primary-300' : 'shadow-sm'}
      `}
      style={{ minHeight: minHeight || 'auto' }} // Apply the minimum height
    >
      <button
        onClick={onToggle}
        className="w-full text-left h-full"
        aria-expanded={isActive}
        aria-controls={`feature-${index}-content`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 flex items-start gap-4">
              <div
                className={`
                  p-3 rounded-lg transition-colors duration-300 flex-shrink-0
                  ${isActive ? 'bg-accent-400 text-white' : 'bg-primary-50 text-accent-500'}
                `}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h3
                className={`
                  text-lg sm:text-xl font-semibold transition-colors duration-300 pr-8
                  ${isActive ? 'text-accent-500' : 'text-primary-900'}
                `}
              >
                {feature.title}
              </h3>
            </div>

            <span
              className={`
                flex-shrink-0 transition-transform duration-300 ease-in-out
                ${isActive ? 'rotate-180' : 'rotate-0'}
              `}
            >
              {isActive ? (
                <Minus className="w-6 h-6 text-primary-400" />
              ) : (
                <Plus className="w-6 h-6 text-primary-400" />
              )}
            </span>
          </div>

          {/* Description Section */}
          <p
            className={`
              text-sm sm:text-base leading-relaxed transition-colors duration-300
              mb-2
              ${isActive ? 'text-primary-900' : 'text-primary-600'}
            `}
          >
            {feature.description}
          </p>

          {/* Expandable Details Section */}
          <div
            id={`feature-${index}-content`}
            className={`
              transition-all duration-300 ease-in-out overflow-hidden
              ${isActive ? 'mt-4 opacity-100' : 'h-0 opacity-0'}
            `}
            style={{
              height: isActive ? `${contentHeight}px` : '0',
            }}
          >
            <div ref={contentRef}>
              <div className="pt-4 border-t border-primary-100 space-y-3">
                {feature.details?.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: idx * 0.05 },
                    }}
                    className="flex items-start gap-2 text-primary-600"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
