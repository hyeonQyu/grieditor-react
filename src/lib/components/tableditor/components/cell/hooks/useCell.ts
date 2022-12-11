import { CellProps } from '@components/tableditor/components/cell';
import { FocusEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  ref: MutableRefObject<HTMLDivElement | null>;
  height: number;
  focused: boolean;
  handleHover: () => void;
  handleFocus: FocusEventHandler<HTMLDivElement>;
  handleBlur: FocusEventHandler<HTMLDivElement>;
}

export function useCell(params: IUseCellParams): IUseCell {
  const { row, column, onHoverCell, onChangeContent } = params;
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [focused, setFocused] = useState(false);

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

  useEffect(() => {
    setHeight(ref.current?.clientHeight ?? 0);
  }, [ref.current?.clientHeight]);

  const handleHover = useCallback(() => {
    onHoverCell({ row, column });
  }, [row, column]);

  const handleFocus: FocusEventHandler<HTMLDivElement> = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur: FocusEventHandler<HTMLDivElement> = useCallback(() => {
    setFocused(false);
  }, []);

  return {
    ref,
    height,
    focused,
    handleHover,
    handleFocus,
    handleBlur,
  };
}
