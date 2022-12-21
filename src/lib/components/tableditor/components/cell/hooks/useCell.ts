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
} from 'react';
import { ContentEditableUtil } from '@utils/contentEditableUtil';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  resizerRef: MutableRefObject<HTMLDivElement | null>;
  handleTableDataHover: MouseEventHandler<HTMLTableDataCellElement>;
  handleTableDataClick: MouseEventHandler<HTMLTableDataCellElement>;
  handleContentEditableFocus: FocusEventHandler<HTMLDivElement>;
  handleContentEditableKeyDown: KeyboardEventHandler<HTMLDivElement>;
  handleResizerMouseEnter: MouseEventHandler<HTMLDivElement>;
  handleResizerMouseLeave: MouseEventHandler<HTMLDivElement>;
  handleResizerMouseDown: MouseEventHandler<HTMLDivElement>;
  handleResizerMouseUp: MouseEventHandler<HTMLDivElement>;
  handleResizerPreventDrag: DragEventHandler<HTMLDivElement>;
  handleResizerDragEnd: DragEventHandler<HTMLDivElement>;
}

export function useCell(params: IUseCellParams): IUseCell {
  const {
    cell: { focused, isResizing, contentEditableRef },
    row,
    column,
    focusEvent,
    onCellHover,
    onCellFocus,
    onContentChange,
    onResizerHover,
    onResizeStart,
    onResizeEnd,
    onCellInsertNewline,
  } = params;

  const resizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focused) {
      onContentChange({ rowColumn: { row, column }, content: contentEditableRef.current?.innerText ?? '' });
      return;
    }

    // Move cursor position
    const selectionNode = (contentEditableRef?.current?.firstChild ?? contentEditableRef?.current) as Node;
    // const { caretPosition } = focusEvent!;
    // if (caretPosition) {
    //   ContentEditableUtil.moveCaret(selectionNode, caretPosition);
    // }
  }, [focused, focusEvent, onContentChange, row, column]);

  const handleTableDataHover: MouseEventHandler<HTMLTableDataCellElement> = useCallback(() => {
    onCellHover({ rowColumn: { row, column } });
  }, [row, column, onCellHover]);

  const handleTableDataClick: MouseEventHandler<HTMLTableDataCellElement> = useCallback(() => {
    if (!isResizing) {
      contentEditableRef.current?.focus();
    }
  }, [isResizing]);

  const handleContentEditableFocus: FocusEventHandler<HTMLDivElement> = useCallback(() => {
    onCellFocus({ rowColumn: { row, column } });
  }, [row, column, onCellFocus]);

  const handleContentEditableKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();

          if (e.shiftKey) {
            const content = ContentEditableUtil.insertNewlineToContent(contentEditableRef.current?.innerText ?? '');
            onContentChange({ rowColumn: { row, column }, content });
            return;
          }

          onCellFocus({ rowColumn: { row: row + 1, column }, caretPosition: 'tail' });
          return;

        case 'ArrowRight':
          if (e.shiftKey) return;

          if (ContentEditableUtil.getIsMovableToRight()) {
            e.preventDefault();
            onCellFocus({ rowColumn: { row, column: column + 1 }, caretPosition: 'head' });
          }
          return;

        case 'ArrowLeft':
          if (e.shiftKey) return;

          if (ContentEditableUtil.getIsMovableToLeft()) {
            e.preventDefault();
            onCellFocus({ rowColumn: { row, column: column - 1 }, caretPosition: 'tail' });
          }
          return;

        case 'ArrowUp':
          if (e.shiftKey) return;

          if (ContentEditableUtil.getIsMovableToUp()) {
            e.preventDefault();
            onCellFocus({ rowColumn: { row: row - 1, column }, caretPosition: 'tail' });
          }
          return;

        case 'ArrowDown':
          if (e.shiftKey) return;

          if (ContentEditableUtil.getIsMovableToDown()) {
            e.preventDefault();
            onCellFocus({ rowColumn: { row: row + 1, column }, caretPosition: 'tail' });
          }
          return;
      }
    },
    [row, column, onCellFocus],
  );

  const handleResizerMouseEnter: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizerHover({ rowColumn: { row, column } });
  }, [row, column, onResizerHover]);

  const handleResizerMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizerHover();
  }, [onResizerHover]);

  const handleResizerMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeStart({ rowColumn: { row, column }, pivotX: contentEditableRef.current?.getBoundingClientRect().x });
  }, [onResizeStart, row, column]);

  const handleResizerMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeEnd();
  }, [onResizeEnd]);

  const handleResizerPreventDrag: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleResizerDragEnd: DragEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeEnd();
  }, [onResizeEnd]);

  return {
    resizerRef,
    handleTableDataHover,
    handleTableDataClick,
    handleContentEditableFocus,
    handleContentEditableKeyDown,
    handleResizerMouseEnter,
    handleResizerMouseLeave,
    handleResizerMouseDown,
    handleResizerMouseUp,
    handleResizerPreventDrag,
    handleResizerDragEnd,
  };
}
