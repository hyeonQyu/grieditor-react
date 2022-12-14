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
  const { tableRef, cells, cellHoverEvent, cellFocusEvent, resizerHoverData, onHoverCell, onFocusCell, onChangeContent, onHoverResizer } = tableditor;

  return (
    <div
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
                    <td
                      key={columnIndex}
                      css={css`
                        border: 1px solid ${Color.BORDER};
                        position: relative;
                        min-height: 32px;
                      `}
                    >
                      <Cell
                        cell={cell}
                        row={rowIndex}
                        column={columnIndex}
                        focusEvent={focused ? cellFocusEvent : undefined}
                        resizerHovered={resizerHovered}
                        onHoverCell={onHoverCell}
                        onFocusCell={onFocusCell}
                        onChangeContent={onChangeContent}
                        onHoverResizer={onHoverResizer}
                      />
                    </td>
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
