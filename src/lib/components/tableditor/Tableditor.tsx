/** @jsxImportSource @emotion/react */
import { CellData } from '@components/tableditor/defines';
import { useTableditor } from '@components/tableditor/hooks/useTableditor';
import { Cell } from '@components/tableditor/components/cell';
import { TableditorStyle } from '@components/tableditor/styles';
import { TableColumnAddExtender, TableRowAddExtender } from '@components/tableditor/components/tableExtender';

export interface TableditorProps {
  cells?: CellData[][];
}

export function Tableditor(props: TableditorProps) {
  const tableditor = useTableditor(props);
  const { tableRef, cells, cellHoverEvent, resizeEvent, rowAddExtender, columnAddExtender, handleMouseMove, handleMouseUp, ...rest } = tableditor;

  return (
    <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} css={TableditorStyle.container(resizeEvent)}>
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

      <div>
        <TableRowAddExtender rowAddExtender={rowAddExtender} columnAddExtender={columnAddExtender} />
        <TableColumnAddExtender rowAddExtender={rowAddExtender} columnAddExtender={columnAddExtender} />
      </div>
    </div>
  );
}
