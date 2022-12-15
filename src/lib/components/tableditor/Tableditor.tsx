/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CellData } from '@components/tableditor/constants';
import { useTableditor } from '@components/tableditor/hooks/useTableditor';
import { Cell } from '@components/tableditor/components/cell';

export interface TableditorProps {
  cells?: CellData[][];
}

export function Tableditor(props: TableditorProps) {
  const tableditor = useTableditor(props);
  const {
    tableRef,
    cells,
    cellHoverEvent,
    cellFocusEvent,
    resizerHoverData,
    handleMouseMove,
    handleMouseUp,
    onHoverCell,
    onFocusCell,
    onChangeContent,
    onHoverResizer,
    onResizeStart,
    onResizeEnd,
  } = tableditor;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      css={css`
        overflow-x: auto;
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

                  return (
                    <Cell
                      key={columnIndex}
                      cell={cell}
                      row={rowIndex}
                      column={columnIndex}
                      focusEvent={focused ? cellFocusEvent : undefined}
                      resizerHovered={resizerHovered}
                      onHoverCell={onHoverCell}
                      onFocusCell={onFocusCell}
                      onChangeContent={onChangeContent}
                      onHoverResizer={onHoverResizer}
                      onResizeStart={onResizeStart}
                      onResizeEnd={onResizeEnd}
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
