// frontend/src/components/DetailPanel.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const DetailPanel = ({ data, language, sectionType }) => {
  return (
    <div className="space-y-6">
      {Object.entries(data).map(([key, value]) => {
        // If it's a separator, render nothing
        if (value === '---') return null;

        // If it's a category header (all uppercase), render it as a header
        if (key === key.toUpperCase()) {
          return (
            <div key={key} className="mt-8 first:mt-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {key}
              </h3>
            </div>
          );
        }

        // Regular content
        return (
          <Card key={key} className="bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 bg-gray-50">
              <h4 className="text-base font-medium text-gray-900">{key}</h4>
            </CardHeader>
            <CardContent className="p-4">
              <div className="prose max-w-none">
                <p className="text-gray-700">{value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

DetailPanel.propTypes = {
  data: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  sectionType: PropTypes.string.isRequired,
};

export default DetailPanel;
