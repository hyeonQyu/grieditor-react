import { CellProps } from '@components/tableditor/components/cell';
import { FocusEventHandler, KeyboardEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { ContentEditableUtil } from '@utils/contentEditableUtil';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  ref: MutableRefObject<HTMLDivElement | null>;
  focused: boolean;
  height: number;
  handleHover: () => void;
  handleFocus: FocusEventHandler<HTMLDivElement>;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

export function useCell(params: IUseCellParams): IUseCell {
  const { row, column, focusEvent, onHoverCell, onFocusCell, onChangeContent } = params;
  const ref = useRef<HTMLDivElement>(null);
  const focused = focusEvent?.rowColumn.row === row && focusEvent?.rowColumn.column === column;
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
      onChangeContent({ rowColumn: { row, column }, content: ref.current?.innerText ?? '' });
      return;
    }

    // Move cursor position
    const selectionNode = (ref?.current?.firstChild ?? ref?.current) as Node;
    const { directionTo } = focusEvent;
    switch (directionTo) {
      case 'left':
      case 'up':
      case 'down':
        ContentEditableUtil.moveCaretToLast(selectionNode);
        break;

      case 'right':
        ContentEditableUtil.moveCaretToFirst(selectionNode);
        break;
    }
  }, [focused, focusEvent, onChangeContent, row, column]);

  const handleHover = useCallback(() => {
    onHoverCell({ rowColumn: { row, column } });
  }, [row, column]);

  const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(() => {
    onFocusCell({ rowColumn: { row, column } });
  }, [row, column]);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      switch (e.key) {
        case 'Enter':
          if (e.shiftKey) {
            return;
          }
          e.preventDefault();
          onFocusCell({ rowColumn: { row: row + 1, column }, directionTo: 'down' });
          return;

        case 'ArrowRight':
          if (ContentEditableUtil.getIsMovableToRight()) {
            e.preventDefault();
            onFocusCell({ rowColumn: { row, column: column + 1 }, directionTo: 'right' });
          }
          return;

        case 'ArrowLeft':
          if (ContentEditableUtil.getIsMovableToLeft()) {
            e.preventDefault();
            onFocusCell({ rowColumn: { row, column: column - 1 }, directionTo: 'left' });
          }
          return;

        case 'ArrowUp':
          e.preventDefault();
          onFocusCell({ rowColumn: { row: row - 1, column }, directionTo: 'up' });
          return;

        case 'ArrowDown':
          e.preventDefault();
          onFocusCell({ rowColumn: { row: row + 1, column }, directionTo: 'down' });
          return;
      }
    },
    [row, column],
  );

  return {
    ref,
    focused,
    height,
    handleHover,
    handleFocus,
    handleKeyDown,
  };
}
