import { CellProps } from '@components/tableditor/components/cell';
import {
  DragEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ContentEditableUtil } from '@utils/contentEditableUtil';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  ref: MutableRefObject<HTMLDivElement | null>;
  resizerRef: MutableRefObject<HTMLDivElement | null>;
  focused: boolean;
  height: number;
  handleHover: MouseEventHandler<HTMLDivElement>;
  handleFocus: FocusEventHandler<HTMLDivElement>;
  handleKeyDown: KeyboardEventHandler<HTMLDivElement>;
  handleEnterResizer: MouseEventHandler<HTMLDivElement>;
  handleLeaveResizer: MouseEventHandler<HTMLDivElement>;
  handleMouseDownResizer: MouseEventHandler<HTMLDivElement>;
  handleMouseUpResizer: MouseEventHandler<HTMLDivElement>;
  handlePreventDragResizer: DragEventHandler<HTMLDivElement>;
  handleDragEndResizer: DragEventHandler<HTMLDivElement>;
}

export function useCell(params: IUseCellParams): IUseCell {
  const { row, column, focusEvent, onHoverCell, onFocusCell, onChangeContent, onHoverResizer, onResizeStart, onResizeEnd } = params;
  const ref = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
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
      case 'right':
        ContentEditableUtil.moveCaretToFirst(selectionNode);
        break;

      case 'left':
      case 'up':
      case 'down':
        ContentEditableUtil.moveCaretToLast(selectionNode);
        break;
    }
  }, [focused, focusEvent, onChangeContent, row, column]);

  const handleHover: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onHoverCell({ rowColumn: { row, column } });
  }, [row, column, onHoverCell]);

  const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(() => {
    onFocusCell({ rowColumn: { row, column } });
  }, [row, column, onFocusCell]);

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
    [row, column, onFocusCell],
  );

  const handleEnterResizer: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onHoverResizer({ rowColumn: { row, column } });
  }, [row, column, onHoverResizer]);

  const handleLeaveResizer: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onHoverResizer();
  }, [onHoverResizer]);

  const handleMouseDownResizer: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeStart({ column, pivotX: ref.current?.getBoundingClientRect().x });
  }, [onResizeStart, column]);

  const handleMouseUpResizer: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeEnd();
  }, [onResizeEnd]);

  const handlePreventDragResizer: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDragEndResizer: DragEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeEnd();
  }, [onResizeEnd]);

  return {
    ref,
    resizerRef,
    focused,
    height,
    handleHover,
    handleFocus,
    handleKeyDown,
    handleEnterResizer,
    handleLeaveResizer,
    handleMouseDownResizer,
    handleMouseUpResizer,
    handlePreventDragResizer,
    handleDragEndResizer,
  };
}
