/** @jsxImportSource @emotion/react */
import { CellData, CellChangeEventHandler, CellHoverEventHandler, CellFocusEventHandler, CellFocusEvent } from '@components/tableditor/constants';
import { css } from '@emotion/react';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';

export interface CellProps {
  cell: CellData;
  row: number;
  column: number;
  focusEvent: CellFocusEvent | undefined;
  onHoverCell: CellHoverEventHandler;
  onFocusCell: CellFocusEventHandler;
  onChangeContent: CellChangeEventHandler;
}

function Cell(props: CellProps) {
  const {
    cell: { width, content, backgroundColor, font },
  } = props;
  const { ref, focused, height, handleHover, handleFocus, handleKeyDown } = useCell(props);

  return (
    <div
      style={{
        width,
      }}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        onMouseEnter={handleHover}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        css={css`
          padding: 8px;
          outline: none;
          line-height: 1.2;
        `}
        style={{
          backgroundColor,
          color: font.color,
        }}
      >
        {content}
      </div>

      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          border: ${focused ? '1px solid #00BBC7FF' : 'none'};
          pointer-events: none;
        `}
        style={{
          width,
          height,
        }}
      />
    </div>
  );
}

export const MemoCell = React.memo(Cell, (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
});
