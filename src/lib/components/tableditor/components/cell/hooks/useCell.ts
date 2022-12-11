import { CellProps } from '@components/tableditor/components/cell';
import { ChangeEventHandler, MutableRefObject, useCallback, useEffect, useRef } from 'react';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  ref: MutableRefObject<HTMLDivElement | null>;
  handleHoverCell: () => void;
  handleChangeContent: ChangeEventHandler<HTMLDivElement>;
}

export function useCell(params: IUseCellParams): IUseCell {
  const {
    cell: { content },
    row,
    column,
    onHoverCell,
    onChangeContent,
  } = params;
  const ref = useRef<HTMLDivElement>(null);

  // Move cursor position
  useEffect(() => {
    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.selectNodeContents(ref?.current as Node);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
  }, [content]);

  const handleHoverCell = useCallback(() => {
    onHoverCell({ row, column });
  }, [row, column]);

  const handleChangeContent: ChangeEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      onChangeContent({ row, column, content: e.target.innerText });
    },
    [row, column],
  );

  return {
    ref,
    handleHoverCell,
    handleChangeContent,
  };
}
