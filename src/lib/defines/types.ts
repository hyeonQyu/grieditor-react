export type CaretPosition = 'head' | 'tail';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface RectSize {
  width: number;
  height: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Rect {
  size: RectSize;
  coordinate: Coordinate;
}

export interface IconCommonProps {
  width?: number;
  height?: number;
  color?: string;
}

export type CustomEventHandler<E> = (e?: E) => void;
