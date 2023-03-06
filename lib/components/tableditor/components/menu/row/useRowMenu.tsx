import { RefObject } from 'react';
import { MenuRef } from '@lib/components/menu/defines';
import { MenuSectionProps } from '@lib/components/menu/components/menuSection';
import { TableditorColor } from '@lib/components/tableditor/defines';
import { CustomEventHandler } from '@lib/defines/types';
import { TableditorMenuUtil } from '@lib/components/tableditor/utils/tableditorMenuUtil';
import { RowMenuProps } from '@lib/components/tableditor/components/menu/row/RowMenu';
import { MenuItemTemplate } from '@lib/components/tableditor/components/menu/itemTemplate';
import { ArrowIcon } from '@lib/icons/ArrowIcon';
import { TrashIcon } from '@lib/icons/TrashIcon';

export interface UseRowMenuParams extends RowMenuProps {
  ref: RefObject<MenuRef>;
}

export interface UseRowMenu {
  menuSections: MenuSectionProps[];
}

export default function useRowMenu(params: UseRowMenuParams): UseRowMenu {
  const { ref, onClickChangeBackgroundColor, onClickChangeFontColor, onClickClearContent, onClickAddRowAbove, onClickAddRowBelow, onClickDeleteRow } =
    params;

  const handleClickRowMenuChangeBackgroundColor: CustomEventHandler<TableditorColor> = (color) => {
    onClickChangeBackgroundColor({ color: color! });
  };

  const handleClickRowMenuChangeFontColor: CustomEventHandler<TableditorColor> = (color) => {
    onClickChangeFontColor({ color: color! });
  };

  const menuSections: MenuSectionProps[] = [
    TableditorMenuUtil.getCommonTableditorMenuSection({
      ref,
      editLabel: 'Edit row',
      onClickChangeBackgroundColor: handleClickRowMenuChangeBackgroundColor,
      onClickChangeFontColor: handleClickRowMenuChangeFontColor,
      onClickClearContent,
    }),

    {
      label: 'Edit table',
      items: [
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'up'} />} label={'Add row above'} />,
          onEvent(e) {
            onClickAddRowAbove();
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'down'} />} label={'Add row below'} />,
          onEvent(e) {
            onClickAddRowBelow();
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<TrashIcon />} label={'Delete row'} />,
          onEvent(e) {
            onClickDeleteRow();
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
