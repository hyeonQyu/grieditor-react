import { MutableRefObject, useEffect, useRef } from 'react';

export interface IUseElementResizeParams {
  onResize: (element: Element) => void;
}

export interface IUseElementResize<T> {
  ref: MutableRefObject<T | null>;
}

function useElementResize<T extends HTMLElement>(params: IUseElementResizeParams): IUseElementResize<T> {
  const { onResize } = params;
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        onResize(entries[0].target);
      }
    });

    observer.observe(ref.current as Element);
  }, [onResize]);

  return {
    ref,
  };
}

export default useElementResize;
