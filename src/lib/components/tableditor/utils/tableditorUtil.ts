import { CellData, CellHoverEvent, RenderingCellData, ResizeEvent } from '@components/tableditor/defines';
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
   * Return table extenders are visible
   * @param cells
   * @param cellHoverEvent
   * @param resizeEvent
   */
  export function getTableExtenderVisible(
    cells: CellData[][],
    cellHoverEvent?: CellHoverEvent,
    resizeEvent?: ResizeEvent,
  ): { rowAddExtenderVisible: boolean; columnAddExtenderVisible: boolean } {
    if (!cellHoverEvent || resizeEvent) {
      return {
        rowAddExtenderVisible: false,
        columnAddExtenderVisible: false,
      };
    }

    const {
      rowColumn: { row, column },
    } = cellHoverEvent;

    const isLastRowHovered = row === cells.length - 1;
    const isLastColumnHovered = column === cells[row].length - 1;

    return {
      rowAddExtenderVisible: isLastRowHovered,
      columnAddExtenderVisible: isLastColumnHovered,
    };
  }
}
