import { Color } from '@lib/defines/constants';
import { IconCommonProps } from '@lib/defines/types';

export interface HorizontalIconProps extends IconCommonProps {}

export function HorizontalIcon(props: HorizontalIconProps) {
  const { width = 16, height = 16, color = Color.GRAY_8 } = props;

  return (
    <svg xmlns={'http://www.w3.org/2000/svg'} width={width} height={height} fill={color} className={'bi bi-hr'} viewBox={'0 0 16 16'}>
      <path
        d={
          'M12 3H4a1 1 0 00-1 1v2.5H2V4a2 2 0 012-2h8a2 2 0 012 2v2.5h-1V4a1 1 0 00-1-1zM2 9.5h1V12a1 1 0 001 1h8a1 1 0 001-1V9.5h1V12a2 2 0 01-2 2H4a2 2 0 01-2-2V9.5zm-1.5-2a.5.5 0 000 1h15a.5.5 0 000-1H.5z'
        }
      />
    </svg>
  );
}
