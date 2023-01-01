import { RowColumn } from '@components/tableditor/defines/index';
import { CaretPosition, Direction } from '@defines/types';

export type TableditorEvent =
  | {
      rowColumn: RowColumn;
    }
  | undefined;

export type CellHoverEvent = {} & TableditorEvent;

export type CellFocusEvent = {
  caretPosition?: CaretPosition;
  direction?: Direction;
} & TableditorEvent;

export type CellChangeEvent = {
  content: string;
} & TableditorEvent;

export type ResizerHoverEvent = {} & TableditorEvent;

export type ResizeEvent = {
  pivotX?: number;
  mouseX?: number;
} & TableditorEvent;

export type TableditorEventHandler<E extends TableditorEvent> = (e?: E) => void;
