import { ForwardedRef, MutableRefObject, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import useClickOutside from '@hooks/useClickOutside';
import useAnimationMount from '@hooks/useAnimationMount';
import { MenuProps } from '@components/menu';
import { MenuPosition, MenuRef, RelativePositionType } from '@components/menu/defines';

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
  const { ref, targetRef, relativePosition, verticalGap = 0, horizontalGap = 0, onOpen, onClose, onToggle } = params;

  const appearAnimationDuration = 0.2;
  const disappearAnimationDuration = 0.2;

  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ top: Number.MAX_VALUE, left: Number.MAX_VALUE });

  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleTargetRectRef = useRef<DOMRect>();

  const { mounted } = useAnimationMount({
    display: opened,
    disappearAnimationDuration,
  });

  const handleClickOutside = useCallback(() => {
    setOpened(false);
  }, []);

  useClickOutside<HTMLDivElement>({
    ref: menuRef,
    onClickOutside: handleClickOutside,
    clickEventType: 'mousedown',
  });

  useEffect(() => {
    if (!mounted) return;

    const menuElement = menuRef.current;
    const targetRect = menuToggleTargetRectRef?.current;

    if (!menuElement || !targetRect) return;

    const getPositionByRelativePosition: Record<RelativePositionType, () => MenuPosition> = {
      vertical() {
        let { left, top } = targetRect;

        left += horizontalGap;
        const right = left + menuElement.clientWidth;
        if (right > window.innerWidth) {
          left = targetRect.left - menuElement.clientWidth - horizontalGap;
        }

        top += targetRect.height + verticalGap;
        const bottom = top + menuElement.clientHeight;
        if (bottom > window.innerHeight) {
          top = targetRect.top - menuElement.clientHeight - verticalGap;
        }

        return { top, left };
      },
      horizontal() {
        let { left, top } = targetRect;

        left += targetRect.width + horizontalGap;
        const right = left + menuElement.clientWidth;

        if (right > window.innerWidth) {
          left = targetRect.left - menuElement.clientWidth - horizontalGap;
        }

        top += verticalGap;
        const bottom = top + menuElement.clientHeight;

        if (bottom > window.innerHeight) {
          top = targetRect.top - menuElement.clientHeight + targetRect.height - verticalGap;
        }

        return { top, left };
      },
    };

    setPosition(getPositionByRelativePosition[relativePosition]());
  }, [mounted]);

  const getTargetBoundingRect = (target: EventTarget) =>
    targetRef?.current?.getBoundingClientRect() || (target as HTMLElement).getBoundingClientRect();

  useImperativeHandle<MenuRef, MenuRef>(ref, () => ({
    open(e) {
      setOpened(true);
      menuToggleTargetRectRef.current = getTargetBoundingRect(e.target);
    },
    close() {
      setOpened(false);
    },
    toggle(e) {
      setOpened((prev) => !prev);
      menuToggleTargetRectRef.current = getTargetBoundingRect(e.target);
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
