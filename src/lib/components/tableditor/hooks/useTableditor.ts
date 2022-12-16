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

  const onCellHover: CellHoverEventHandler = useCallback((e) => {
    setCellHoverEvent(e);
  }, []);

  const onCellFocus: CellFocusEventHandler = useCallback((e) => {
    setCells((cells) => {
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
          onCellFocus({
            ...e,
            rowColumn: {
              row: rowColumn.row + 1,
              column: 0,
            },
          });
          return cells;
        }
        if (rowColumn.column < 0) {
          // To previous row
          onCellFocus({
            ...e,
            rowColumn: {
              row: rowColumn.row - 1,
              column: (cells[rowColumn.row - 1]?.length ?? 1) - 1,
            },
          });
          return cells;
        }
      }

      setCellFocusEvent(e);
      return cells;
    });
  }, []);

  const onContentChange: CellChangeEventHandler = useCallback(({ rowColumn: { row, column }, content }) => {
    setCells((prev) => {
      // Content not changed
      if (prev[row][column].content === content) {
        return prev;
      }

      return prev.map((rows, rowIndex) => {
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
    });
  }, []);

  const onResizerHover: ResizerHoverEventHandler = useCallback((e) => {
    setCells((cells) => {
      if (e) {
        const { row } = e.rowColumn;
        setResizerHoverData({ ...e, columnCount: cells[row].length });
      } else {
        setResizerHoverData(undefined);
      }
      return cells;
    });
  }, []);

  const onResizeStart: ResizeEventHandler = useCallback((e) => {
    setResizeEvent(e);
  }, []);

  const onResizeEnd: ResizeEventHandler = useCallback(() => {
    setTimeout(() => {
      setResizeEvent(undefined);
    }, 0);
  }, []);

  const onResize: ResizeEventHandler = useCallback((e) => {
    if (!e) return;

    const { column, pivotX, mouseX } = e;
    if (pivotX === undefined || mouseX === undefined) return;

    setCells((prev) => {
      return prev.map((rows) =>
        rows.map((cell, columnIndex) => {
          if (columnIndex === column) {
            const newWidth = mouseX - pivotX;
            return {
              ...cell,
              width: Math.max(CELL_MIN_WIDTH, newWidth),
            };
          }
          return cell;
        }),
      );
    });
  }, []);

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
