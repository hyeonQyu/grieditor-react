export interface CellData {
  content: string;
  width: number;
  backgroundColor: TableditorColor;
  font: Font;
}

export interface Font {
  color: TableditorColor;
  style: FontStyle;
}

export type TableditorColor =
  | 'black'
  | 'white'
  | 'gray_dark'
  | 'gray_light'
  | 'brown_dark'
  | 'brown_light'
  | 'orange_dark'
  | 'orange_light'
  | 'yellow_dark'
  | 'yellow_light'
  | 'green_dark'
  | 'green_light'
  | 'blue_dark'
  | 'blue_light'
  | 'purple_dark'
  | 'purple_light'
  | 'pink_dark'
  | 'pink_light'
  | 'red_dark'
  | 'red_light';

export type FontStyle = 'default' | 'bold' | 'italic' | 'underline' | 'strikethrough';

export type ColorMap = {
  [key in TableditorColor]: string;
};

export interface RowColumn {
  row: number;
  column: number;
}

export type GetEventHandledCells<T> = (param: { e: T; cells: CellData[][] }) => CellData[][];
