import { MutableRefObject, useEffect, useRef } from 'react';

export interface IUseClickOutsideParams {
  onClickOutside: (e?: MouseEvent) => void;
}

export interface IUseClickOutside<T> {
  ref: MutableRefObject<T | null>;
}

export function useClickOutside<T extends HTMLElement>(params: IUseClickOutsideParams): IUseClickOutside<T> {
  const { onClickOutside } = params;
  const ref = useRef<T>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (!ref.current || !ref.current?.contains(e.target as Node)) {
        onClickOutside(e);
      }
    };

    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [ref, onClickOutside]);

  return {
    ref,
  };
}

export default useClickOutside;
