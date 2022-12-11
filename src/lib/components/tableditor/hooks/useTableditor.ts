import { TableditorProps } from '@components/tableditor';
import { useCallback, useState } from 'react';
import { CellData, ChangeContentEventHandler, HoverCellEventHandler, RowColumn } from '@components/tableditor/constants';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  cells: CellData[][];
  onHoverCell: HoverCellEventHandler;
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
  const [rowColumn, setRowColumn] = useState<RowColumn>();

  const onHoverCell: HoverCellEventHandler = useCallback((rowColumn) => {
    setRowColumn(rowColumn);
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
    cells,
    onHoverCell,
    onChangeContent,
  };
}
