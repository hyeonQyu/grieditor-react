import { TableditorProps } from '@components/tableditor';
import { MouseEventHandler, MutableRefObject, useCallback, useState } from 'react';
import {
  CellData,
  CellChangeEventHandler,
  CellHoverEventHandler,
  CellFocusEventHandler,
  CellFocusEvent,
  CellHoverEvent,
  ResizerHoverEventHandler,
  ResizerHoverEvent,
  ResizeEventHandler,
  ResizeEvent,
  CELL_MIN_WIDTH,
  CellChangeEvent,
  GetEventHandledCells,
} from '@components/tableditor/constants';
import useClickOutside from '@hooks/useClickOutside';

export interface IUseTableditorParams extends TableditorProps {}

export interface IUseTableditor {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  cells: CellData[][];
  cellHoverEvent: CellHoverEvent | undefined;
  cellFocusEvent: CellFocusEvent | undefined;
  resizeEvent: ResizeEvent | undefined;
  resizerHoverData: (ResizerHoverEvent & { columnCount: number }) | undefined;
  handleMouseMove: MouseEventHandler<HTMLDivElement>;
  handleMouseUp: MouseEventHandler<HTMLDivElement>;
  onCellHover: CellHoverEventHandler;
  onCellFocus: CellHoverEventHandler;
  onContentChange: CellChangeEventHandler;
  onResizerHover: ResizerHoverEventHandler;
  onResizeStart: ResizeEventHandler;
  onResizeEnd: ResizeEventHandler;
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
  const [cellHoverEvent, setCellHoverEvent] = useState<CellHoverEvent>();
  const [cellFocusEvent, setCellFocusEvent] = useState<CellFocusEvent>();
  const [resizerHoverData, setResizerHoverData] = useState<ResizerHoverEvent & { columnCount: number }>();
  const [resizeEvent, setResizeEvent] = useState<ResizeEvent>();

  const { ref: tableRef } = useClickOutside<HTMLTableElement>({
    onClickOutside: () => onCellFocus(),
  });

  const getCellFocusEventHandledCells: GetEventHandledCells<CellFocusEvent | undefined> = useCallback(({ e, cells }) => {
    if (e) {
      const { rowColumn } = e;
      const rowCount = cells.length;
      if (rowCount <= rowColumn.row || rowColumn.row < 0) {
        // Row limitation
        return cells;
      }

      const columnCount = cells[rowColumn.row].length;
      if (columnCount <= rowColumn.column) {
        // To next row
        return getCellFocusEventHandledCells({
          e: {
            ...e,
            rowColumn: {
              row: rowColumn.row + 1,
              column: 0,
            },
          },
          cells,
        });
      }
      if (rowColumn.column < 0) {
        // To previous row
        return getCellFocusEventHandledCells({
          e: {
            ...e,
            rowColumn: {
              row: rowColumn.row - 1,
              column: (cells[rowColumn.row - 1]?.length ?? 1) - 1,
            },
          },
          cells,
        });
      }
    }

    setCellFocusEvent(e);
    return cells;
  }, []);

  const getCellChangeEventHandledCells: GetEventHandledCells<CellChangeEvent> = useCallback(({ e, cells }) => {
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

  const getResizerHoverEventHandledCells: GetEventHandledCells<ResizerHoverEvent | undefined> = useCallback(({ e, cells }) => {
    if (e) {
      const { row } = e.rowColumn;
      setResizerHoverData({ ...e, columnCount: cells[row].length });
    } else {
      setResizerHoverData(undefined);
    }
    return cells;
  }, []);

  const getResizeEventHandledCells: GetEventHandledCells<ResizeEvent> = useCallback(({ e, cells }) => {
    const { column, mouseX, pivotX } = e;

    return cells.map((rows) =>
      rows.map((cell, columnIndex) => {
        if (columnIndex === column) {
          const newWidth = mouseX! - pivotX!;
          return {
            ...cell,
            width: Math.max(CELL_MIN_WIDTH, newWidth),
          };
        }
        return cell;
      }),
    );
  }, []);

  const onCellHover: CellHoverEventHandler = useCallback((e) => {
    setCellHoverEvent(e);
  }, []);

  const onCellFocus: CellFocusEventHandler = useCallback(
    (e) => {
      setCells((cells) => getCellFocusEventHandledCells({ e, cells }));
    },
    [getCellFocusEventHandledCells],
  );

  const onContentChange: CellChangeEventHandler = useCallback(
    (e) => {
      setCells((cells) => getCellChangeEventHandledCells({ e, cells }));
    },
    [getCellChangeEventHandledCells],
  );

  const onResizerHover: ResizerHoverEventHandler = useCallback(
    (e) => {
      setCells((cells) => getResizerHoverEventHandledCells({ e, cells }));
    },
    [getResizerHoverEventHandledCells],
  );

  const onResizeStart: ResizeEventHandler = useCallback((e) => {
    setResizeEvent(e);
  }, []);

  const onResizeEnd: ResizeEventHandler = useCallback(() => {
    setTimeout(() => {
      setResizeEvent(undefined);
    }, 0);
  }, []);

  const onResize: ResizeEventHandler = useCallback(
    (e) => {
      if (!e) return;

      const { pivotX, mouseX } = e;
      if (pivotX === undefined || mouseX === undefined) return;

      setCells((cells) => getResizeEventHandledCells({ e, cells }));
    },
    [getResizeEventHandledCells],
  );

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!resizeEvent) return;
      e.preventDefault();
      onResize({ column: resizeEvent?.column, mouseX: e.clientX, pivotX: resizeEvent.pivotX });
    },
    [resizeEvent],
  );

  const handleMouseUp: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    onResizeEnd();
  }, [onResizeEnd]);

  return {
    tableRef,
    cells,
    cellHoverEvent,
    cellFocusEvent,
    resizeEvent,
    resizerHoverData,
    handleMouseMove,
    handleMouseUp,
    onCellHover,
    onCellFocus,
    onContentChange,
    onResizerHover,
    onResizeStart,
    onResizeEnd,
  };
}
