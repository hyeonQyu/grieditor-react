/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { CellData } from '@components/grieditor/constants';
import { useGrieditor } from '@components/grieditor/hooks/useGrieditor';
import { Cell } from '@components/grieditor/components/Cell';

export interface GrieditorProps {
  cells?: CellData[][];
}

export function Grieditor(props: GrieditorProps) {
  const {} = props;
  const { cells } = useGrieditor(props);

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
                <td
                  key={columnIndex}
                  css={css`
                    border: 1px solid #dcdcdc;
                  `}
                >
                  <Cell cell={cell} row={rowIndex} column={columnIndex} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
