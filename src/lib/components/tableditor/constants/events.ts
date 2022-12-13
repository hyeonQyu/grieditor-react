import { RowColumn } from '@components/tableditor/constants/index';

export interface CellHoverEvent {
  rowColumn: RowColumn;
}

export type CellHoverEventHandler = (e?: CellHoverEvent) => void;

export interface CellFocusEvent {
  rowColumn: RowColumn;
  directionTo?: 'right' | 'left' | 'up' | 'down';
}

export type CellFocusEventHandler = (e?: CellFocusEvent) => void;

export interface CellChangeEvent {
  rowColumn: RowColumn;
  content: string;
}

export type CellChangeEventHandler = (e: CellChangeEvent) => void;
