/** @jsxImportSource @emotion/react */
import { Cell, CellProps } from '@components/tableditor/components/cell';
import React, { MouseEventHandler, MutableRefObject, RefObject } from 'react';
import { RenderingCellData } from '@components/tableditor/defines';
import { MenuRef } from '@components/menu/defines';

export interface TableProps extends Omit<CellProps, 'cell' | 'row' | 'column'> {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  rowMenuRef: RefObject<MenuRef>;
  lastClickedCellMoreOptionButtonRef: MutableRefObject<HTMLButtonElement | null>;
  cells: RenderingCellData[][];
  onMouseLeave: MouseEventHandler<HTMLTableElement>;
}

export function Table(props: TableProps) {
  const { tableRef, rowMenuRef, lastClickedCellMoreOptionButtonRef, cells, onMouseLeave, ...rest } = props;

  return (
    <table ref={tableRef} onMouseLeave={onMouseLeave}>
      <tbody>
        {cells.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <Cell
                key={columnIndex}
                cell={cell}
                row={rowIndex}
                column={columnIndex}
                lastClickedCellMoreOptionButtonRef={lastClickedCellMoreOptionButtonRef}
                rowMenuRef={rowMenuRef}
                {...rest}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
