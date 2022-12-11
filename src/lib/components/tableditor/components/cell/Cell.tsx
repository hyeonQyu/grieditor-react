/** @jsxImportSource @emotion/react */
import { CellData, ChangeContentEventHandler, HoverCellEventHandler } from '@components/tableditor/constants';
import { css } from '@emotion/react';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';

export interface CellProps {
  cell: CellData;
  row: number;
  column: number;
  onHoverCell: HoverCellEventHandler;
  onChangeContent: ChangeContentEventHandler;
}

function Cell(props: CellProps) {
  const {
    cell: { width, content, backgroundColor, font },
  } = props;
  const { ref, height, focused, handleHover, handleChangeContent, handleFocus, handleBlur } = useCell(props);

  return (
    <td
      css={css`
        border: 1px solid #dcdcdc;
      `}
    >
      <div
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        onMouseEnter={handleHover}
        onInput={handleChangeContent}
        onFocus={handleFocus}
        onBlur={handleBlur}
        css={css`
          padding: 8px;
          outline: none;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            width: ${width}px;
            height: ${height}px;
            border: ${focused ? '1px solid #00BBC7FF' : 'none'};
          }
        `}
        style={{
          width,
          backgroundColor,
          color: font.color,
        }}
      >
        {content}
      </div>
    </td>
  );
}

export const MemoCell = React.memo(Cell, (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
});
