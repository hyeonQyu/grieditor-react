import { TableditorProps } from '@components/tableditor';
import { useCallback, useState } from 'react';
import { CellData, HoverCellEventHandler, RowColumn } from '@components/tableditor/constants';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  cells: CellData[][];
  onHoverCell: HoverCellEventHandler;
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
    console.log(rowColumn);
    setRowColumn(rowColumn);
  }, []);

  return {
    cells,
    onHoverCell,
  };
}
