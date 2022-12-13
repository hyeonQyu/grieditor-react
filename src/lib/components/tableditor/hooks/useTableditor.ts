import { TableditorProps } from '@components/tableditor';
import { MutableRefObject, useCallback, useState } from 'react';
import {
  CellData,
  CellChangeEventHandler,
  CellHoverEventHandler,
  CellFocusEventHandler,
  CellFocusEvent,
  CellHoverEvent,
} from '@components/tableditor/constants';
import useClickOutside from '@hooks/useClickOutside';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  cells: CellData[][];
  cellHoverEvent: CellHoverEvent | undefined;
  cellFocusEvent: CellFocusEvent | undefined;
  onHoverCell: CellHoverEventHandler;
  onFocusCell: CellHoverEventHandler;
  onChangeContent: CellChangeEventHandler;
}

const defaultCell: CellData = {
  width: 120,
  content: '',
  backgroundColor: 'white',
  font: {
    color: 'black',
    style: 'default',
  },
};

export function useTableditor(params: IUseTableditorParams): IUseTableditor {
  const {
    cells: initialCells = [
      [{ ...defaultCell }, { ...defaultCell }],
      [{ ...defaultCell }, { ...defaultCell }],
    ],
  } = params;

  const [cells, setCells] = useState<CellData[][]>(initialCells);
  const [cellHoverEvent, setCellHoverEvent] = useState<CellHoverEvent>();
  const [cellFocusEvent, setCellFocusEvent] = useState<CellFocusEvent>();

  const { ref: tableRef } = useClickOutside<HTMLTableElement>({
    onClickOutside: () => onFocusCell(),
  });

  const onHoverCell: CellHoverEventHandler = useCallback((e) => {
    setCellHoverEvent(e);
  }, []);

  const onFocusCell: CellFocusEventHandler = useCallback(
    (e) => {
      if (e) {
        const { rowColumn } = e;
        const rowCount = cells.length;
        if (rowCount <= rowColumn.row || rowColumn.row < 0) {
          // Row limitation
          return;
        }

        const columnCount = cells[rowColumn.row].length;
        if (columnCount <= rowColumn.column) {
          // To next row
          onFocusCell({
            ...e,
            rowColumn: {
              row: rowColumn.row + 1,
              column: 0,
            },
          });
          return;
        }
        if (rowColumn.column < 0) {
          // To previous row
          onFocusCell({
            ...e,
            rowColumn: {
              row: rowColumn.row - 1,
              column: (cells[rowColumn.row - 1]?.length ?? 1) - 1,
            },
          });
          return;
        }
      }

      setCellFocusEvent(e);
    },
    [cells],
  );

  const onChangeContent: CellChangeEventHandler = useCallback(({ rowColumn: { row, column }, content }) => {
    setCells((prev) => {
      // Content not changed
      if (prev[row][column].content === content) {
        return prev;
      }

      return prev.map((rows, rowIndex) => {
        return rows.map((cell, columnIndex) => {
          if (row === rowIndex && column === columnIndex) {
            return {
              ...cell,
              content,
            };
          }
          return cell;
        });
      });
    });
  }, []);

  return {
    tableRef,
    cells,
    cellHoverEvent,
    cellFocusEvent,
    onHoverCell,
    onFocusCell,
    onChangeContent,
  };
}
