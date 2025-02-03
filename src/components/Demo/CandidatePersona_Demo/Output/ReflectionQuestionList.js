// ReflectionQuestionList.jsx

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
// (Again, replace with your own UI components or divs)

const ReflectionQuestionList = ({ questions = [] }) => {
  if (!questions.length) {
    return (
      <div className="text-gray-500">
        No reflection questions available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <Card key={index} className="mb-6 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">{question.question}</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              {question.context}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {question.considerations.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="font-medium text-accent-600 text-lg">•</span>
                  <span className="text-gray-600 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReflectionQuestionList;
