// src/components/Output/HiringContext_Analysis/SectionMenu.jsx

import React from 'react';
import PropTypes from 'prop-types';

const SectionMenu = ({
  sections,
  selectedSection,
  setSelectedSection,
  isMobile,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  // Example UI for a vertical or horizontal menu
  // Each 'sectionKey' might be "strategic_foundation" or "talent_architecture" etc.
  return (
    <nav
      className={`col-span-12 lg:col-span-4 mb-4 lg:mb-0 ${
        isMobile ? 'block' : 'hidden lg:block'
      }`}
    >
      <ul className="space-y-2">
        {Object.entries(sections).map(([sectionKey, config]) => {
          const active = sectionKey === selectedSection;
          return (
            <li key={sectionKey}>
              <button
                onClick={() => {
                  setSelectedSection(sectionKey);
                  if (isMobile) setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 rounded-md text-left ${
                  active
                    ? 'bg-accent-50 text-accent-700 font-semibold'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <config.icon className="w-5 h-5 mr-2" />
                <span>{config.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

SectionMenu.propTypes = {
  sections: PropTypes.object.isRequired,
  selectedSection: PropTypes.string.isRequired,
  setSelectedSection: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired,
};

export default SectionMenu;
