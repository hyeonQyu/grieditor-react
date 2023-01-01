import { CellData, CellHoverEvent, RenderingCellData } from '@components/tableditor/defines';
import { Direction } from '@defines/types';
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

  /**
   * Return last row and column is hovered
   * @param cells
   * @param e
   */
  export function getLastRowColumnHovered(cells: CellData[][], e?: CellHoverEvent): { isLastRowHovered: boolean; isLastColumnHovered: boolean } {
    if (!e) {
      return {
        isLastRowHovered: false,
        isLastColumnHovered: false,
      };
    }

    const {
      rowColumn: { row, column },
    } = e;

    const isLastRowHovered = row === cells.length - 1;
    const isLastColumnHovered = column === cells[row].length - 1;

    return {
      isLastRowHovered,
      isLastColumnHovered,
    };
  }
}
