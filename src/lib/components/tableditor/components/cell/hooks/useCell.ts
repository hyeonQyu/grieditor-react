import { CellProps } from '@components/tableditor/components/cell';
import { FocusEventHandler, KeyboardEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  ref: MutableRefObject<HTMLDivElement | null>;
  height: number;
  handleHover: () => void;
  handleFocus: FocusEventHandler<HTMLDivElement>;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
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

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      // console.log(e.key);
      if (e.key === 'Enter') {
        e.preventDefault();
        onFocusCell({ row: row + 1, column });
        return;
      }

      if (e.key === 'ArrowRight') {
        const selection = window.getSelection();
        const length = selection?.focusNode?.textContent?.length ?? 0;
        const offset = selection?.focusOffset;
        if (offset === length) {
          onFocusCell({ row, column: column + 1 });
        }
        return;
      }

      if (e.key === 'ArrowLeft') {
        const selection = window.getSelection();
        const offset = selection?.focusOffset;
        if (offset === 0) {
          onFocusCell({ row, column: column - 1 });
        }
        return;
      }

      if (e.key === 'ArrowUp') {
        onFocusCell({ row: row - 1, column });
        return;
      }

      if (e.key === 'ArrowDown') {
        onFocusCell({ row: row + 1, column });
        return;
      }
    },
    [row, column],
  );

  return {
    ref,
    height,
    handleHover,
    handleFocus,
    handleKeyDown,
  };
}
