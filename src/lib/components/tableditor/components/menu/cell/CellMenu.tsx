import { Menu } from '@components/menu';
import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { useCellMenu } from '@components/tableditor/components/menu/cell/useCellMenu';
import { CellProps } from '@components/tableditor/components/cell';

export interface CellMenuProps extends Pick<CellProps, 'row' | 'column' | 'onCellMenuSelectRow' | 'onCellMenuSelectColumn'> {}

export const CellMenu = forwardRef<MenuRef, CellMenuProps>((props, ref) => {
  const {} = props;
  const { menuSections } = useCellMenu({ ...props, ref: ref as RefObject<MenuRef> });

  return <Menu ref={ref} sections={menuSections} />;
});
