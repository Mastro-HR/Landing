// ui/checkbox.jsx
import React from 'react';

const Checkbox = ({ checked, onCheckedChange, disabled = false, id }) => {
  return (
    <button
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      className={`
        relative h-4 w-4 shrink-0 rounded-sm border transition-colors
        duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent-500 focus-visible:ring-offset-2
        focus-visible:ring-offset-background disabled:cursor-not-allowed
        disabled:opacity-50
        ${checked 
          ? 'border-accent-500 bg-accent-500 text-white'
          : 'border-gray-600 bg-transparent'
        }
      `}
    >
      {checked && (
        <svg
          className="absolute inset-0 h-full w-full stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
};

Checkbox.displayName = 'Checkbox';

export { Checkbox };