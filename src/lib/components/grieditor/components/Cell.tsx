/** @jsxImportSource @emotion/react */
import { CellData } from '@components/grieditor/constants';
import { css } from '@emotion/react';

export interface CellProps {
  cell: CellData;
  row: number;
  column: number;
}

export function Cell(props: CellProps) {
  const {
    cell: { width, content, backgroundColor, font },
  } = props;

  return (
    <div
      contentEditable
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
