/** @jsxImportSource @emotion/react */
import {
  CellData,
  CellChangeEventHandler,
  CellHoverEventHandler,
  CellFocusEventHandler,
  CellFocusEvent,
  ResizerHoverEventHandler,
  RESIZER_WIDTH,
  ResizeEventHandler,
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
  onHoverCell: CellHoverEventHandler;
  onFocusCell: CellFocusEventHandler;
  onChangeContent: CellChangeEventHandler;
  onHoverResizer: ResizerHoverEventHandler;
  onResizeStart: ResizeEventHandler;
  onResizeEnd: ResizeEventHandler;
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
    handleHover,
    handleFocus,
    handleKeyDown,
    handleEnterResizer,
    handleLeaveResizer,
    handleMouseDownResizer,
    handleMouseUpResizer,
    handlePreventDragResizer,
    handleDragEndResizer,
  } = useCell(props);
  console.log(props.row, props.column);

  return (
    <td
      css={css`
        border: 1px solid ${Color.GRAY_1};
        position: relative;
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
          onMouseEnter={handleHover}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          css={css`
            padding: 8px;
            outline: none;
            line-height: 1.2;
            min-height: 100%;
            height: 100%;
            cursor: ${focused ? 'text' : 'default'};

            :hover + div {
              border: 1px solid ${Color.CYAN_0};
            }
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
          style={{
            width,
          }}
        />

        {/*resizer*/}
        <div
          ref={resizerRef}
          onMouseEnter={handleEnterResizer}
          onMouseLeave={handleLeaveResizer}
          onMouseDown={handleMouseDownResizer}
          onMouseUp={handleMouseUpResizer}
          onDragStart={handlePreventDragResizer}
          onDragCapture={handlePreventDragResizer}
          onDragEnd={handleDragEndResizer}
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
