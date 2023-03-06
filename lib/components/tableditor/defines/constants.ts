import { BackgroundColorMap, CellInfo, ColorMap, FontColorMap, TableExtender } from '@lib/components/tableditor/defines/index';

export const colorMap: ColorMap = {
  black: '#1d1d1d',
  white: '#ffffff',
  gray_dark: '#6a6a6a',
  gray_light: '#e0e0e0',
  brown_dark: '#613728',
  brown_light: '#cbbcb3',
  orange_dark: '#d05406',
  orange_light: '#fde9de',
  yellow_dark: '#deaf03',
  yellow_light: '#fff1da',
  green_dark: '#0b8403',
  green_light: '#dfffdd',
  blue_dark: '#0255b4',
  blue_light: '#dbeeff',
  purple_dark: '#4401d7',
  purple_light: '#dfd8fa',
  pink_dark: '#cd08e2',
  pink_light: '#f4ddfd',
  red_dark: '#cb0000',
  red_light: '#fdd9d9',
};

export const DEFAULT_CELL_WIDTH = 120;
export const RESIZER_WIDTH = 8;
export const CELL_MIN_WIDTH = 32;
export const MIN_TABLE_EXTENDER_SIZE = 20;
export const TABLE_EXTENDER_MARGIN = 4;

export const defaultTableExtender: TableExtender = {
  size: { width: MIN_TABLE_EXTENDER_SIZE, height: MIN_TABLE_EXTENDER_SIZE },
  visible: false,
};

export const defaultCell: CellInfo = {
  width: DEFAULT_CELL_WIDTH,
  content: '',
  backgroundColor: 'white',
  font: {
    color: 'black',
    style: 'default',
  },
};

export const backgroundColorMap: BackgroundColorMap = {
  black: 'black',
  white: 'white',
  gray: 'gray_light',
  brown: 'brown_light',
  orange: 'orange_light',
  yellow: 'yellow_light',
  green: 'green_light',
  blue: 'blue_light',
  purple: 'purple_light',
  pink: 'pink_light',
  red: 'red_light',
};

export const fontColorMap: FontColorMap = {
  black: 'black',
  white: 'white',
  gray: 'gray_dark',
  brown: 'brown_dark',
  orange: 'orange_dark',
  yellow: 'yellow_dark',
  green: 'green_dark',
  blue: 'blue_dark',
  purple: 'purple_dark',
  pink: 'pink_dark',
  red: 'red_dark',
};
