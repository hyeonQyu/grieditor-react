import { css } from '@emotion/react';
import { Color, ZIndex } from '@defines/constants';

export namespace MenuStyle {
  export const container = (opened: boolean, disappearAnimationDuration: number) => css`
    position: absolute;
    padding: 10px 5px;
    border-radius: 8px;
    box-shadow: 1px 1px 5px ${Color.GRAY_3};
    background-color: ${Color.WHITE};
    transition: opacity ${disappearAnimationDuration}s ease-in-out;
    opacity: ${opened ? 1 : 0};
    z-index: ${ZIndex.MENU};
  `;

  export const section = () => css`
    padding: 4px 0;

    > ul > .label {
      font-weight: bold;
      padding: 5px;
      font-size: 16px;
      color: ${Color.BLACK};
    }
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
