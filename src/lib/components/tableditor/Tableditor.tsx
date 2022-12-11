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
  const { cells, onHoverCell, onChangeContent } = tableditor;

  return (
    <div
      css={css`
        overflow-x: auto;
      `}
    >
      <table>
        <tbody>
          {cells.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Cell key={columnIndex} cell={cell} row={rowIndex} column={columnIndex} onHoverCell={onHoverCell} onChangeContent={onChangeContent} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
