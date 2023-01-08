/** @jsxImportSource @emotion/react */
import { MouseEventHandler, ReactNode } from 'react';

export interface MenuItemProps {
  node: ReactNode;
  items?: MenuItemProps[];
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  onClick?: MouseEventHandler;
}

export function MenuItem(props: MenuItemProps) {
  const {} = props;

  return <></>;
}
