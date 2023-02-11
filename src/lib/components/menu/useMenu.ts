import { ForwardedRef, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useClickOutside from '@hooks/useClickOutside';
import useAnimationMount from '@hooks/useAnimationMount';
import { MenuProps } from '@components/menu';
import { MenuPosition, MenuRef } from '@components/menu/defines';

export interface IUseMenuParams extends MenuProps {
  ref: ForwardedRef<MenuRef>;
}

export interface IUseMenu {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  opened: boolean;
  mounted: boolean;
  appearAnimationDuration: number;
  disappearAnimationDuration: number;
  position: MenuPosition;
}

export function useMenu(params: IUseMenuParams): IUseMenu {
  const { ref, onOpen, onClose, onToggle } = params;

  const appearAnimationDuration = 0.2;
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
    clickEventType: 'mousedown',
  });

  const { mounted } = useAnimationMount({
    display: opened,
    disappearAnimationDuration,
  });

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

  useImperativeHandle<MenuRef, MenuRef>(ref, () => ({
    open(e) {
      setOpened(true);
      menuToggleTargetRectRef.current = (e.target as Element).getBoundingClientRect();
    },
    close() {
      setOpened(false);
    },
    toggle(e) {
      setOpened((prev) => !prev);
      menuToggleTargetRectRef.current = (e.target as Element).getBoundingClientRect();
    },
    element: menuRef.current,
  }));

  useEffect(() => {
    opened ? onOpen?.() : onClose?.();
    onToggle?.(opened);
  }, [opened]);

  return {
    menuRef,
    opened,
    mounted,
    appearAnimationDuration,
    disappearAnimationDuration,
    position,
  };
}
