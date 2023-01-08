import React, { MutableRefObject, Ref, useRef, useState } from 'react';
import useClickOutside from '@hooks/useClickOutside';
import useAnimationMount from '@hooks/useAnimationMount';
import { MenuProps } from '@components/menu/Menu';
import { MenuPosition, MenuRef } from '@components/menu/defines';

export interface IUseMenuParams extends MenuProps {
  ref: Ref<MenuRef>;
}

export interface IUseMenu {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  opened: boolean;
  mounted: boolean;
  disappearAnimationDuration: number;
  position: MenuPosition;
}

export function useMenu(params: IUseMenuParams): IUseMenu {
  const { ref, onOpen, onClose } = params;

  const disappearAnimationDuration = 0.2;

  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ top: Number.MAX_VALUE, left: Number.MAX_VALUE });

  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside<HTMLDivElement>({
    ref: menuRef,
    onClickOutside() {
      setOpened(false);
    },
  });

  const { mounted } = useAnimationMount({
    display: opened,
    disappearAnimationDuration,
  });

  const handleOpen = (target: Element) => {
    onOpen?.();
    const { top, left, width, height } = target.getBoundingClientRect();
    setPosition({ top: top + height, left: left + width });
  };

  const handleClose = () => {
    onClose?.();
  };

  React.useImperativeHandle<MenuRef, MenuRef>(ref, () => ({
    opened,
    open(e) {
      setOpened(true);
      handleOpen(e.target as Element);
    },
    close() {
      setOpened(false);
      handleClose();
    },
    toggle(e) {
      setOpened((prev) => {
        const next = !prev;
        next ? handleOpen(e.target as Element) : handleClose();
        return next;
      });
    },
  }));

  return {
    menuRef,
    opened,
    mounted,
    disappearAnimationDuration,
    position,
  };
}
