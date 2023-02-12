import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { TableditorColor } from '@components/tableditor/defines';
import { CustomEventHandler } from '@defines/types';
import { TableditorMenuUtil } from '@components/tableditor/utils/tableditorMenuUtil';

export interface UseColumnMenuParams {
  ref: RefObject<MenuRef>;
}

export interface UseColumnMenu {
  menuSections: MenuSectionProps[];
}

export default function useColumnMenu(params: UseColumnMenuParams): UseColumnMenu {
  const { ref } = params;

  const handleClickColumnMenuChangeBackgroundColor: CustomEventHandler<TableditorColor> = (color) => {};

  const handleClickColumnMenuChangeFontColor: CustomEventHandler<TableditorColor> = (color) => {};

  const handleClickColumnMenuClearContent = () => {};

  const menuSections: MenuSectionProps[] = [
    TableditorMenuUtil.getCommonTableditorMenuSection({
      ref,
      editLabel: 'Edit column',
      onClickChangeBackgroundColor: handleClickColumnMenuChangeBackgroundColor,
      onClickChangeFontColor: handleClickColumnMenuChangeFontColor,
      onClickClearContent: handleClickColumnMenuClearContent,
    }),
  ];

  return {
    menuSections,
  };
}
