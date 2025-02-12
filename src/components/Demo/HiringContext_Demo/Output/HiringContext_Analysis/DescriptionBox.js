// HiringContext_Analysis/DescriptionBox.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

const DescriptionBox = ({ title, text }) => (
  <Card className="w-full overflow-hidden">
    <div className="bg-white text-gray-600">
    <div className="px-6 py-2 md:px-8 lg:px-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
              {text || 'Default description text...'}
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