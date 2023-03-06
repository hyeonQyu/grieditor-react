import { MenuItemProps } from '@lib/components/menu/components/menuItem/index';
import { ForwardedRef, MouseEventHandler, useRef, useState } from 'react';
import { MenuRef } from '@lib/components/menu/defines';

export interface IUseMenuItemParams extends MenuItemProps {}

export interface IUseMenuItem {
  childMenuRef: ForwardedRef<MenuRef>;
  hasChildren: boolean;
  childMenuOpened: boolean;
  handleClick: MouseEventHandler<HTMLLIElement>;
  handleMouseEnter: MouseEventHandler<HTMLLIElement>;
  handleMouseLeave: MouseEventHandler<HTMLLIElement>;
  handleChildMenuToggle: (opened: boolean) => void;
}

export function useMenuItem(params: IUseMenuItemParams): IUseMenuItem {
  const { sections, onEvent } = params;

  const hasChildren = Boolean(sections) || Boolean(sections?.length);
  const childMenuRef = useRef<MenuRef>(null);
  const [childMenuOpened, setChildMenuOpened] = useState(false);

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

  const handleChildMenuToggle = (opened: boolean) => {
    setChildMenuOpened(opened);
  };

  return {
    childMenuRef,
    hasChildren,
    childMenuOpened,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleChildMenuToggle,
  };
}
