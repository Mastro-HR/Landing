// PersonaSectionList.jsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; 
// or wherever your custom Card components come from
// (If you don't have custom Card components, you can simply use <div> wrappers)

const PersonaSectionList = ({ sections = [] }) => {
  if (!sections.length) {
    return (
      <div className="text-gray-500">
        No Persona Profile sections found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <Card key={index} className="mb-6 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6 leading-relaxed">{section.content}</p>
            <div className="space-y-3">
              {section.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-500 mt-2" />
                  <span className="text-gray-600 leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonaSectionList;
