import { RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement>, onClick: () => void) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    },
    [ref, onClick],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};
