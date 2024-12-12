import React from 'react';

const CompanyLogo = ({ src, alt, className = '' }) => {
  return (
    <div className="relative group">
      <img
        src={src}
        alt={alt}
        className={`transition-all duration-300 filter grayscale hover:grayscale-0 
        hover:scale-105 object-contain ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default CompanyLogo;