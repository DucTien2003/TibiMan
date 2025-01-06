import { useState, useCallback } from 'react';

export function useRemount() {
  const [key, setKey] = useState(0);

  const remountKey = useCallback(() => {
    setKey((prevKey) => prevKey + 1);
  }, []);

  return [key, remountKey];
}
