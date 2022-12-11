import { CellProps } from '@components/tableditor/components/cell';
import { useCallback } from 'react';

export interface IUseCellParams extends CellProps {}

export interface IUseCell {
  handleHoverCell: () => void;
}

export function useCell(params: IUseCellParams): IUseCell {
  const { row, column, onHoverCell } = params;

  const handleHoverCell = useCallback(() => {
    onHoverCell({ row, column });
  }, [row, column]);

  return {
    handleHoverCell,
  };
}
