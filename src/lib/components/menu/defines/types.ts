import { MouseEventHandler } from 'react';

export interface MenuRef {
  opened: boolean;
  open: MouseEventHandler;
  close: MouseEventHandler;
  toggle: MouseEventHandler;
}

export interface MenuPosition {
  top: number;
  left: number;
}
