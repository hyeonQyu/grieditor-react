import { CellData, CellHoverEvent, DEFAULT_CELL, RenderingCellData, ResizeEvent } from '@components/tableditor/defines';
import { Direction } from '@defines/types';
import { createRef } from 'react';

export namespace TableditorUtil {
  /**
   * Return default rendering cells' data from the cells passed as prop
   * @param cells The cells passed as prop
   */
  export function cellsToInitialRenderingCells(cells: CellData[][]): RenderingCellData[][] {
    return cells.map((row) => row.map((cell) => cellToInitialRenderingCell(cell)));
  }

  /**
   * Return default rendering cell data from the cell
   * @param cell
   */
  export function cellToInitialRenderingCell(cell: CellData): RenderingCellData {
    return {
      focused: false,
      resizerHovered: false,
      isResizing: false,
      contentEditableRef: createRef(),
      caretOffset: 0,
      ...cell,
    };
  }

  /**
   * Return caret offset of the cell by direction
   * @param cell
   * @param direction
   */
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

  export function addRow(originCells: RenderingCellData[][]): RenderingCellData[][] {
    const cells = [...originCells];

    const firstRow = cells[0];
    const columns = firstRow.length;
    const row = Array.from({ length: columns }, (_, i) =>
      cellToInitialRenderingCell({
        ...DEFAULT_CELL,
        width: firstRow[i].width,
      }),
    );
    cells.push(row);

    return cells;
  }

  export function addColumn(originCells: RenderingCellData[][]): RenderingCellData[][] {
    const cells = [...originCells];
    return cells.map((row) => [...row, cellToInitialRenderingCell(DEFAULT_CELL)]);
  }
}
