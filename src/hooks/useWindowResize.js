import { useState, useEffect } from 'react';

export const useWindowResize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return isMobile;
};
