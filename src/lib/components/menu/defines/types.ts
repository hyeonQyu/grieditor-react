import { EventHandler, MouseEventHandler } from 'react';

export interface MenuRef {
  opened: boolean;
  open: MouseEventHandler;
  close: EventHandler<any>;
  toggle: MouseEventHandler;
}

export interface MenuPosition {
  top: number;
  left: number;
}
