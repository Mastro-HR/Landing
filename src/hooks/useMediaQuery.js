// useMediaQuery.js
import { useState, useEffect, useCallback, useMemo } from 'react';

export const breakpoints = {
  mobile: '(max-width: 640px)',
  tablet: '(max-width: 1024px)',
  desktop: '(min-width: 1025px)',
  landscape: '(orientation: landscape)',
  portrait: '(orientation: portrait)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  reducedMotion: '(prefers-reduced-motion: reduce)'
};

export const useMediaQuery = (query) => {
  const mediaQuery = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return window.matchMedia(query);
  }, [query]);

  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return mediaQuery?.matches ?? false;
  });

  const handleChange = useCallback((event) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (!mediaQuery) return;

    setMatches(mediaQuery.matches);

    const safeAddListener = () => {
      try {
        mediaQuery.addEventListener('change', handleChange);
        return true;
      } catch {
        mediaQuery.addListener(handleChange);
        return false;
      }
    };

    const isModernAPI = safeAddListener();

    return () => {
      if (isModernAPI) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [mediaQuery, handleChange]);

  return matches;
};
