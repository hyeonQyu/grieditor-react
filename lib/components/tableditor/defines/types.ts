import { RefObject } from 'react';
import { RectSize } from '@lib/defines/types';

export interface CellInfo {
  content: string;
  width: number;
  backgroundColor: TableditorColor;
  font: Font;
}

export interface CellState {
  focused: boolean;
  resizerHovered: boolean;
  isResizing: boolean;
  contentEditableRef: RefObject<HTMLDivElement>;
  caretOffset: number;
  selected: boolean;
}

export interface InAppCellInfo extends CellInfo, CellState {}

export interface Font {
  color: TableditorColor;
  style: FontStyle;
}

export type TableditorAchromaticColor = 'black' | 'white';
export type TableditorChromaticColor = 'gray' | 'brown' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'red';

export type TableditorChromaticDarkColor = `${TableditorChromaticColor}_dark`;
export type TableditorChromaticLightColor = `${TableditorChromaticColor}_light`;

export type TableditorColor = TableditorAchromaticColor | TableditorChromaticDarkColor | TableditorChromaticLightColor;
export type TableditorColorName = TableditorAchromaticColor | TableditorChromaticColor;

export type ColorMap = Record<TableditorColor, string>;

export type BackgroundColorMap = Record<TableditorColorName, Extract<TableditorColor, TableditorAchromaticColor | TableditorChromaticLightColor>>;

export type FontColorMap = Record<TableditorColorName, Extract<TableditorColor, TableditorAchromaticColor | TableditorChromaticDarkColor>>;

export type FontStyle = 'default' | 'bold' | 'italic' | 'underline' | 'strikethrough';

export interface RowColumn {
  row: number;
  column: number;
}

export interface OptionalRowColumn {
  row: number | undefined;
  column: number | undefined;
}

export type GetEventHandledCells<E = unknown> = (param: { e?: E; cells: InAppCellInfo[][] }) => InAppCellInfo[][];

export interface TableExtender {
  size: RectSize;
  visible: boolean;
}

export interface TableditorHandler {
  getCells: () => CellInfo[][];
  getInAppCells: () => InAppCellInfo[][];
  getRow: (rowIndex: number) => CellInfo[];
  getInAppRow: (rowIndex: number) => InAppCellInfo[];
  getColumn: (columnIndex: number) => CellInfo[];
  getInAppColumn: (columnIndex: number) => InAppCellInfo[];
  setCells: (cells: CellInfo[][]) => void;
  addRow: (cells: CellInfo[]) => void;
  addColumn: (cells: CellInfo[]) => void;
}
