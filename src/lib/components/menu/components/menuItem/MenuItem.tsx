/** @jsxImportSource @emotion/react */
import { MouseEventHandler, ReactNode } from 'react';
import { useMenuItem } from '@components/menu/components/menuItem/useMenuItem';
import { Menu } from '@components/menu';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { MenuStyle } from '@components/menu/styles';

export interface MenuItemProps {
  node: ReactNode;
  sections?: MenuSectionProps[];
  onEvent?: MouseEventHandler;
}

export function MenuItem(props: MenuItemProps) {
  const { node, sections } = props;

  const { childMenuRef, hasChildren, handleClick, handleMouseEnter, handleMouseLeave } = useMenuItem(props);

  return (
    <>
      <li onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} css={MenuStyle.item()}>
        <div>{node}</div>
        {hasChildren && <Menu ref={childMenuRef} sections={sections!} />}
      </li>
    </>
  );
}
