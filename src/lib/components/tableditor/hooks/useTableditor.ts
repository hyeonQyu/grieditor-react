import { TableditorProps } from '@components/tableditor';
import { useState } from 'react';
import { CellData } from '@components/tableditor/constants';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  cells: CellData[][];
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

  return {
    cells,
  };
}
