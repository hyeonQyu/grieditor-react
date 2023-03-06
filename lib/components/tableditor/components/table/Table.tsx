/** @jsxImportSource @emotion/react */
import React, { MouseEventHandler } from 'react';
import { Cell, CellProps } from '@lib/components/tableditor/components/cell';
import { UseTableditor } from '@lib/components/tableditor/hooks/useTableditor';

export interface TableProps
  extends Pick<UseTableditor, 'tableRef' | 'rowMenuRef' | 'columnMenuRef' | 'lastClickedCellMoreOptionButtonRef' | 'cells'>,
    Omit<CellProps, 'cell' | 'row' | 'column'> {
  onMouseLeave: MouseEventHandler<HTMLTableElement>;
}

export function Table(props: TableProps) {
  const { tableRef, cells, onMouseLeave, ...rest } = props;

  return (
    <table ref={tableRef} onMouseLeave={onMouseLeave}>
      <tbody>
        {cells.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, columnIndex) => (
              <Cell key={columnIndex} cell={cell} row={rowIndex} column={columnIndex} {...rest} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
