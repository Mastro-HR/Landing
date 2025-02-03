// HiringContext_Analysis/SectionCard.jsx

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const SectionCard = memo(({ icon: Icon, title, description, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-3 sm:p-4 rounded-lg border ${
      isSelected ? 'bg-accent-50 border-accent-200' : 'bg-white border-gray-200'
    } hover:shadow-md transition-all group`}
  >
    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
      <div
        className={`p-1.5 sm:p-2 rounded-lg ${
          isSelected ? 'bg-accent-100' : 'bg-gray-100'
        } group-hover:bg-accent-100`}
      >
        <Icon
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            isSelected ? 'text-accent-600' : 'text-gray-600'
          } group-hover:text-accent-600`}
        />
      </div>
      <h3
        className={`font-normal text-sm sm:text-base ${
          isSelected ? 'text-accent-900' : 'text-gray-900'
        }`}
      >
        {title}
      </h3>
    </div>
    <p className="text-xs sm:text-sm text-gray-600 pl-8 sm:pl-12 font-normal">
      {description}
    </p>
  </button>
));

SectionCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default SectionCard;
