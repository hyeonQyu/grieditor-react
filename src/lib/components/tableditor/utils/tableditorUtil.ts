import { CellData, CellHoverEvent, DEFAULT_CELL, RenderingCellData, CellResizeEvent, RowColumn } from '@components/tableditor/defines';
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
      selected: false,
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
    resizeEvent?: CellResizeEvent,
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

  /**
   * Add last row
   * @param cells
   */
  export function addRow(cells: RenderingCellData[][]): RenderingCellData[][] {
    return [...cells, getNewRow(cells)];
  }

  /**
   * Add last column
   * @param cells
   */
  export function addColumn(cells: RenderingCellData[][]): RenderingCellData[][] {
    return cells.map((row) => [...row, cellToInitialRenderingCell(DEFAULT_CELL)]);
  }

  /**
   * Return cells new row added
   * @param cells Source cells
   * @param index Index at which the new row will be inserted
   */
  export function getNewRowAddedCells(cells: RenderingCellData[][], index: number): RenderingCellData[][] {
    return [...cells.slice(0, index), getNewRow(cells), ...cells.slice(index)];
  }

  /**
   * Return cells new column added
   * @param cells Source cells
   * @param index Index at which the new column will be inserted
   */
  export function getNewColumnAddedCells(cells: RenderingCellData[][], index: number): RenderingCellData[][] {
    return cells.map((row) => [...row.slice(0, index), cellToInitialRenderingCell(DEFAULT_CELL), ...row.slice(index)]);
  }

  /**
   * Returns cells in which only cells corresponding to a specific row or column have been changed
   * @param cells Source cells
   * @param rowColumn Row, column of the cell to be changed
   * @param getChangedCell Callback that changes and returns the corresponding cell
   */
  export function getSpecificCellChangedCells(
    cells: RenderingCellData[][],
    rowColumn: RowColumn,
    getChangedCell: (cell: RenderingCellData) => RenderingCellData,
  ) {
    const { row, column } = rowColumn;
    return cells.map((rowCells, rowIndex) => {
      if (row !== rowIndex) return rowCells;
      return rowCells.map((cell, columnIndex) => {
        if (column !== columnIndex) return cell;
        return getChangedCell(cell);
      });
    });
  }

  function getNewRow(cells: RenderingCellData[][]): RenderingCellData[] {
    const firstRow = cells[0];
    const columns = firstRow.length;
    return Array.from({ length: columns }, (_, i) =>
      cellToInitialRenderingCell({
        ...DEFAULT_CELL,
        width: firstRow[i].width,
      }),
    );
  }
}
