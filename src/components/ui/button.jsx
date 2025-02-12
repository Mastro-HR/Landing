// src/components/ui/button.jsx
import React from 'react';

export const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-accent-500 text-white hover:bg-accent-600",
    outline: "border border-surface-light bg-transparent text-primary-100 hover:bg-surface-light",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";