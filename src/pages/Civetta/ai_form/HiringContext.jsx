import React from 'react';
import HiringContext_Form_Container from '@/components/Demo/HiringContext_Demo/HiringContext_Form_Container';

export default function HiringContext() {
  return (
    // Using relative positioning and proper padding/margin to work with fixed header
    <div className="relative w-full min-h-screen bg-white">
      {/* Main content container with automatic margin adjustment */}
      <div className="w-full p-4 pt-16"> {/* pt-16 accounts for header height */}
        <div className="max-w-7xl mx-auto">
          {/* Content wrapper */}
          <div className="w-full mt-6">
            <HiringContext_Form_Container />
          </div>
        </div>
      </div>
    </div>
  );
}