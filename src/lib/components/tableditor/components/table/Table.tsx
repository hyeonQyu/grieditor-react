/** @jsxImportSource @emotion/react */
import { Cell, CellProps } from '@components/tableditor/components/cell';
import React, { MouseEventHandler, MutableRefObject } from 'react';
import { RenderingCellData } from '@components/tableditor/defines';

export interface TableProps extends Omit<CellProps, 'cell' | 'row' | 'column'> {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  cells: RenderingCellData[][];
  onMouseLeave: MouseEventHandler<HTMLTableElement>;
}

export function Table(props: TableProps) {
  const { tableRef, cells, onMouseLeave, ...rest } = props;

  return (
    <table ref={tableRef} onMouseLeave={onMouseLeave}>
      <tbody>
        {cells.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => {
              return <Cell key={columnIndex} cell={cell} row={rowIndex} column={columnIndex} {...rest} />;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
