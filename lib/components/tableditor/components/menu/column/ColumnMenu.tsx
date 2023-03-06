import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@lib/components/menu/defines';
import { Menu, MenuProps } from '@lib/components/menu';
import useColumnMenu from '@lib/components/tableditor/components/menu/column/useColumnMenu';
import { ColorChangeEvent, TableditorEventHandler } from '@lib/components/tableditor/defines';

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

  return <Menu ref={ref} relativePosition={'horizontal'} horizontalGap={6} sections={menuSections} targetRef={targetRef} />;
});
