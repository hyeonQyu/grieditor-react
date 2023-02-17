/** @jsxImportSource @emotion/react */
import React from 'react';
import { CellData } from '@components/tableditor/defines';
import { useTableditor } from '@components/tableditor/hooks/useTableditor';
import { TableditorStyle } from '@components/tableditor/styles';
import { TableColumnAddExtender, TableRowAddExtender } from '@components/tableditor/components/tableExtender';
import { Global } from '@emotion/react';
import { RESET_STYLE } from '@styles/reset';
import { Portal } from '@components/portal';
import { Table } from '@components/tableditor/components/table';
import { RowMenu } from '@components/tableditor/components/menu/row';
import { ColumnMenu } from '@components/tableditor/components/menu/column';

export interface TableditorProps {
  cells?: CellData[][];
}

export function Tableditor(props: TableditorProps) {
  const tableditor = useTableditor(props);
  const {
    tableRef,
    rowMenuRef,
    columnMenuRef,
    lastClickedCellMoreOptionButtonRef,
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
    onClickSelectedCellsChangeBackgroundColor,
    onClickSelectedCellsChangeFontColor,
    onClickSelectedCellsClearContent,
    ...rest
  } = tableditor;

  return (
    <>
      <Portal.Provider>
        <Global styles={[RESET_STYLE]} />
        <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} css={TableditorStyle.container(resizeEvent)}>
          <Table
            tableRef={tableRef}
            rowMenuRef={rowMenuRef}
            columnMenuRef={columnMenuRef}
            lastClickedCellMoreOptionButtonRef={lastClickedCellMoreOptionButtonRef}
            cells={cells}
            onMouseLeave={handleTableMouseLeave}
            {...rest}
          />
          <TableRowAddExtender rowAddExtender={rowAddExtender} columnAddExtender={columnAddExtender} onClick={handleRowAddClick} />
          <TableColumnAddExtender rowAddExtender={rowAddExtender} columnAddExtender={columnAddExtender} onClick={handleColumnAddClick} />
        </div>

        <RowMenu
          ref={rowMenuRef}
          targetRef={lastClickedCellMoreOptionButtonRef}
          onClickChangeBackgroundColor={onClickSelectedCellsChangeBackgroundColor}
          onClickChangeFontColor={onClickSelectedCellsChangeFontColor}
          onClickClearContent={onClickSelectedCellsClearContent}
        />
        <ColumnMenu
          ref={columnMenuRef}
          targetRef={lastClickedCellMoreOptionButtonRef}
          onClickChangeBackgroundColor={onClickSelectedCellsChangeBackgroundColor}
          onClickClearContent={onClickSelectedCellsClearContent}
          onClickChangeFontColor={onClickSelectedCellsChangeFontColor}
        />
      </Portal.Provider>
    </>
  );
}
