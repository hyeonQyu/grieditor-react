import { EventHandler, MouseEventHandler } from 'react';

export interface MenuRef {
  open: MouseEventHandler;
  close: EventHandler<any>;
  toggle: MouseEventHandler;
  element: HTMLDivElement | null;
}

export type RelativePositionType = 'vertical' | 'horizontal';

export interface MenuPosition {
  top: number;
  left: number;
}
