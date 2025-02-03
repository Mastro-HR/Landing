// hooks/useIntersectionObserver.ts
import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

const useIntersectionObserver = (
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { triggerOnce = false, threshold = 0.1, rootMargin = '100px', root = null } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, rootMargin, root, triggerOnce]);

  return isIntersecting;
};

export default useIntersectionObserver;