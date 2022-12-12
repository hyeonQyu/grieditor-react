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
  const { tableRef, cells, rowColumnHovered, rowColumnFocused, onHoverCell, onFocusCell, onChangeContent } = tableditor;

  return (
    <div
      css={css`
        overflow-x: auto;
      `}
    >
      <table ref={tableRef}>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => {
                const focused = rowColumnFocused?.row === rowIndex && rowColumnFocused?.column === columnIndex;

                return (
                  <td
                    key={columnIndex}
                    css={css`
                      border: 1px solid #dcdcdc;
                      position: relative;
                      min-height: 32px;
                    `}
                  >
                    <Cell
                      cell={cell}
                      row={rowIndex}
                      column={columnIndex}
                      focused={focused}
                      onHoverCell={onHoverCell}
                      onFocusCell={onFocusCell}
                      onChangeContent={onChangeContent}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
