// HiringContext_Analysis/utils.js

export const formatQuestionnaireData = (answers) => {
  if (!answers || Object.keys(answers).length === 0) return {};

  return Object.fromEntries(
    Object.entries(answers).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.join(', ')];
      }
      if (typeof value === 'object' && value !== null) {
        return [key, JSON.stringify(value)];
      }
      return [key, String(value)];
    })
  );
};

export const formatStrategicContent = (strategic) => {
  if (!strategic) return '';
  return `
    <div class="analysis-section">
      <div class="section-item">
        <strong>Current State Analysis:</strong>
        <p>${strategic.current_state || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Future Needs Assessment:</strong>
        <p>${strategic.future_needs || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Gap Analysis:</strong>
        <p>${strategic.gap_analysis || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Action Steps:</strong>
        <p>${strategic.actionable_steps || 'N/A'}</p>
      </div>
    </div>
  `;
};

export const formatProfileContent = (profile) => {
  if (!profile) return '';
  return `
    <div class="analysis-section">
      <div class="section-item">
        <strong>Key Attributes:</strong>
        <p>${profile.key_attributes || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Required Skills:</strong>
        <p>${profile.required_skills || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Relevant Experience:</strong>
        <p>${profile.relevant_experiences || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Cultural Fit:</strong>
        <p>${profile.cultural_fit || 'N/A'}</p>
      </div>
    </div>
  `;
};

export const formatImpactContent = (impact) => {
  if (!impact) return '';
  return `
    <div class="analysis-section">
      <div class="section-item">
        <strong>Strategic Blindspots:</strong>
        <p>${impact.strategic_blindspots || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Decision Biases:</strong>
        <p>${impact.decision_biases || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Hidden Costs:</strong>
        <p>${impact.hidden_costs || 'N/A'}</p>
      </div>
      <div class="section-item">
        <strong>Critical Challenges:</strong>
        <p>${impact.critical_challenges || 'N/A'}</p>
      </div>
    </div>
  `;
};

export const getHighlights = (data, fields) =>
  Object.entries(fields)
    .map(([key]) => data?.[key])
    .filter(Boolean);
