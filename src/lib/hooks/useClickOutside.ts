import { MutableRefObject, useEffect } from 'react';

export interface IUseClickOutsideParams<T> {
  ref: MutableRefObject<T | null>;
  onClickOutside: (e?: MouseEvent) => void;
}

export interface IUseClickOutside {}

export function useClickOutside<T extends HTMLElement>(params: IUseClickOutsideParams<T>): IUseClickOutside {
  const { ref, onClickOutside } = params;

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current?.contains(e.target as Node)) {
        onClickOutside(e);
      }
    };

    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [ref, onClickOutside]);

  return {};
}

export default useClickOutside;
