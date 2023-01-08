import { css, keyframes } from '@emotion/react';
import { Color, ZIndex } from '@defines/constants';

export namespace MenuStyle {
  const appear = keyframes`
    0% {
      visibility: hidden;
    }
    2% {
      visibility: visible;
      opacity: 0;
      padding: 0 5px;
    }
    100% {
      opacity: 1;
      padding: 10px 5px;
    }
  `;

  export const container = (opened: boolean, appearAnimationDuration: number, disappearAnimationDuration: number) => css`
    animation: ${appear} ${appearAnimationDuration}s;
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
      padding: 5px 10px;
      color: ${Color.GRAY_9};
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
