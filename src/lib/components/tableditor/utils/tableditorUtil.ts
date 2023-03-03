import { CellInfo, CellHoverEvent, defaultCell, InAppCellInfo, CellResizeEvent, RowColumn } from '@components/tableditor/defines';
import { Direction } from '@defines/types';
import { createRef } from 'react';

export namespace TableditorUtil {
  /**
   * Return default in-app cells' data from the cells passed as prop
   * @param cells The cells passed as prop
   */
  export function cellsToInitialInAppCells(cells: CellInfo[][]): InAppCellInfo[][] {
    return cells.map((cellRows) => cellRows.map(cellToInitialInAppCell));
  }

  /**
   * Return cell's data from the in-app cells
   * @param cells
   */
  export function inAppCellsToCells(cells: InAppCellInfo[][]): CellInfo[][] {
    return cells.map((cellRows) => cellRows.map(inAppCellToCell));
  }

  /**
   * Return default in-app cell data from the cell
   * @param cell
   */
  export function cellToInitialInAppCell(cell: CellInfo): InAppCellInfo {
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
   * Return cell from the in-app cell
   * @param cell
   */
  export function inAppCellToCell({ content, width, backgroundColor, font }: InAppCellInfo): CellInfo {
    return { content, width, backgroundColor, font };
  }

  /**
   * Return caret offset of the cell by direction
   * @param cell
   * @param direction
   */
  export function getCellCaretOffsetFromDirection(cell: InAppCellInfo, direction?: Direction): number {
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
    cells: CellInfo[][],
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

    try {
      const isLastRowHovered = row === cells.length - 1;
      const isLastColumnHovered = column === cells[row].length - 1;

      return {
        rowAddExtenderVisible: isLastRowHovered,
        columnAddExtenderVisible: isLastColumnHovered,
      };
    } catch (e) {
      return {
        rowAddExtenderVisible: false,
        columnAddExtenderVisible: false,
      };
    }
  }

  /**
   * Add last row
   * @param cells
   * @param row
   */
  export function addRow(cells: InAppCellInfo[][], row: CellInfo[] = []): InAppCellInfo[][] {
    const originLength = cells[0].length;
    const newRowLength = row.length;

    if (originLength < newRowLength) {
      cells = cells.map((cellRows) => [
        ...cellRows,
        ...Array.from({ length: newRowLength - originLength }, () => cellToInitialInAppCell(defaultCell)),
      ]);
    }

    return [...cells, getNewRow(cells)];
  }

  /**
   * Add last column
   * @param cells
   * @param column
   */
  export function addColumn(cells: InAppCellInfo[][], column: CellInfo[] = []): InAppCellInfo[][] {
    const originLength = cells.length;
    const newColumnLength = column.length;

    const difference = Math.abs(originLength - newColumnLength);

    let inAppColumn = column.map((cell) => cellToInitialInAppCell(cell));

    if (originLength < newColumnLength) {
      cells = [...cells, ...Array.from({ length: difference }, () => getNewRow(cells))];
    } else if (newColumnLength < originLength) {
      inAppColumn = [...inAppColumn, ...Array.from({ length: difference }, () => cellToInitialInAppCell(defaultCell))];
    }

    return cells.map((row, i) => [...row, inAppColumn[i]]);
  }

  /**
   * Return cells new row added
   * @param cells Source cells
   * @param index Index at which the new row will be inserted
   */
  export function getNewRowAddedCells(cells: InAppCellInfo[][], index: number): InAppCellInfo[][] {
    return [...cells.slice(0, index), getNewRow(cells), ...cells.slice(index)];
  }

  /**
   * Return cells new column added
   * @param cells Source cells
   * @param index Index at which the new column will be inserted
   */
  export function getNewColumnAddedCells(cells: InAppCellInfo[][], index: number): InAppCellInfo[][] {
    return cells.map((row) => [...row.slice(0, index), cellToInitialInAppCell(defaultCell), ...row.slice(index)]);
  }

  /**
   * Returns cells in which only cells corresponding to a specific row or column have been changed
   * @param cells Source cells
   * @param rowColumn Row, column of the cell to be changed
   * @param getChangedCell Callback that changes and returns the corresponding cell
   */
  export function getSpecificCellChangedCells(
    cells: InAppCellInfo[][],
    rowColumn: RowColumn,
    getChangedCell: (cell: InAppCellInfo) => InAppCellInfo,
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

  function getNewRow(cells: InAppCellInfo[][], row: CellInfo[] = []): InAppCellInfo[] {
    const firstRow = cells[0];
    const originLength = firstRow.length;
    const newRowLength = row.length;

    if (originLength > newRowLength) {
      row = [...row, ...Array.from({ length: originLength - newRowLength }, () => defaultCell)];
    }

    return row.map((cell, i) => cellToInitialInAppCell({ ...cell, width: firstRow[i].width }));
  }

  export function getRow(cells: InAppCellInfo[][], rowIndex: number): InAppCellInfo[] {
    return cells[rowIndex];
  }
  export function getColumn(cells: InAppCellInfo[][], columnIndex: number): InAppCellInfo[] {
    return cells.map((cellRows) => cellRows[columnIndex]);
  }
}
