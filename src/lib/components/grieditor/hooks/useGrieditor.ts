import { GrieditorProps } from '@components/grieditor';
import { useState } from 'react';
import { CellData } from '@components/grieditor/constants';

export interface IUseGrieditorParams extends GrieditorProps {}

export interface IUseGrieditor {
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

export function useGrieditor(params: IUseGrieditorParams): IUseGrieditor {
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
