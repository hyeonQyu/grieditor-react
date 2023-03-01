import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { Menu, MenuProps } from '@components/menu';
import useColumnMenu from '@components/tableditor/components/menu/column/useColumnMenu';
import { ColorChangeEvent, TableditorEventHandler } from '@components/tableditor/defines';

export interface ColumnMenuProps extends Pick<MenuProps, 'targetRef'> {
  onClickChangeBackgroundColor: TableditorEventHandler<ColorChangeEvent>;
  onClickClearContent: TableditorEventHandler;
  onClickChangeFontColor: TableditorEventHandler<ColorChangeEvent>;
  onClickAddColumnLeft: TableditorEventHandler;
  onClickAddColumnRight: TableditorEventHandler;
  onClickDeleteColumn: TableditorEventHandler;
}

export const ColumnMenu = forwardRef<MenuRef, ColumnMenuProps>((props, ref) => {
  const { targetRef } = props;
  const { menuSections } = useColumnMenu({ ref: ref as RefObject<MenuRef>, ...props });

  return <Menu ref={ref} sections={menuSections} targetRef={targetRef} />;
});
