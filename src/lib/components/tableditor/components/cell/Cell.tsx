/** @jsxImportSource @emotion/react */
import { CellData, HoverCellEventHandler } from '@components/tableditor/constants';
import { css } from '@emotion/react';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';

export interface CellProps {
  cell: CellData;
  row: number;
  column: number;
  onHoverCell: HoverCellEventHandler;
}

function Cell(props: CellProps) {
  const {
    cell: { width, content, backgroundColor, font },
  } = props;
  const { handleHoverCell } = useCell(props);

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onMouseEnter={handleHoverCell}
      css={css`
        padding: 8px;
        outline: none;
      `}
      style={{
        width,
        backgroundColor,
        color: font.color,
      }}
    >
      {content}
    </div>
  );
}

export const MemoCell = React.memo(Cell, (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
});
