// TestAssessment.js
import React from 'react';
import TestAssessment_Form_Container from '@/components/Demo/TestAssessment_Demo/TestAssessment_Form_Container';

/**
 * TestAssessment component
 * Renders the test assessment form page with proper layout handling for fixed header
 * 
 * Layout structure:
 * - Outer container: Establishes positioning context and full-height background
 * - Content wrapper: Handles padding and spacing relative to fixed header
 * - Inner container: Controls maximum width and centers content
 * - Form container: Renders the main form component
 * 
 * @returns {JSX.Element} The rendered TestAssessment component
 */
export default function TestAssessment() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Content wrapper with automatic header spacing */}
      <div className="w-full p-4 pt-16"> {/* pt-16 (64px) accounts for fixed header height */}
        <div className="max-w-7xl mx-auto">
          {/* Form container wrapper */}
          <div className="w-full mt-6">
            <TestAssessment_Form_Container />
          </div>
        </div>
      </div>
    </div>
  );
}