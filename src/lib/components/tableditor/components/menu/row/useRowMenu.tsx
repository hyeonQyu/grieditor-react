import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { TableditorColor } from '@components/tableditor/defines';
import { CustomEventHandler } from '@defines/types';
import { TableditorMenuUtil } from '@components/tableditor/utils/tableditorMenuUtil';

export interface UseRowMenuParams {
  ref: RefObject<MenuRef>;
}

export interface UseRowMenu {
  menuSections: MenuSectionProps[];
}

export default function useRowMenu(params: UseRowMenuParams): UseRowMenu {
  const { ref } = params;

  const handleClickRowMenuChangeBackgroundColor: CustomEventHandler<TableditorColor> = (color) => {};

  const handleClickRowMenuChangeFontColor: CustomEventHandler<TableditorColor> = (color) => {};

  const handleClickRowMenuClearContent = () => {};

  const menuSections: MenuSectionProps[] = [
    TableditorMenuUtil.getCommonTableditorMenuSection({
      ref,
      editLabel: 'Edit row',
      onClickChangeBackgroundColor: handleClickRowMenuChangeBackgroundColor,
      onClickChangeFontColor: handleClickRowMenuChangeFontColor,
      onClickClearContent: handleClickRowMenuClearContent,
    }),
  ];

  return {
    menuSections,
  };
}
