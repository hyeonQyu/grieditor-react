import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { Menu, MenuProps } from '@components/menu';
import useColumnMenu from '@components/tableditor/components/menu/column/useColumnMenu';

export interface ColumnMenuProps extends Pick<MenuProps, 'targetRef'> {}

export const ColumnMenu = forwardRef<MenuRef, ColumnMenuProps>((props, ref) => {
  const { targetRef } = props;
  const { menuSections } = useColumnMenu({ ref: ref as RefObject<MenuRef> });

  return <Menu ref={ref} sections={menuSections} targetRef={targetRef} />;
});
