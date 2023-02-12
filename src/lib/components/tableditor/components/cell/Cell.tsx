/** @jsxImportSource @emotion/react */
import { RenderingCellData } from '@components/tableditor/defines';
import { useCell } from '@components/tableditor/components/cell/hooks/useCell';
import React from 'react';
import _ from 'lodash';
import { TableditorStyle } from '@components/tableditor/styles';
import { ThreeDotsVerticalIcon } from '@icons/ThreeDotsVerticalIcon';
import { Color } from '@defines/constants';
import { CellMenu } from '@components/tableditor/components/menu/cell';
import { UseTableditor } from '@components/tableditor/hooks/useTableditor';
import { CellContext } from '@components/tableditor/components/cell/contexts/CellContext';

export interface CellProps
  extends Pick<
    UseTableditor,
    | 'rowMenuRef'
    | 'columnMenuRef'
    | 'lastClickedCellMoreOptionButtonRef'
    | 'onCellHover'
    | 'onCellFocus'
    | 'onContentChange'
    | 'onResizerHover'
    | 'onResizeStart'
    | 'onResizeEnd'
    | 'onCellKeyDown'
    | 'onClickCellMenuChangeBackgroundColor'
    | 'onClickCellMenuChangeFontColor'
    | 'onClickCellMenuClearContent'
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
  const { cell } = props;

  const useCellValue = useCell(props);
  const {
    menuRef,
    resizerRef,
    contentInnerText,
    handleTableCellHover,
    handleTableCellClick,
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
  } = useCellValue;

  const { width = 0, content, backgroundColor, font, resizerHovered, isResizing, contentEditableRef, selected } = cell;
  console.log(props.row, props.column);

  return (
    <CellContext.Provider value={{ ...props, ...useCellValue }}>
      <td
        onMouseEnter={handleTableCellHover}
        onClick={handleTableCellClick}
        css={TableditorStyle.tableData(backgroundColor, font, isResizing)}
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
            onInput={handleContentEditableInput}
            css={TableditorStyle.content(isResizing, Boolean(contentInnerText || content))}
          >
            {content}
          </div>

          {/*more options button*/}
          <button onClick={handleMoreOptionsClick} css={TableditorStyle.moreOptions()} className={'more-options'}>
            <ThreeDotsVerticalIcon width={14} height={14} color={Color.GRAY_6} />
          </button>
          <CellMenu ref={menuRef} />

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
    </CellContext.Provider>
  );
}

export const MemoCell = React.memo(Cell, _.isEqual);
