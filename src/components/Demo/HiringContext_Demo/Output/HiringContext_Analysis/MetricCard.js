// HiringContext_Analysis/MetricCard.jsx

import React, { memo } from 'react';
import PropTypes from 'prop-types';

const MetricCard = memo(({ label, value }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
    <dt className="text-xs sm:text-sm font-normal text-gray-500 truncate">
      {label}
    </dt>
    <dd className="mt-1 sm:mt-2 text-base sm:text-lg font-normal text-gray-900">
      {value}
    </dd>
  </div>
));

MetricCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default MetricCard;
