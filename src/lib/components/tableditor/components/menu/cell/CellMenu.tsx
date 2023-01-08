import { Menu } from '@components/menu';
import { forwardRef } from 'react';
import { MenuRef } from '@components/menu/defines';
import { useCellMenu } from '@components/tableditor/components/menu/cell/useCellMenu';

export interface CellMenuProps {}

export const CellMenu = forwardRef<MenuRef, CellMenuProps>((props, ref) => {
  const {} = props;
  const { menuSections } = useCellMenu(props);

  return <Menu ref={ref} sections={menuSections} />;
});
