import { Menu } from '@components/menu';
import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { useCellMenu } from '@components/tableditor/components/menu/cell/useCellMenu';

export const CellMenu = forwardRef<MenuRef>((_, ref) => {
  const { menuSections } = useCellMenu({ ref: ref as RefObject<MenuRef> });

  return <Menu ref={ref} sections={menuSections} />;
});
