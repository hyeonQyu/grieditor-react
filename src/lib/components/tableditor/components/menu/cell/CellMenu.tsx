import { Menu } from '@components/menu';
import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { useCellMenu } from '@components/tableditor/components/menu/cell/useCellMenu';
import { TableditorEvent, TableditorEventHandler } from '@components/tableditor/defines';

export interface CellMenuProps {
  row: number;
  column: number;
  onCellMenuSelectRow: TableditorEventHandler<TableditorEvent>;
}

export const CellMenu = forwardRef<MenuRef, CellMenuProps>((props, ref) => {
  const {} = props;
  const { menuSections } = useCellMenu({ ...props, ref: ref as RefObject<MenuRef> });

  return <Menu ref={ref} sections={menuSections} />;
});
