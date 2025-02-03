import React from 'react';
import ValueProposition from '@/components/Demo/ValueProposition';

const Civetta = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 ">
      </div>
      <main className="relative flex-1 z-10">
        <ValueProposition />
      </main>
    </div>
  );
};

export default Civetta;
