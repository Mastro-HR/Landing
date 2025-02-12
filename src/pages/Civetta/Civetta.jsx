import React from 'react';
import ValueProposition from '@/components/Demo/ValueProposition';

const Civetta = () => {
  return (
    // Remove fixed height constraints, use flex-grow instead
    <div className="w-full flex flex-col min-h-[100dvh]">
      <div className="absolute inset-0">
        {/* Background content */}
      </div>
      <main className="relative flex-1 z-10 overflow-hidden">
        <ValueProposition />
      </main>
    </div>
  );
};

export default Civetta;
