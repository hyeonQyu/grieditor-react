import { Direction, IconCommonProps } from '@defines/types';
import { Color, ROTATE_ANGLE_BY_DIRECTION } from '@defines/constants';

export interface ArrowIconProps extends IconCommonProps {
  direction: Direction;
}

export function ArrowIcon(props: ArrowIconProps) {
  const { width = 16, height = 16, color = Color.GRAY_8, direction } = props;

  const rotate = ROTATE_ANGLE_BY_DIRECTION[direction];

  return (
    <svg
      xmlns={'http://www.w3.org/2000/svg'}
      width={width}
      height={height}
      fill={color}
      className={'bi bi-arrow-up'}
      viewBox={'0 0 16 16'}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path
        fillRule={'evenodd'}
        d={'M8 15a.5.5 0 00.5-.5V2.707l3.146 3.147a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 10.708.708L7.5 2.707V14.5a.5.5 0 00.5.5z'}
      />
    </svg>
  );
}
