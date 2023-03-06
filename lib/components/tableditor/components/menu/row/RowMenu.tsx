import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@lib/components/menu/defines';
import { Menu, MenuProps } from '@lib/components/menu';
import useRowMenu from '@lib/components/tableditor/components/menu/row/useRowMenu';
import { ColorChangeEvent, TableditorEventHandler } from '@lib/components/tableditor/defines';

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

  return <Menu ref={ref} relativePosition={'horizontal'} horizontalGap={6} sections={menuSections} targetRef={targetRef} />;
});
