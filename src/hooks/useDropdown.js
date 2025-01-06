import { useState, useRef, useEffect } from 'react';

export const useDropdown = () => {
  const dropdownRef = useRef(null);
  const [isShowDropdown, setIsShowDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShowDropdown(false);
      }
    }

    if (isShowDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, isShowDropdown]);

  return { isShowDropdown, dropdownRef, setIsShowDropdown };
};
