import { MenuSectionProps } from '@lib/components/menu/components/menuSection';
import { MenuItemTemplate } from '@lib/components/tableditor/components/menu/itemTemplate';
import { ArrowIcon, HorizontalIcon, VerticalIcon } from '@lib/icons';
import { RowColumn, TableditorColor } from '@lib/components/tableditor/defines';
import { RefObject } from 'react';
import { MenuRef } from '@lib/components/menu/defines';
import { useCellContext } from '@lib/components/tableditor/components/cell/contexts/CellContext';
import { CustomEventHandler } from '@lib/defines/types';
import { TableditorMenuUtil } from '@lib/components/tableditor/utils/tableditorMenuUtil';

export interface UseCellMenuParams {
  ref: RefObject<MenuRef>;
}

export interface UseCellMenu {
  menuSections: MenuSectionProps[];
}

export function useCellMenu(params: UseCellMenuParams): UseCellMenu {
  const { ref } = params;
  const {
    row,
    column,
    rowMenuRef,
    columnMenuRef,
    onClickCellMenuChangeBackgroundColor,
    onClickCellMenuChangeFontColor,
    onClickCellMenuClearContent,
    onClickCellMenuAddRowAbove,
    onClickCellMenuAddRowBelow,
    onClickCellMenuAddColumnLeft,
    onClickCellMenuAddColumnRight,
    onClickCellMenuSelectRow,
    onClickCellMenuSelectColumn,
  } = useCellContext();
  const rowColumn: RowColumn = { row, column };

  const handleClickCellMenuChangeBackgroundColor: CustomEventHandler<TableditorColor> = (color) => {
    onClickCellMenuChangeBackgroundColor({ rowColumn, color: color! });
  };

  const handleClickCellMenuChangeFontColor: CustomEventHandler<TableditorColor> = (color) => {
    onClickCellMenuChangeFontColor({ rowColumn, color: color! });
  };

  const handleClickCellMenuClearContent = () => {
    onClickCellMenuClearContent({ rowColumn });
  };

  const menuSections: MenuSectionProps[] = [
    TableditorMenuUtil.getCommonTableditorMenuSection({
      ref,
      editLabel: 'Edit cell',
      onClickChangeBackgroundColor: handleClickCellMenuChangeBackgroundColor,
      onClickChangeFontColor: handleClickCellMenuChangeFontColor,
      onClickClearContent: handleClickCellMenuClearContent,
    }),

    {
      label: 'Edit table',
      items: [
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'up'} />} label={'Add row above'} />,
          onEvent(e) {
            onClickCellMenuAddRowAbove(row);
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'down'} />} label={'Add row below'} />,
          onEvent(e) {
            onClickCellMenuAddRowBelow(row);
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'left'} />} label={'Add column to left'} />,
          onEvent(e) {
            onClickCellMenuAddColumnLeft(column);
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'right'} />} label={'Add column to right'} />,
          onEvent(e) {
            onClickCellMenuAddColumnRight(column);
            ref.current?.close(e);
          },
        },
      ],
    },

    {
      label: 'Select',
      items: [
        {
          node: <MenuItemTemplate icon={<HorizontalIcon />} label={'Select row'} />,
          onEvent(e) {
            onClickCellMenuSelectRow({ rowColumn });
            ref.current?.close(e);
            rowMenuRef.current?.open(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<VerticalIcon />} label={'Select column'} />,
          onEvent(e) {
            onClickCellMenuSelectColumn({ rowColumn });
            ref.current?.close(e);
            columnMenuRef.current?.open(e);
          },
        },
      ],
    },
  ];

  return {
    menuSections,
  };
}
