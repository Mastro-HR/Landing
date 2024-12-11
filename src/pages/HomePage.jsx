// src/pages/HomePage.jsx
import React from 'react';
import HeroMain from '../components/sections/HeroMain';
import TrustedPartners from '../components/sections/TrustedPartners';
import ExperienceOverview from '../components/sections/ExperienceOverview';
import TechnologyPillars from '../components/sections/TechnologyPillars';
import AIPlatform from '../components/sections/AIPlatform';
import PowerSection from '../components/sections/PowerSection';
import HowItWorks from '../components/sections/HowItWorks';

const HomePage = () => {
  return (
    <main className="overflow-hidden">
      <HeroMain />
      <TrustedPartners />
      <ExperienceOverview />
      <HowItWorks />
      <PowerSection />
      <AIPlatform />
    </main>
  );
};

export default HomePage;