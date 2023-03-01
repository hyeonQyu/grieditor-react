import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { TableditorColor } from '@components/tableditor/defines';
import { CustomEventHandler } from '@defines/types';
import { TableditorMenuUtil } from '@components/tableditor/utils/tableditorMenuUtil';
import { ColumnMenuProps } from '@components/tableditor/components/menu/column/ColumnMenu';
import { MenuItemTemplate } from '@components/tableditor/components/menu/itemTemplate';
import { ArrowIcon } from '@icons/ArrowIcon';
import { TrashIcon } from '@icons/TrashIcon';

export interface UseColumnMenuParams extends ColumnMenuProps {
  ref: RefObject<MenuRef>;
}

export interface UseColumnMenu {
  menuSections: MenuSectionProps[];
}

export default function useColumnMenu(params: UseColumnMenuParams): UseColumnMenu {
  const {
    ref,
    onClickChangeBackgroundColor,
    onClickChangeFontColor,
    onClickClearContent,
    onClickAddColumnLeft,
    onClickAddColumnRight,
    onClickDeleteColumn,
  } = params;

  const handleClickColumnMenuChangeBackgroundColor: CustomEventHandler<TableditorColor> = (color) => {
    onClickChangeBackgroundColor({ color: color! });
  };

  const handleClickColumnMenuChangeFontColor: CustomEventHandler<TableditorColor> = (color) => {
    onClickChangeFontColor({ color: color! });
  };

  const menuSections: MenuSectionProps[] = [
    TableditorMenuUtil.getCommonTableditorMenuSection({
      ref,
      editLabel: 'Edit column',
      onClickChangeBackgroundColor: handleClickColumnMenuChangeBackgroundColor,
      onClickChangeFontColor: handleClickColumnMenuChangeFontColor,
      onClickClearContent,
    }),

    {
      label: 'Edit table',
      items: [
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'left'} />} label={'Add column to left'} />,
          onEvent(e) {
            onClickAddColumnLeft();
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'right'} />} label={'Add column to right'} />,
          onEvent(e) {
            onClickAddColumnRight();
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<TrashIcon />} label={'Delete column'} />,
          onEvent(e) {
            onClickDeleteColumn();
            ref.current?.close(e);
          },
        },
      ],
    },
  ];

  return {
    menuSections,
  };
}
