export const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const SESSION_TIMEOUT = 5 * 60 * 1000;

export const getSessionId = () => {
  const sessionData = JSON.parse(localStorage.getItem('recruitment_session_data')) || {};
  const now = Date.now();

  // Check if the session exists and hasn't expired
  if (sessionData.sessionId && now - sessionData.timestamp < SESSION_TIMEOUT) {
    return sessionData.sessionId;
  }

  const newSessionId = generateSessionId();
  const newSessionData = {
    sessionId: newSessionId,
    timestamp: now,
  };

  localStorage.setItem('recruitment_session_data', JSON.stringify(newSessionData));
  return newSessionId;
};

export const resetSessionId = () => {
  localStorage.removeItem('recruitment_session_data');
};
