import { MutableRefObject, useEffect } from 'react';

export interface UseClickOutsideParams<T> {
  ref: MutableRefObject<T | null>;
  onClickOutside: (e?: MouseEvent) => void;
  clickEventType?: 'click' | 'mousedown' | 'mouseup';
}

export interface UseClickOutside {}

export function useClickOutside<T extends HTMLElement>(params: UseClickOutsideParams<T>): UseClickOutside {
  const { ref, onClickOutside, clickEventType = 'click' } = params;

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current?.contains(e.target as Node)) {
        onClickOutside(e);
      }
    };

    window.addEventListener(clickEventType, clickOutside);
    return () => {
      window.removeEventListener(clickEventType, clickOutside);
    };
  }, [ref, onClickOutside, clickEventType]);

  return {};
}

export default useClickOutside;
