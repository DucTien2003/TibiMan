import { useState, useEffect } from 'react';

export const useWindowScroll = () => {
  const [isTopPage, setIsTopPage] = useState(window.scrollY === 0);

  useEffect(() => {
    const handler = () => {
      setIsTopPage(window.scrollY === 0);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return isTopPage;
};
