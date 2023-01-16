/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { useMenu } from '@components/menu/useMenu';
import { MenuRef } from '@components/menu/defines';
import { MenuSection, MenuSectionProps } from '@components/menu/components/menuSection';
import { MenuStyle } from '@components/menu/styles';
import { Portal } from '@components/portal';

export interface MenuProps {
  sections: MenuSectionProps[];
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: (opened: boolean) => void;
}

export const Menu = forwardRef<MenuRef, MenuProps>((props, ref) => {
  const { sections } = props;
  const { menuRef, opened, mounted, appearAnimationDuration, disappearAnimationDuration, position } = useMenu({ ...props, ref });

  if (!mounted) return null;

  return (
    <Portal.Consumer>
      <div ref={menuRef} css={MenuStyle.container(opened, appearAnimationDuration, disappearAnimationDuration)} style={{ ...position }}>
        <ul>
          {sections.map((section, i) => (
            <MenuSection key={i} {...section} />
          ))}
        </ul>
      </div>
    </Portal.Consumer>
  );
});
