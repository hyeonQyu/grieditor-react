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
  const { tableRef, cells, cellHoverEvent, resizeEvent, handleMouseMove, handleMouseUp, ...rest } = tableditor;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      css={css`
        overflow-x: auto;
        overflow-y: hidden;
        padding: 8px 0 8px;
        cursor: ${resizeEvent ? 'col-resize' : 'default'};

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
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => {
                return <Cell key={columnIndex} cell={cell} row={rowIndex} column={columnIndex} focusEvent={undefined} {...rest} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
