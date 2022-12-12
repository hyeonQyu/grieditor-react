import { CellProps } from '@components/tableditor/components/cell';
import { FocusEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  ref: MutableRefObject<HTMLDivElement | null>;
  height: number;
  handleHover: () => void;
  handleFocus: FocusEventHandler<HTMLDivElement>;
}

export function useCell(params: IUseCellParams): IUseCell {
  const { row, column, focused, onHoverCell, onFocusCell, onChangeContent } = params;
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Observe the height of cell
    const observer = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const cell = entries[0];
        setHeight(cell.target.clientHeight);
      }
    });

    observer.observe(ref.current as Element);
  }, []);

  useEffect(() => {
    if (!focused) {
      onChangeContent({ row, column, content: ref.current?.innerText ?? '' });
      return;
    }

    // Move cursor position
    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.selectNodeContents(ref?.current as Node);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  }, [focused, onChangeContent, row, column]);

  const handleHover = useCallback(() => {
    onHoverCell({ row, column });
  }, [row, column]);

  const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(() => {
    onFocusCell({ row, column });
  }, [row, column]);

  return {
    ref,
    height,
    handleHover,
    handleFocus,
  };
}
