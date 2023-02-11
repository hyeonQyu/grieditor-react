import React, { createRef } from 'react';
import { UseCell } from '@components/tableditor/components/cell/hooks/useCell';
import { CellProps } from '@components/tableditor/components/cell';
import { defaultCell } from '@components/tableditor/defines';
import { TableditorUtil } from '@components/tableditor/utils/tableditorUtil';

export interface CellContextProps extends CellProps, UseCell {}

export const CellContext = React.createContext<CellContextProps>({
  cell: TableditorUtil.cellToInitialRenderingCell(defaultCell),
  row: 0,
  column: 0,
  onCellHover() {},
  onCellFocus() {},
  onContentChange() {},
  onResizerHover() {},
  onResizeStart() {},
  onResizeEnd() {},
  onCellKeyDown() {},
  onClickCellMenuChangeBackgroundColor() {},
  onClickCellMenuChangeFontColor() {},
  onClickCellMenuClearContent() {},
  onClickCellMenuAddRowAbove() {},
  onClickCellMenuAddRowBelow() {},
  onClickCellMenuAddColumnLeft() {},
  onClickCellMenuAddColumnRight() {},
  onClickCellMenuSelectRow() {},
  onClickCellMenuSelectColumn() {},

  menuRef: createRef(),
  resizerRef: createRef(),
  contentInnerText: '',
  handleTableCellHover() {},
  handleTableCellClick() {},
  handleContentEditableFocus() {},
  handleContentEditableKeyDown() {},
  handleContentEditableInput() {},
  handleMoreOptionsClick() {},
  handleResizerMouseEnter() {},
  handleResizerMouseLeave() {},
  handleResizerMouseDown() {},
  handleResizerMouseUp() {},
  handleResizerPreventDrag() {},
  handleResizerDragEnd() {},
});

export const useCellContext = () => React.useContext(CellContext);
