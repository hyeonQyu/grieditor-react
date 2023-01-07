/** @jsxImportSource @emotion/react */
import {
  CellFocusEvent,
  TableditorEventHandler,
  CellHoverEvent,
  CellChangeEvent,
  ResizerHoverEvent,
  ResizeEvent,
  RenderingCellData,
} from '@components/tableditor/defines';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';
import _ from 'lodash';
import { TableditorStyle } from '@components/tableditor/styles';

export interface CellProps {
  cell: RenderingCellData;
  row: number;
  column: number;
  focusEvent: CellFocusEvent | undefined;
  onCellHover: TableditorEventHandler<CellHoverEvent>;
  onCellFocus: TableditorEventHandler<CellFocusEvent>;
  onContentChange: TableditorEventHandler<CellChangeEvent>;
  onResizerHover: TableditorEventHandler<ResizerHoverEvent>;
  onResizeStart: TableditorEventHandler<ResizeEvent>;
  onResizeEnd: TableditorEventHandler<ResizeEvent>;
  onCellKeyDown: TableditorEventHandler<undefined>;
}

function Cell(props: CellProps) {
  const {
    cell: { width = 0, content, backgroundColor, font, resizerHovered, isResizing, contentEditableRef },
  } = props;
  const {
    resizerRef,
    handleTableDataHover,
    handleTableDataClick,
    handleContentEditableFocus,
    handleContentEditableKeyDown,
    handleResizerMouseEnter,
    handleResizerMouseLeave,
    handleResizerMouseDown,
    handleResizerMouseUp,
    handleResizerPreventDrag,
    handleResizerDragEnd,
  } = useCell(props);
  console.log(props.row, props.column, width);

  return (
    <td onMouseEnter={handleTableDataHover} onClick={handleTableDataClick} css={TableditorStyle.tableData()} style={{ width }}>
      <div
        style={{
          width,
          height: '100%',
        }}
      >
        {/*content*/}
        <div
          contentEditable
          suppressContentEditableWarning
          ref={contentEditableRef}
          onFocus={handleContentEditableFocus}
          onKeyDown={handleContentEditableKeyDown}
          css={TableditorStyle.content(isResizing)}
          style={{
            backgroundColor,
            color: font.color,
          }}
        >
          {content}
        </div>

        {/*highlighting box*/}
        <div
          css={TableditorStyle.highlighting()}
          className={'highlighting'}
          style={{
            width,
          }}
        />

        {/*resizer*/}
        <div
          ref={resizerRef}
          onMouseEnter={handleResizerMouseEnter}
          onMouseLeave={handleResizerMouseLeave}
          onMouseDown={handleResizerMouseDown}
          onMouseUp={handleResizerMouseUp}
          onDragStart={handleResizerPreventDrag}
          onDragCapture={handleResizerPreventDrag}
          onDragEnd={handleResizerDragEnd}
          css={TableditorStyle.resizerController()}
        >
          <div css={TableditorStyle.resizer(resizerHovered)} />
        </div>
      </div>
    </td>
  );
}

export const MemoCell = React.memo(Cell, _.isEqual);
