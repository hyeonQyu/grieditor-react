import { Color, ROTATE_ANGLE_BY_DIRECTION } from '@lib/defines/constants';
import { Direction, IconCommonProps } from '@lib/defines/types';

export interface ChevronIconProps extends IconCommonProps {
  direction: Direction;
}

export function ChevronIcon(props: ChevronIconProps) {
  const { width = 16, height = 16, color = Color.GRAY_8, direction } = props;

  const rotate = ROTATE_ANGLE_BY_DIRECTION[direction];

  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      width={width}
      height={height}
      fill={color}
      className={'bi bi-chevron-up'}
      viewBox={'0 0 16 16'}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path fillRule={'evenodd'} d={'M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z'} />
    </svg>
  );
}
