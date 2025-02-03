// hooks/useAnalyticsTracker.js
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAnalyticsTracker = () => {
  const location = useLocation();

  // Automatically track page views
  useEffect(() => {
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location]);

  // Return tracking function for custom events
  const trackEvent = (category, action, label) => {
    ReactGA.event({
      category,
      action,
      label
    });
  };

  return trackEvent;
};
