/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { CellInfo, TableditorHandler } from '@lib/components/tableditor/defines';
import { useTableditor } from '@lib/components/tableditor/hooks/useTableditor';
import { TableditorStyle } from '@lib/components/tableditor/styles';
import { TableColumnAddExtender, TableRowAddExtender } from '@lib/components/tableditor/components/tableExtender';
import { Global } from '@emotion/react';
import { Portal } from '@lib/components/portal';
import { Table } from '@lib/components/tableditor/components/table';
import { RowMenu } from '@lib/components/tableditor/components/menu/row';
import { ColumnMenu } from '@lib/components/tableditor/components/menu/column';
import { RESET_STYLE } from '@lib/components/tableditor/styles/reset';

export interface TableditorProps {
  cells?: CellInfo[][];
}

export const Tableditor = forwardRef<TableditorHandler, TableditorProps>((props, ref) => {
  const tableditor = useTableditor(props, ref);

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
    onClickSelectedRowAddRowAbove,
    onClickSelectedRowAddRowBelow,
    onClickSelectedRowDelete,
    onClickSelectedColumnAddColumnLeft,
    onClickSelectedColumnAddColumnRight,
    onClickSelectedColumnDelete,
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
          onClickAddRowAbove={onClickSelectedRowAddRowAbove}
          onClickAddRowBelow={onClickSelectedRowAddRowBelow}
          onClickDeleteRow={onClickSelectedRowDelete}
        />
        <ColumnMenu
          ref={columnMenuRef}
          targetRef={lastClickedCellMoreOptionButtonRef}
          onClickChangeBackgroundColor={onClickSelectedCellsChangeBackgroundColor}
          onClickClearContent={onClickSelectedCellsClearContent}
          onClickChangeFontColor={onClickSelectedCellsChangeFontColor}
          onClickAddColumnLeft={onClickSelectedColumnAddColumnLeft}
          onClickAddColumnRight={onClickSelectedColumnAddColumnRight}
          onClickDeleteColumn={onClickSelectedColumnDelete}
        />
      </Portal.Provider>
    </>
  );
});
