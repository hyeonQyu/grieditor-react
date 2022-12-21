/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CellData } from '@components/tableditor/constants';
import { useTableditor } from '@components/tableditor/hooks/useTableditor';
import { Cell } from '@components/tableditor/components/cell';
import { Color } from '@constants/index';

export interface TableditorProps {
  cells?: CellData[][];
}

export function Tableditor(props: TableditorProps) {
  const tableditor = useTableditor(props);
  const {
    tableRef,
    contentEditableRefs,
    cells,
    cellHoverEvent,
    cellFocusEvent,
    resizeEvent,
    resizerHoverData,
    handleMouseMove,
    handleMouseUp,
    ...rest
  } = tableditor;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      css={css`
        overflow-x: auto;
        overflow-y: hidden;
        padding: 8px 0 8px;

        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: ${Color.GRAY_0};
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${Color.GRAY_2};

          &:hover {
            background-color: ${Color.GRAY_3};
          }
        }
      `}
    >
      <table ref={tableRef}>
        <tbody>
          {cells.map((row, rowIndex) => {
            const columnCount = row.length;
            return (
              <tr key={rowIndex}>
                {row.map((cell, columnIndex) => {
                  const focused = cellFocusEvent?.rowColumn.row === rowIndex && cellFocusEvent?.rowColumn.column === columnIndex;
                  const resizerHovered = resizerHoverData?.rowColumn.column === columnIndex && resizerHoverData?.columnCount === columnCount;
                  const isResizing = resizeEvent?.rowColumn.column === columnIndex;
                  const contentEditableRef = contentEditableRefs[rowIndex][columnIndex];

                  return (
                    <Cell
                      key={columnIndex}
                      cell={cell}
                      contentEditableRef={contentEditableRef}
                      row={rowIndex}
                      column={columnIndex}
                      focusEvent={focused ? cellFocusEvent : undefined}
                      resizerHovered={resizerHovered}
                      isResizing={isResizing}
                      {...rest}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
