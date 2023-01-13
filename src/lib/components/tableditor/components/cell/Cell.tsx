/** @jsxImportSource @emotion/react */
import { RenderingCellData } from '@components/tableditor/defines';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';
import _ from 'lodash';
import { TableditorStyle } from '@components/tableditor/styles';
import { ThreeDotsVerticalIcon } from '@icons/ThreeDotsVerticalIcon';
import { Color } from '@defines/constants';
import { CellMenu } from '@components/tableditor/components/menu/cell';
import { IUseTableditor } from '@components/tableditor/hooks/useTableditor';

export interface CellProps
  extends Pick<
    IUseTableditor,
    | 'onCellHover'
    | 'onCellFocus'
    | 'onContentChange'
    | 'onResizerHover'
    | 'onResizeStart'
    | 'onResizeEnd'
    | 'onCellKeyDown'
    | 'onClickCellMenuAddRowAbove'
    | 'onClickCellMenuAddRowBelow'
    | 'onClickCellMenuAddColumnLeft'
    | 'onClickCellMenuAddColumnRight'
    | 'onClickCellMenuSelectRow'
    | 'onClickCellMenuSelectColumn'
  > {
  cell: RenderingCellData;
  row: number;
  column: number;
}

function Cell(props: CellProps) {
  const {
    cell,
    row,
    column,
    onClickCellMenuAddRowAbove,
    onClickCellMenuAddRowBelow,
    onClickCellMenuAddColumnLeft,
    onClickCellMenuAddColumnRight,
    onClickCellMenuSelectRow,
    onClickCellMenuSelectColumn,
  } = props;
  const {
    menuRef,
    resizerRef,
    contentInnerText,
    handleTableDataHover,
    handleTableDataClick,
    handleContentEditableFocus,
    handleContentEditableKeyDown,
    handleContentEditableInput,
    handleMoreOptionsClick,
    handleResizerMouseEnter,
    handleResizerMouseLeave,
    handleResizerMouseDown,
    handleResizerMouseUp,
    handleResizerPreventDrag,
    handleResizerDragEnd,
  } = useCell(props);
  const { width = 0, content, backgroundColor, font, resizerHovered, isResizing, contentEditableRef, selected } = cell;
  console.log(props.row, props.column);

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
          onInput={handleContentEditableInput}
          css={TableditorStyle.content(isResizing, Boolean(contentInnerText))}
          style={{
            backgroundColor,
            color: font.color,
          }}
        >
          {content}
        </div>

        {/*more options button*/}
        <button onClick={handleMoreOptionsClick} css={TableditorStyle.moreOptions()} className={'more-options'}>
          <ThreeDotsVerticalIcon width={14} height={14} color={Color.GRAY_6} />
        </button>
        <CellMenu
          ref={menuRef}
          row={row}
          column={column}
          onClickCellMenuAddRowAbove={onClickCellMenuAddRowAbove}
          onClickCellMenuAddRowBelow={onClickCellMenuAddRowBelow}
          onClickCellMenuAddColumnLeft={onClickCellMenuAddColumnLeft}
          onClickCellMenuAddColumnRight={onClickCellMenuAddColumnRight}
          onClickCellMenuSelectRow={onClickCellMenuSelectRow}
          onClickCellMenuSelectColumn={onClickCellMenuSelectColumn}
        />

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

        {/*selector*/}
        {selected && <div css={TableditorStyle.cellSelector()} style={{ width }} />}
      </div>
    </td>
  );
}

export const MemoCell = React.memo(Cell, _.isEqual);
