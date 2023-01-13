import { MenuItemProps } from '@components/menu/components/menuItem';
import { MouseEventHandler, Ref, useRef } from 'react';
import { MenuRef } from '@components/menu/defines';

export interface IUseMenuItemParams extends MenuItemProps {}

export interface IUseMenuItem {
  childMenuRef: Ref<MenuRef>;
  hasChildren: boolean;
  handleClick: MouseEventHandler<HTMLLIElement>;
  handleMouseEnter: MouseEventHandler<HTMLLIElement>;
  handleMouseLeave: MouseEventHandler<HTMLLIElement>;
}

export function useMenuItem(params: IUseMenuItemParams): IUseMenuItem {
  const { sections, onEvent } = params;

  const hasChildren = Boolean(sections) || Boolean(sections?.length);
  const childMenuRef = useRef<MenuRef>(null);

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    if (hasChildren) return childMenuRef.current?.toggle(e);
    onEvent?.(e);
  };

  const handleMouseEnter: MouseEventHandler<HTMLLIElement> = (e) => {
    if (!hasChildren) return;
    onEvent?.(e);
    childMenuRef.current?.open(e);
  };

  const handleMouseLeave: MouseEventHandler<HTMLLIElement> = (e) => {
    if (!hasChildren) return;
    childMenuRef.current?.close(e);
  };

  return {
    childMenuRef,
    hasChildren,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}
