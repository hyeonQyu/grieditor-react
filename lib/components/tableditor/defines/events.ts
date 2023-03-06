import { RowColumn, TableditorColor } from '@lib/components/tableditor/defines/index';
import { CaretPosition, Direction } from '@lib/defines/types';

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

export type CellContentChangeEvent = {
  content: string;
} & TableditorEvent;

export type ResizerHoverEvent = {} & TableditorEvent;

export type CellResizeEvent = {
  pivotX?: number;
  mouseX?: number;
} & TableditorEvent;

export type ColorChangeEvent = {
  color: TableditorColor;
};

export type CellColorChangeEvent = ColorChangeEvent & TableditorEvent;

export type TableditorEventHandler<E = undefined> = (e?: E) => void;
