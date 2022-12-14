/** @jsxImportSource @emotion/react */
import {
  CellData,
  CellChangeEventHandler,
  CellHoverEventHandler,
  CellFocusEventHandler,
  CellFocusEvent,
  ResizerHoverEventHandler,
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
}

function Cell(props: CellProps) {
  const {
    cell: { width, content, backgroundColor, font },
    resizerHovered,
  } = props;
  const { ref, focused, height, handleHover, handleFocus, handleKeyDown, handleEnterResizer, handleLeaveResizer } = useCell(props);
  console.log(props);

  return (
    <div
      style={{
        width,
      }}
    >
      {/*content*/}
      <div
        contentEditable
        suppressContentEditableWarning
        ref={ref}
        onMouseEnter={handleHover}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        css={css`
          padding: 8px;
          outline: none;
          line-height: 1.2;
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
          border: ${focused ? `1px solid ${Color.HIGHLIGHT}` : 'transparent'};
          pointer-events: none;
          transition: 0.2s;
        `}
        style={{
          width,
          height,
        }}
      />

      {/*resizer*/}
      <div
        onMouseEnter={handleEnterResizer}
        onMouseLeave={handleLeaveResizer}
        css={css`
          position: absolute;
          display: flex;
          justify-content: center;
          width: 8px;
          height: ${height}px;
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
            background-color: ${resizerHovered ? Color.HIGHLIGHT : 'transparent'};
            transition: 0.2s;
          `}
        />
      </div>
    </div>
  );
}

export const MemoCell = React.memo(Cell, _.isEqual);
