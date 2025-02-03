// ui/switch.jsx
import React from 'react';

const Switch = ({ checked, onCheckedChange, disabled = false }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full
        border-2 border-transparent transition-colors duration-200 ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500
        focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? 'bg-accent-500' : 'bg-gray-700'}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 transform rounded-full
          bg-white shadow-lg ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-4' : 'translate-x-0'}
        `}
      />
    </button>
  );
};

Switch.displayName = 'Switch';

export { Switch };
