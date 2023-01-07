/** @jsxImportSource @emotion/react */
import React from 'react';
import { CellData } from '@components/tableditor/defines';
import { useTableditor } from '@components/tableditor/hooks/useTableditor';
import { Cell } from '@components/tableditor/components/cell';
import { TableditorStyle } from '@components/tableditor/styles';
import { TableColumnAddExtender, TableRowAddExtender } from '@components/tableditor/components/tableExtender';
import { Global } from '@emotion/react';
import { RESET_STYLE } from '@styles/reset';
import { Portal } from '@components/portal';

export interface TableditorProps {
  cells?: CellData[][];
}

export function Tableditor(props: TableditorProps) {
  const tableditor = useTableditor(props);
  const {
    tableRef,
    cells,
    cellHoverEvent,
    resizeEvent,
    rowAddExtender,
    columnAddExtender,
    handleMouseMove,
    handleMouseUp,
    handleTableMouseLeave,
    handleRowAddClick,
    handleColumnAddClick,
    ...rest
  } = tableditor;

  return (
    <>
      <Portal.Provider>
        <Global styles={[RESET_STYLE]} />
        <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} css={TableditorStyle.container(resizeEvent)}>
          <table ref={tableRef} onMouseLeave={handleTableMouseLeave}>
            <tbody>
              {cells.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, columnIndex) => {
                    return <Cell key={columnIndex} cell={cell} row={rowIndex} column={columnIndex} {...rest} />;
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <TableRowAddExtender rowAddExtender={rowAddExtender} columnAddExtender={columnAddExtender} onClick={handleRowAddClick} />
          <TableColumnAddExtender rowAddExtender={rowAddExtender} columnAddExtender={columnAddExtender} onClick={handleColumnAddClick} />
        </div>
      </Portal.Provider>
    </>
  );
}
