import { RowColumn } from '@components/tableditor/constants/index';
import { CaretPosition } from '@constants/types';

export interface CellHoverEvent {
  rowColumn: RowColumn;
}

export type CellHoverEventHandler = (e?: CellHoverEvent) => void;

export interface CellFocusEvent {
  rowColumn: RowColumn;
  caretPosition?: CaretPosition;
}

export type CellFocusEventHandler = (e?: CellFocusEvent) => void;

export interface CellChangeEvent {
  rowColumn: RowColumn;
  content: string;
}

export type CellChangeEventHandler = (e: CellChangeEvent) => void;

export interface ResizerHoverEvent {
  rowColumn: RowColumn;
}

export type ResizerHoverEventHandler = (e?: ResizerHoverEvent) => void;

export interface ResizeEvent {
  column: number;
  pivotX?: number;
  mouseX?: number;
}

export type ResizeEventHandler = (e?: ResizeEvent) => void;
