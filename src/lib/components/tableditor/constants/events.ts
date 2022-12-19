import { RowColumn } from '@components/tableditor/constants/index';
import { CaretPosition } from '@constants/types';

export type TableditorEvent =
  | {
      rowColumn: RowColumn;
    }
  | undefined;

export type CellHoverEvent = {} & TableditorEvent;

export type CellFocusEvent = {
  caretPosition?: CaretPosition;
} & TableditorEvent;

export type CellChangeEvent = {
  content: string;
} & TableditorEvent;

export type ResizerHoverEvent = {} & TableditorEvent;

export type ResizeEvent = {
  pivotX?: number;
  mouseX?: number;
} & TableditorEvent;

export type CellInsertNewlineEvent = {
  content: string;
  caretPosition: CaretPosition;
} & TableditorEvent;

export type TableditorEventHandler<E extends TableditorEvent> = (e?: E) => void;
