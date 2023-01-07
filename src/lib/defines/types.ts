export type CaretPosition = 'head' | 'tail';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface RectSize {
  width: number;
  height: number;
}

export interface IconCommonProps {
  width?: number;
  height?: number;
  color?: string;
}
