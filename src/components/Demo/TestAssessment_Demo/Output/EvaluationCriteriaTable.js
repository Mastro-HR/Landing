// src/components/TestAssessmentAnalysis/EvaluationCriteriaTable.jsx

import React from 'react';
import PropTypes from 'prop-types';

const EvaluationCriteriaTable = ({ evaluationCriteria, language }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-2xl font-semibold mb-4">{evaluationCriteria.title}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              {language === 'it' ? 'Criterio' : 'Criterion'}
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              1
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              2
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              3
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
              4
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {evaluationCriteria.criteria.map((criterion, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                {criterion.criterion}
              </td>
              {criterion.scoring.map((level, i) => (
                <td key={i} className="px-4 py-2 text-sm text-gray-700">
                  {level.description}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

EvaluationCriteriaTable.propTypes = {
  evaluationCriteria: PropTypes.shape({
    title: PropTypes.string.isRequired,
    criteria: PropTypes.arrayOf(PropTypes.shape({
      criterion: PropTypes.string.isRequired,
      scoring: PropTypes.arrayOf(PropTypes.shape({
        level: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default EvaluationCriteriaTable;
