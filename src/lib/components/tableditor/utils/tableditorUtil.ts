import { CellData, RenderingCellData } from '@components/tableditor/constants';
import { Direction } from '@constants/types';
import { useRef } from 'react';

export namespace TableditorUtil {
  /**
   * Return default rendering cell data from the cells passed as prop
   * @param cells The cells passed as prop
   */
  export function cellsToInitialRenderingCells(cells: CellData[][]): RenderingCellData[][] {
    return cells.map((row) => {
      return row.map((cell) => {
        return {
          focused: false,
          resizerHovered: false,
          isResizing: false,
          contentEditableRef: useRef(null),
          caretOffset: 0,
          ...cell,
        };
      });
    });
  }

  export function getCellCaretOffsetFromDirection(cell: RenderingCellData, direction?: Direction): number {
    switch (direction) {
      case 'up':
      case 'left':
      case 'down':
        return cell.content.length;

      case 'right':
        return 0;

      default:
        return cell.caretOffset;
    }
  }
}
