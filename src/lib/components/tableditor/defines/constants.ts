import { ColorMap, TableExtender } from '@components/tableditor/defines';

export const COLOR_MAP: ColorMap = {
  black: '#1d1d1d',
  white: '#ffffff',
  gray_dark: '#5c5c5c',
  gray_light: '#b1b1b1',
  brown_dark: '#613622',
  brown_light: '#c2aa9d',
  orange_dark: '#d05406',
  orange_light: '#f5bdac',
  yellow_dark: '#deaf03',
  yellow_light: '#f5db8d',
  green_dark: '#0b8403',
  green_light: '#c6ffc4',
  blue_dark: '#0255b4',
  blue_light: '#b3deff',
  purple_dark: '#4401d7',
  purple_light: '#c3b3ff',
  pink_dark: '#cd08e2',
  pink_light: '#edb8ff',
  red_dark: '#cb0000',
  red_light: '#ffc4c4',
};

export const DEFAULT_CELL_WIDTH = 120;
export const RESIZER_WIDTH = 8;
export const CELL_MIN_WIDTH = 32;
export const MIN_TABLE_EXTENDER_SIZE = 20;
export const TABLE_EXTENDER_MARGIN = 4;

export const DEFAULT_TABLE_EXTENDER: TableExtender = {
  size: { width: MIN_TABLE_EXTENDER_SIZE, height: MIN_TABLE_EXTENDER_SIZE },
  visible: false,
};
