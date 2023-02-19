import { TableditorProps } from '@components/tableditor';
import { MouseEventHandler, MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import {
  CellFocusEvent,
  CellHoverEvent,
  ResizerHoverEvent,
  CellResizeEvent,
  CellContentChangeEvent,
  TableditorEventHandler,
  RenderingCellData,
  TableExtender,
  defaultTableExtender,
  defaultCell,
  TableditorEvent,
  CellColorChangeEvent,
  ColorChangeEvent,
  OptionalRowColumn,
} from '@components/tableditor/defines';
import useClickOutside from '@hooks/useClickOutside';
import { TableditorUtil } from '@components/tableditor/utils/tableditorUtil';
import { TableditorEventUtil } from '@components/tableditor/utils/tableditorEventUtil';
import { MenuRef } from '@components/menu/defines';

export interface UseTableditorParams extends TableditorProps {}

export interface UseTableditor {
  tableRef: MutableRefObject<HTMLTableElement | null>;
  rowMenuRef: RefObject<MenuRef>;
  columnMenuRef: RefObject<MenuRef>;
  lastClickedCellMoreOptionButtonRef: MutableRefObject<HTMLButtonElement | null>;
  cells: RenderingCellData[][];
  cellHoverEvent: CellHoverEvent | undefined;
  resizeEvent: CellResizeEvent | undefined;
  rowAddExtender: TableExtender;
  columnAddExtender: TableExtender;
  handleMouseMove: MouseEventHandler<HTMLDivElement>;
  handleMouseUp: MouseEventHandler<HTMLDivElement>;
  handleTableMouseLeave: MouseEventHandler<HTMLTableElement>;
  handleRowAddClick: MouseEventHandler<HTMLButtonElement>;
  handleColumnAddClick: MouseEventHandler<HTMLButtonElement>;
  onCellHover: TableditorEventHandler<CellHoverEvent>;
  onCellFocus: TableditorEventHandler<CellFocusEvent>;
  onContentChange: TableditorEventHandler<CellContentChangeEvent>;
  onResizerHover: TableditorEventHandler<ResizerHoverEvent>;
  onResizeStart: TableditorEventHandler<CellResizeEvent>;
  onResizeEnd: TableditorEventHandler<CellResizeEvent>;
  onCellKeyDown: TableditorEventHandler<undefined>;
  onClickCellMenuChangeBackgroundColor: TableditorEventHandler<CellColorChangeEvent>;
  onClickCellMenuChangeFontColor: TableditorEventHandler<CellColorChangeEvent>;
  onClickCellMenuClearContent: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuAddRowAbove: TableditorEventHandler<number>;
  onClickCellMenuAddRowBelow: TableditorEventHandler<number>;
  onClickCellMenuAddColumnLeft: TableditorEventHandler<number>;
  onClickCellMenuAddColumnRight: TableditorEventHandler<number>;
  onClickCellMenuSelectRow: TableditorEventHandler<TableditorEvent>;
  onClickCellMenuSelectColumn: TableditorEventHandler<TableditorEvent>;
  onClickSelectedCellsChangeBackgroundColor: TableditorEventHandler<ColorChangeEvent>;
  onClickSelectedCellsChangeFontColor: TableditorEventHandler<ColorChangeEvent>;
  onClickSelectedCellsClearContent: TableditorEventHandler;
}

export function useTableditor(params: UseTableditorParams): UseTableditor {
  const {
    cells: initialCells = [
      [{ ...defaultCell }, { ...defaultCell }],
      [{ ...defaultCell }, { ...defaultCell }],
    ],
  } = params;

  const [cells, setCells] = useState<RenderingCellData[][]>(TableditorUtil.cellsToInitialRenderingCells(initialCells));
  const [selectedRowColumn, setSelectedRowColumn] = useState<OptionalRowColumn>();

  const [cellHoverEvent, setCellHoverEvent] = useState<CellHoverEvent>();
  const [resizeEvent, setResizeEvent] = useState<CellResizeEvent>();

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [rowAddExtender, setRowAddExtender] = useState<TableExtender>({ ...defaultTableExtender });
  const [columnAddExtender, setColumnAddExtender] = useState<TableExtender>({ ...defaultTableExtender });

  const tableRef = useRef<HTMLTableElement | null>(null);
  const rowMenuRef = useRef<MenuRef>(null);
  const columnMenuRef = useRef<MenuRef>(null);
  const lastClickedCellMoreOptionButtonRef = useRef<HTMLButtonElement | null>(null);

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
    if (!e) return;
    setSelectedRowColumn(undefined);
  }, []);

  const onContentChange: TableditorEventHandler<CellContentChangeEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellChangeEventHandledCells({ e, cells }));
  }, []);

  const onResizerHover: TableditorEventHandler<ResizerHoverEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getResizerHoverEventHandledCells({ e, cells }));
  }, []);

  const onResizeStart: TableditorEventHandler<CellResizeEvent> = useCallback((e) => {
    setResizeEvent(e);
  }, []);

  const onResizeEnd: TableditorEventHandler<CellResizeEvent> = useCallback(() => {
    setTimeout(() => {
      setResizeEvent(undefined);
    }, 0);
  }, []);

  const onResize: TableditorEventHandler<CellResizeEvent> = useCallback((e) => {
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

  const onClickCellMenuChangeBackgroundColor: TableditorEventHandler<CellColorChangeEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuChangeBackgroundColorEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuChangeFontColor: TableditorEventHandler<CellColorChangeEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuChangeFontColorEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuClearContent: TableditorEventHandler<TableditorEvent> = useCallback(
    (e) => {
      setCells((cells) => TableditorEventUtil.getCellMenuClearContentEventHandledCells({ e, cells }));
    },
    [onContentChange],
  );

  const onClickCellMenuAddRowAbove: TableditorEventHandler<number> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddRowAboveEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuAddRowBelow: TableditorEventHandler<number> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddRowBelowEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuAddColumnLeft: TableditorEventHandler<number> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddColumnLeftEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuAddColumnRight: TableditorEventHandler<number> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getCellMenuAddColumnRightEventHandledCells({ e, cells }));
  }, []);

  const onClickCellMenuSelectRow: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    if (!e) return;
    setSelectedRowColumn({
      row: e.rowColumn.row,
      column: undefined,
    });
  }, []);

  const onClickCellMenuSelectColumn: TableditorEventHandler<TableditorEvent> = useCallback((e) => {
    if (!e) return;
    setSelectedRowColumn({
      row: undefined,
      column: e.rowColumn.column,
    });
  }, []);

  const onClickSelectedCellsChangeBackgroundColor: TableditorEventHandler<ColorChangeEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getSelectedCellsChangeBackgroundColorEventHandledCells({ e, cells }));
  }, []);

  const onClickSelectedCellsChangeFontColor: TableditorEventHandler<ColorChangeEvent> = useCallback((e) => {
    setCells((cells) => TableditorEventUtil.getSelectedCellsChangeFontColorEventHandledCells({ e, cells }));
  }, []);

  const onClickSelectedCellsClearContent: TableditorEventHandler = useCallback(() => {
    setCells((cells) => TableditorEventUtil.getSelectedCellsClearContentEventHandledCells({ cells }));
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

  /**
   * On selected row changed
   */
  useEffect(() => {
    setCells((cells) => TableditorEventUtil.getCellMenuSelectRowEventHandledCells({ e: selectedRowColumn?.row, cells }));
  }, [selectedRowColumn?.row]);

  /**
   * On selected column changed
   */
  useEffect(() => {
    setCells((cells) => TableditorEventUtil.getCellMenuSelectColumnEventHandledCells({ e: selectedRowColumn?.column, cells }));
  }, [selectedRowColumn?.column]);

  return {
    tableRef,
    rowMenuRef,
    columnMenuRef,
    lastClickedCellMoreOptionButtonRef,
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
    onClickCellMenuChangeBackgroundColor,
    onClickCellMenuChangeFontColor,
    onClickCellMenuClearContent,
    onClickCellMenuAddRowAbove,
    onClickCellMenuAddRowBelow,
    onClickCellMenuAddColumnLeft,
    onClickCellMenuAddColumnRight,
    onClickCellMenuSelectRow,
    onClickCellMenuSelectColumn,
    onClickSelectedCellsChangeBackgroundColor,
    onClickSelectedCellsChangeFontColor,
    onClickSelectedCellsClearContent,
  };
}
