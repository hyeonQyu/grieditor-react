import { TableditorProps } from '@components/tableditor';
import { MouseEventHandler, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  CellFocusEvent,
  CellHoverEvent,
  ResizerHoverEvent,
  ResizeEvent,
  CellChangeEvent,
  TableditorEventHandler,
  RenderingCellData,
  TableExtender,
  DEFAULT_TABLE_EXTENDER,
  DEFAULT_CELL,
  TableditorEvent,
} from '@components/tableditor/defines';
import useClickOutside from '@hooks/useClickOutside';
import { TableditorUtil } from '@components/tableditor/utils/tableditorUtil';
import { TableditorEventUtil } from '@components/tableditor/utils/tableditorEventUtil';

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
  onClickCellMenuClearContent: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuAddRowAbove: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuAddRowBelow: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuAddColumnLeft: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuAddColumnRight: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuSelectRow: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuSelectColumn: TableditorEventHandler<TableditorEvent>;
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

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [rowAddExtender, setRowAddExtender] = useState<TableExtender>({ ...DEFAULT_TABLE_EXTENDER });
  const [columnAddExtender, setColumnAddExtender] = useState<TableExtender>({ ...DEFAULT_TABLE_EXTENDER });

  const tableRef = useRef<HTMLTableElement | null>(null);

  useClickOutside<HTMLTableElement>({
    ref: tableRef,
    onClickOutside() {
      onCellFocus();
    },
  });

  const onCellHover: TableditorEventHandler<CellHoverEvent> = useCallback((e) => {
    setCellHoverEvent(e);
  }, []);

  const onCellFocus: TableditorEventHandler<CellFocusEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellFocusEventHandledCells({ e, cells }));
  }, []);

  const onContentChange: TableditorEventHandler<CellChangeEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellChangeEventHandledCells({ e, cells }));
  }, []);

  const onResizerHover: TableditorEventHandler<ResizerHoverEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getResizerHoverEventHandledCells({ e, cells }));
  }, []);

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

  const onClickCellMenuClearContent: TableditorEventHandler<TableditorEvent> = useCallback(
    (e) => {
      if (!e) return;
      setCells((cells) => TableditorEventUtil.getCellMenuClearContentEventHandledCells({ e, cells }));
    },
    [onContentChange],
  );

  const onClickCellMenuAddRowAbove: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddRowAboveEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuAddRowBelow: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddRowBelowEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuAddColumnLeft: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddColumnLeftEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuAddColumnRight: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddColumnRightEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuSelectRow: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuSelectRowEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuSelectColumn: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuSelectColumnEventHandledCells({ e, cells }));
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
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => {
      setIsMouseDown(false);
      setResizeEvent(undefined);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  /**
   * Resize cells' width and hide table extender on cell resize events
   */
  useEffect(() => {
    setCells((cells) => TableditorEventUtil.getResizeEventHandledCells({ e: isMouseDown ? resizeEvent : undefined, cells }));

    if (resizeEvent) {
      setRowAddExtender((prev) => ({ ...prev, visible: false }));
      setColumnAddExtender((prev) => ({ ...prev, visible: false }));
    }
  }, [resizeEvent, isMouseDown]);

  /**
   * Set size and visibility of table extender on cell hover events
   */
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
    onClickCellMenuClearContent,
    onClickCellMenuAddRowAbove,
    onClickCellMenuAddRowBelow,
    onClickCellMenuAddColumnLeft,
    onClickCellMenuAddColumnRight,
    onClickCellMenuSelectRow,
    onClickCellMenuSelectColumn,
  };
}
