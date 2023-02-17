import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { TableditorColor } from '@components/tableditor/defines';
import { CustomEventHandler } from '@defines/types';
import { TableditorMenuUtil } from '@components/tableditor/utils/tableditorMenuUtil';
import { ColumnMenuProps } from '@components/tableditor/components/menu/column/ColumnMenu';

export interface UseColumnMenuParams extends ColumnMenuProps {
  ref: RefObject<MenuRef>;
}

export interface UseColumnMenu {
  menuSections: MenuSectionProps[];
}

export default function useColumnMenu(params: UseColumnMenuParams): UseColumnMenu {
  const { ref, onClickChangeBackgroundColor, onClickChangeFontColor, onClickClearContent } = params;

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
  ];

  return {
    menuSections,
  };
}
