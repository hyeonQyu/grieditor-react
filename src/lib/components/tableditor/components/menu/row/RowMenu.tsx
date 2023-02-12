import { forwardRef, RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { Menu, MenuProps } from '@components/menu';
import useRowMenu from '@components/tableditor/components/menu/row/useRowMenu';

export interface RowMenuProps extends Pick<MenuProps, 'targetRef'> {}

export const RowMenu = forwardRef<MenuRef, RowMenuProps>((props, ref) => {
  const { targetRef } = props;
  const { menuSections } = useRowMenu({ ref: ref as RefObject<MenuRef> });

  return <Menu ref={ref} sections={menuSections} targetRef={targetRef} />;
});
