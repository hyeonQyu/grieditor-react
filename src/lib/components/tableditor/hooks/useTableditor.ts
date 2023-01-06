import { TableditorProps } from '@components/tableditor';
import { MouseEventHandler, MutableRefObject, useCallback, useEffect, useState } from 'react';
import {
  CellFocusEvent,
  CellHoverEvent,
  ResizerHoverEvent,
  ResizeEvent,
  CELL_MIN_WIDTH,
  CellChangeEvent,
  GetEventHandledCells,
  TableditorEventHandler,
  RenderingCellData,
  TableExtender,
  DEFAULT_TABLE_EXTENDER,
  DEFAULT_CELL,
} from '@components/tableditor/defines';
import useClickOutside from '@hooks/useClickOutside';
import { TableditorUtil } from '@components/tableditor/utils/tableditorUtil';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  cells: RenderingCellData[][];
  cellHoverEvent: CellHoverEvent | undefined;
  resizeEvent: ResizeEvent | undefined;
  rowAddExtender: TableExtender;
  columnAddExtender: TableExtender;
  handleMouseMove: MouseEventHandler<HTMLDivElement>;
  handleMouseUp: MouseEventHandler<HTMLDivElement>;
  handleTableMouseLeave: MouseEventHandler<HTMLTableElement>;
  handleRowAddClick: MouseEventHandler<HTMLButtonElement>;
  handleColumnAddClick: MouseEventHandler<HTMLButtonElement>;
  onCellHover: TableditorEventHandler<CellHoverEvent>;
  onCellFocus: TableditorEventHandler<CellFocusEvent>;
  onContentChange: TableditorEventHandler<CellChangeEvent>;
  onResizerHover: TableditorEventHandler<ResizerHoverEvent>;
  onResizeStart: TableditorEventHandler<ResizeEvent>;
  onResizeEnd: TableditorEventHandler<ResizeEvent>;
  onCellKeyDown: TableditorEventHandler<undefined>;
}

