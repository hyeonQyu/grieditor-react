import React, { MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
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
  const menuToggleTargetRectRef = useRef<DOMRect>();

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
    menuToggleTargetRectRef.current = target.getBoundingClientRect();
  };

  const handleClose = () => {
    onClose?.();
  };

  useEffect(() => {
    if (!mounted) return;

    const menuElement = menuRef.current;
    const targetRect = menuToggleTargetRectRef?.current;

    if (!menuElement || !targetRect) return;

    let left = targetRect.left + targetRect.width;
    const right = left + menuElement.clientWidth;

    if (right > window.innerWidth) {
      left = targetRect.left - menuElement.clientWidth;
    }

    let top = targetRect.top;
    const bottom = top + menuElement.clientHeight;

    if (bottom > window.innerHeight) {
      top = targetRect.top - menuElement.clientHeight + targetRect.height;
    }

    setPosition({ top, left });
  }, [mounted]);

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
