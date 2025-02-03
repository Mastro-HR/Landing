// src/components/ui/loading_spinner.jsx
import React from 'react';

export const loading_spinner = ({
  size = 'small',
  className = '',
  color = 'currentColor',
  strokeWidth = 2.5,
  speed = 'normal'
}) => {
  const sizeClasses = {
    tiny: 'h-4 w-4',
    small: 'h-5 w-5',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const speedClasses = {
    fast: 'animate-[spin_0.5s_linear_infinite]',
    normal: 'animate-spin',
    slow: 'animate-[spin_2s_linear_infinite]'
  };

  return (
    <svg 
      className={`inline-block ${speedClasses[speed] || speedClasses.normal} ${sizeClasses[size] || sizeClasses.small} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25"
        cx="12" 
        cy="12" 
        r="10" 
        stroke={color} 
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path 
        className="opacity-75"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};