export function useTableditor(params: IUseTableditorParams): IUseTableditor {
  const {
    cells: initialCells = [
      [{ ...DEFAULT_CELL }, { ...DEFAULT_CELL }],
      [{ ...DEFAULT_CELL }, { ...DEFAULT_CELL }],
    ],
  } = params;

  const [cells, setCells] = useState<RenderingCellData[][]>(TableditorUtil.cellsToInitialRenderingCells(initialCells));

  const [cellHoverEvent, setCellHoverEvent] = useState<CellHoverEvent>();
  const [resizeEvent, setResizeEvent] = useState<ResizeEvent>();

  const [rowAddExtender, setRowAddExtender] = useState<TableExtender>({ ...DEFAULT_TABLE_EXTENDER });
  const [columnAddExtender, setColumnAddExtender] = useState<TableExtender>({ ...DEFAULT_TABLE_EXTENDER });

  const { ref: tableRef } = useClickOutside<HTMLTableElement>({
    onClickOutside: () => onCellFocus(),
  });

  const getCellFocusEventHandledCells: GetEventHandledCells<CellFocusEvent> = useCallback(({ e, cells }) => {
    if (e) {
      const {
        rowColumn: { row, column },
        direction,
      } = e;
      const rowCount = cells.length;
      if (rowCount <= row || row < 0) {
        // Row limitation
        return cells;
      }

      const columnCount = cells[row].length;
      if (columnCount <= column) {
        // To next row
        return getCellFocusEventHandledCells({
          e: {
            ...e,
            rowColumn: {
              row: row + 1,
              column: 0,
            },
          },
          cells,
        });
      }
      if (column < 0) {
        // To previous row
        return getCellFocusEventHandledCells({
          e: {
            ...e,
            rowColumn: {
              row: row - 1,
              column: (cells[row - 1]?.length ?? 1) - 1,
            },
          },
          cells,
        });
      }

      cells[row][column].contentEditableRef.current?.focus();

      return cells.map((cellRow, rowIndex) => {
        return cellRow.map((cell, columnIndex) => {
          const focused = row === rowIndex && column === columnIndex;
          return {
            ...cell,
            focused,
            caretOffset: focused ? TableditorUtil.getCellCaretOffsetFromDirection(cell, direction) : cell.caretOffset,
          };
        });
      });
    }

    return cells;
  }, []);

  const getCellChangeEventHandledCells: GetEventHandledCells<CellChangeEvent> = useCallback(({ e, cells }) => {
    if (!e) return cells;

    const {
      rowColumn: { row, column },
      content,
    } = e;

    // Content not changed
    if (cells[row][column].content === content) {
      return cells;
    }

    return cells.map((rows, rowIndex) => {
      return rows.map((cell, columnIndex) => {
        if (row === rowIndex && column === columnIndex) {
          return {
            ...cell,
            content,
          };
        }
        return cell;
      });
    });
  }, []);

  const getResizerHoverEventHandledCells: GetEventHandledCells<ResizerHoverEvent> = useCallback(({ e, cells }) => {
    if (e) {
      const { row, column } = e.rowColumn;
      const columnCount = cells[row].length;

      return cells.map((row, rowIndex) => {
        const currentColumnCount = cells[rowIndex].length;
        return row.map((cell, columnIndex) => {
          return {
            ...cell,
            resizerHovered: column === columnIndex && columnCount === currentColumnCount,
          };
        });
      });
    } else {
      return cells.map((row) => {
        return row.map((cell) => {
          return {
            ...cell,
            resizerHovered: false,
          };
        });
      });
    }
  }, []);

  const getResizeEventHandledCells: GetEventHandledCells<ResizeEvent> = useCallback(({ e, cells }) => {
    if (!e) {
      return cells.map((rows) => {
        return rows.map((cell) => {
          return {
            ...cell,
            isResizing: false,
          };
        });
      });
    }

    const {
      rowColumn: { column },
      mouseX,
      pivotX,
    } = e;

    return cells.map((rows) =>
      rows.map((cell, columnIndex) => {
        if (columnIndex === column + 1) {
          return {
            ...cell,
            isResizing: true,
          };
        }
        if (columnIndex === column) {
          const newWidth = mouseX! - pivotX!;
          if (isNaN(newWidth)) {
            return cell;
          }

          return {
            ...cell,
            width: Math.max(CELL_MIN_WIDTH, newWidth),
            isResizing: true,
          };
        }
        return cell;
      }),
    );
  }, []);

  const onCellHover: TableditorEventHandler<CellHoverEvent> = useCallback((e) => {
    setCellHoverEvent(e);
  }, []);

  const onCellFocus: TableditorEventHandler<CellFocusEvent> = useCallback(
    (e) => {
      setCells((cells) => getCellFocusEventHandledCells({ e, cells }));
    },
    [getCellFocusEventHandledCells],
  );

  const onContentChange: TableditorEventHandler<CellChangeEvent> = useCallback(
    (e) => {
      setCells((cells) => getCellChangeEventHandledCells({ e, cells }));
    },
    [getCellChangeEventHandledCells],
  );

  const onResizerHover: TableditorEventHandler<ResizerHoverEvent> = useCallback(
    (e) => {
      setCells((cells) => getResizerHoverEventHandledCells({ e, cells }));
    },
    [getResizerHoverEventHandledCells],
  );

  const onResizeStart: TableditorEventHandler<ResizeEvent> = useCallback((e) => {
    setResizeEvent(e);
  }, []);

  const onResizeEnd: TableditorEventHandler<ResizeEvent> = useCallback(() => {
    setTimeout(() => {
      setResizeEvent(undefined);
    }, 0);
  }, []);

  const onResize: TableditorEventHandler<ResizeEvent> = useCallback((e) => {
    setResizeEvent(e);
  }, []);

  const onCellKeyDown: TableditorEventHandler<undefined> = useCallback(() => {
    setTimeout(() => {
      const { height } = tableRef.current?.getBoundingClientRect()!;

      setRowAddExtender((prev) => ({ ...prev, visible: false }));
      setColumnAddExtender((prev) => ({
        ...prev,
        size: {
          width: prev.size.width,
          height,
        },
        visible: false,
      }));
    }, 0);
  }, []);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!resizeEvent) return;
      e.preventDefault();
      onResize({ rowColumn: resizeEvent.rowColumn, mouseX: e.clientX, pivotX: resizeEvent.pivotX });
    },
    [resizeEvent, onResize],
  );

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeEnd();
  }, [onResizeEnd]);

  const handleTableMouseLeave: MouseEventHandler<HTMLTableElement> = useCallback(() => {
    setCellHoverEvent(undefined);
  }, []);

  const handleRowAddClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setCells(TableditorUtil.addRow);
  }, []);

  const handleColumnAddClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setCells(TableditorUtil.addColumn);
  }, []);

  useEffect(() => {
    setCells((cells) => getResizeEventHandledCells({ e: resizeEvent, cells }));

    if (resizeEvent) {
      setRowAddExtender((prev) => ({ ...prev, visible: false }));
      setColumnAddExtender((prev) => ({ ...prev, visible: false }));
    }
  }, [resizeEvent, getResizeEventHandledCells]);

  useEffect(() => {
    const { rowAddExtenderVisible, columnAddExtenderVisible } = TableditorUtil.getTableExtenderVisible(cells, cellHoverEvent, resizeEvent);

    const { width, height } = tableRef.current?.getBoundingClientRect()!;

    setRowAddExtender((prev) => ({
      size: {
        width,
        height: prev.size.height,
      },
      visible: rowAddExtenderVisible,
    }));

    setColumnAddExtender((prev) => ({
      size: {
        width: prev.size.width,
        height,
      },
      visible: columnAddExtenderVisible,
    }));
  }, [cells, cellHoverEvent, resizeEvent]);

  return {
    tableRef,
    cells,
    cellHoverEvent,
    resizeEvent,
    rowAddExtender,
    columnAddExtender,
    handleMouseMove,
    handleMouseUp,
    handleTableMouseLeave,
    handleRowAddClick,
    handleColumnAddClick,
    onCellHover,
    onCellFocus,
    onContentChange,
    onResizerHover,
    onResizeStart,
    onResizeEnd,
    onCellKeyDown,
  };
}
