/** @jsxImportSource @emotion/react */
import {
  CellData,
  CellFocusEvent,
  RESIZER_WIDTH,
  TableditorEventHandler,
  CellHoverEvent,
  CellChangeEvent,
  ResizerHoverEvent,
  ResizeEvent,
} from '@components/tableditor/constants';
import { css } from '@emotion/react';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';
import _ from 'lodash';
import { Color } from '@constants/index';

export interface CellProps {
  cell: CellData;
  row: number;
  column: number;
  focusEvent: CellFocusEvent | undefined;
  resizerHovered: boolean;
  isResizing: boolean;
  onCellHover: TableditorEventHandler<CellHoverEvent>;
  onCellFocus: TableditorEventHandler<CellFocusEvent>;
  onContentChange: TableditorEventHandler<CellChangeEvent>;
  onResizerHover: TableditorEventHandler<ResizerHoverEvent>;
  onResizeStart: TableditorEventHandler<ResizeEvent>;
  onResizeEnd: TableditorEventHandler<ResizeEvent>;
}

function Cell(props: CellProps) {
  const {
    cell: { width, content, backgroundColor, font },
    resizerHovered,
  } = props;
  const {
    contentEditableRef,
    resizerRef,
    focused,
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
  console.log(props.row, props.column);

  return (
    <td
      onMouseEnter={handleTableDataHover}
      onClick={handleTableDataClick}
      css={css`
        border: 1px solid ${Color.GRAY_1};
        position: relative;
        cursor: ${focused ? 'text' : 'default'};

        :hover .highlighting {
          border: 1px solid ${Color.CYAN_0};
        }
      `}
      style={{ width }}
    >
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
          css={css`
            padding: 8px;
            outline: none;
            line-height: 1.2;
            min-height: 100%;
            height: 100%;
          `}
          style={{
            backgroundColor,
            color: font.color,
          }}
        >
          {content}
        </div>

        {/*highlighting box*/}
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            border: ${focused ? `2px solid ${Color.CYAN_3} !important` : 'none'};
            pointer-events: none;
            height: 100%;
          `}
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
          css={css`
            position: absolute;
            display: flex;
            justify-content: center;
            width: ${RESIZER_WIDTH}px;
            height: 100%;
            top: 0;
            right: -4px;
            z-index: 10;
            cursor: col-resize;
          `}
        >
          <div
            css={css`
              width: 3px;
              height: calc(100% + 2px);
              background-color: ${resizerHovered ? Color.CYAN_3 : 'transparent'};
              transition: background-color 0.2s;
            `}
          />
        </div>
      </div>
    </td>
  );
}

export const MemoCell = React.memo(Cell, _.isEqual);
