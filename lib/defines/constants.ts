import { Direction } from '@lib/defines/types';

export enum Color {
  CYAN_0 = '#CBF6F5',
  CYAN_1 = '#85EAE7',
  CYAN_2 = '#62E4E0',
  CYAN_3 = '#3FDED9',

  WHITE = '#FFFFFF',
  GRAY_0 = '#E9EBED',
  GRAY_1 = '#DDE0E3',
  GRAY_2 = '#C7CCD1',
  GRAY_3 = '#B0B8BF',
  GRAY_4 = '#9AA4AC',
  GRAY_5 = '#84909A',
  GRAY_6 = '#6E7C87',
  GRAY_7 = '#5C6770',
  GRAY_8 = '#49525A',
  GRAY_9 = '#373E43',
  BLACK = '#1f2426',
}

export enum ZIndex {
  RESIZER = 100,
  CELL_SELECTOR = 1000,
  MENU = 10000,
}

export const ROTATE_ANGLE_BY_DIRECTION: { [key in Direction]: number } = {
  up: 0,
  down: 180,
  right: 90,
  left: 270,
};
