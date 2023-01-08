import { css } from '@emotion/react';
import { Color } from '@defines/constants';

export namespace MenuStyle {
  export const container = (opened: boolean, disappearAnimationDuration: number) => css`
    position: absolute;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 1px 1px 5px ${Color.GRAY_3};
    background-color: ${Color.WHITE};
    transition: opacity ${disappearAnimationDuration}s ease-in-out;
    opacity: ${opened ? 1 : 0};

    width: 100px;
    height: 100px;
  `;

  export const item = () => css`
    border-radius: 4px;
    padding: 5px 8px;
    cursor: pointer;

    :hover {
      background-color: ${Color.GRAY_0};
    }
  `;
}
