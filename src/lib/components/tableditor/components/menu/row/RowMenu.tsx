import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { Menu, MenuProps } from '@components/menu';
import useRowMenu from '@components/tableditor/components/menu/row/useRowMenu';
import { ColorChangeEvent, TableditorEventHandler } from '@components/tableditor/defines';

export interface RowMenuProps extends Pick<MenuProps, 'targetRef'> {
  onClickChangeBackgroundColor: TableditorEventHandler<ColorChangeEvent>;
  onClickChangeFontColor: TableditorEventHandler<ColorChangeEvent>;
  onClickClearContent: TableditorEventHandler;
  onClickAddRowAbove: TableditorEventHandler;
  onClickAddRowBelow: TableditorEventHandler;
  onClickDeleteRow: TableditorEventHandler;
}

export const RowMenu = forwardRef<MenuRef, RowMenuProps>((props, ref) => {
  const { targetRef } = props;
  const { menuSections } = useRowMenu({ ref: ref as RefObject<MenuRef>, ...props });

  return <Menu ref={ref} sections={menuSections} targetRef={targetRef} />;
});
