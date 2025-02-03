// HiringContext_Analysis/DescriptionBox.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

const DescriptionBox = ({ title, text }) => (
  <Card className="w-full mb-12 overflow-hidden">
    <div className="bg-white text-gray-600">
      <div className="px-6 py-8 md:px-8 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <Info className="w-8 h-8 md:w-10 md:h-10 text-accent-500" 
                   strokeWidth={1.5} 
                   aria-hidden="true" />
            </div>
          </div>
          
          <div className="flex-1 space-y-4">            
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl">
              {text ||
                'By analyzing your company details and your specific responses, we suggest you consider the following strategic steps to enhance your hiring context and organizational growth.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

DescriptionBox.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default React.memo(DescriptionBox);