// CandidatePersona.js
import React from 'react';
import CandidatePersona_Form_Container from '@/components/Demo/CandidatePersona_Demo/CandidatePersona_Form_Container';

export default function CandidatePersona() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Content wrapper with automatic header spacing */}
      <div className="w-full p-4 pt-16"> {/* pt-16 (64px) accounts for fixed header height */}
        <div className="max-w-7xl mx-auto">
          {/* Form container wrapper */}
          <div className="w-full mt-6">
            <CandidatePersona_Form_Container />
          </div>
        </div>
      </div>
    </div>
  );
}