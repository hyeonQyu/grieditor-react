import { TableditorProps } from '@components/tableditor';
import { MutableRefObject, useCallback, useState } from 'react';
import { CellData, ChangeContentEventHandler, HoverCellEventHandler, RowColumn } from '@components/tableditor/constants';
import useClickOutside from '@hooks/useClickOutside';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  cells: CellData[][];
  rowColumnHovered: RowColumn | null;
  rowColumnFocused: RowColumn | null;
  onHoverCell: HoverCellEventHandler;
  onFocusCell: HoverCellEventHandler;
  onChangeContent: ChangeContentEventHandler;
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
  const [rowColumnHovered, setRowColumnHovered] = useState<RowColumn | null>(null);
  const [rowColumnFocused, setRowColumnFocused] = useState<RowColumn | null>(null);

  const { ref: tableRef } = useClickOutside<HTMLTableElement>({
    onClickOutside: () => onFocusCell(null),
  });

  const onHoverCell: HoverCellEventHandler = useCallback((rowColumn) => {
    setRowColumnHovered(rowColumn);
  }, []);

  const onFocusCell: HoverCellEventHandler = useCallback((rowColumn) => {
    setRowColumnFocused(rowColumn);
  }, []);

  const onChangeContent: ChangeContentEventHandler = useCallback(({ row, column, content }) => {
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
    rowColumnHovered,
    rowColumnFocused,
    onHoverCell,
    onFocusCell,
    onChangeContent,
  };
}
