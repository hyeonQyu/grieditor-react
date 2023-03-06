/** @jsxImportSource @emotion/react */
import { MouseEventHandler, ReactNode } from 'react';
import { useMenuItem } from '@lib/components/menu/components/menuItem/useMenuItem';
import { Menu } from '@lib/components/menu';
import { MenuSectionProps } from '@lib/components/menu/components/menuSection';
import { MenuStyle } from '@lib/components/menu/styles';

export interface MenuItemProps {
  node: ReactNode;
  sections?: MenuSectionProps[];
  onEvent?: MouseEventHandler;
}

export function MenuItem(props: MenuItemProps) {
  const { node, sections } = props;

  const { childMenuRef, hasChildren, childMenuOpened, handleClick, handleMouseEnter, handleMouseLeave, handleChildMenuToggle } = useMenuItem(props);

  return (
    <>
      <li onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} css={MenuStyle.item(childMenuOpened)}>
        <div className={'node'}>{node}</div>
        {hasChildren && (
          <Menu ref={childMenuRef} relativePosition={'horizontal'} verticalGap={-60} sections={sections!} onToggle={handleChildMenuToggle} />
        )}
      </li>
    </>
  );
}
