import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { TableditorColor } from '@components/tableditor/defines';
import { CustomEventHandler } from '@defines/types';
import { TableditorMenuUtil } from '@components/tableditor/utils/tableditorMenuUtil';
import { RowMenuProps } from '@components/tableditor/components/menu/row/RowMenu';

export interface UseRowMenuParams extends RowMenuProps {
  ref: RefObject<MenuRef>;
}

export interface UseRowMenu {
  menuSections: MenuSectionProps[];
}

export default function useRowMenu(params: UseRowMenuParams): UseRowMenu {
  const { ref, onClickChangeBackgroundColor, onClickChangeFontColor, onClickClearContent } = params;

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
  ];

  return {
    menuSections,
  };
}
