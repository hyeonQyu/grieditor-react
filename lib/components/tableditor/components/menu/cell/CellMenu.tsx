import { Menu } from '@lib/components/menu';
import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@lib/components/menu/defines';
import { useCellMenu } from '@lib/components/tableditor/components/menu/cell/useCellMenu';

export const CellMenu = forwardRef<MenuRef>((_, ref) => {
  const { menuSections } = useCellMenu({ ref: ref as RefObject<MenuRef> });

  return <Menu ref={ref} relativePosition={'horizontal'} horizontalGap={6} sections={menuSections} />;
});
