/** @jsxImportSource @emotion/react */
import React, { forwardRef, MutableRefObject } from 'react';
import { useMenu } from '@lib/components/menu/useMenu';
import { MenuRef, RelativePositionType } from '@lib/components/menu/defines';
import { MenuSection, MenuSectionProps } from '@lib/components/menu/components/menuSection';
import { MenuStyle } from '@lib/components/menu/styles';
import { Portal } from '@lib/components/portal';

export interface MenuProps {
  sections: MenuSectionProps[];
  relativePosition: RelativePositionType;
  verticalGap?: number;
  horizontalGap?: number;
  targetRef?: MutableRefObject<HTMLElement | null>;
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
