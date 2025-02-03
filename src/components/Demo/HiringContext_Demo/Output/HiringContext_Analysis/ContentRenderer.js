// src/components/ContentRenderer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const ContentRenderer = ({ selectedSection, analysisResult }) => {
  const analysisData = analysisResult?.hiring_context;
  console.log('[ContentRenderer] analysisData:', analysisData);

  if (!analysisData) {
    console.warn('No analysis data found in analysisResult:', analysisResult);
    return null;
  }

  // Just read the selectedSection from analysisData
  const sectionData = analysisData[selectedSection];
  if (!sectionData) {
    console.warn(`No data found for section '${selectedSection}'`, analysisResult);
    return null;
  }

  // Render function for nested content
  const renderArrayContent = (content) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc pl-4 space-y-2">
          {content.map((item, idx) => (
            <li key={idx} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    if (typeof content === 'object' && content !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(content).map(([key, value]) => (
            <div key={key} className="ml-4">
              <h5 className="font-medium text-gray-900 mb-2 capitalize">
                {key.replace(/_/g, ' ')}
              </h5>
              {renderArrayContent(value)}
            </div>
          ))}
        </div>
      );
    }
    return <p className="text-gray-700">{content}</p>;
  };

  return (
    <div className="space-y-6">
      {/* Each top-level key in sectionData => Card */}
      {Object.entries(sectionData).map(([subKey, subValue]) => (
        <Card key={subKey} className="overflow-hidden">
          <CardHeader className="bg-gray-50 border-b border-gray-200 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {subKey.replace(/_/g, ' ')}
            </h3>
          </CardHeader>
          <CardContent className="p-6">
            {renderArrayContent(subValue)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

ContentRenderer.propTypes = {
  selectedSection: PropTypes.string.isRequired,
  analysisResult: PropTypes.object.isRequired,
};

export default ContentRenderer;
