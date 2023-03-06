import { css } from '@emotion/react';
import { Color } from '@lib/defines/constants';
import { colorMap } from '@lib/components/tableditor/defines';

export namespace TableditorMenuStyle {
  export const commonItemTemplate = () => css`
    display: grid;
    align-items: center;
    height: 20px;

    > .label {
      color: ${Color.BLACK};
    }
  `;

  export const itemTemplate = () => css`
    grid-template-columns: 26px calc(100% - 42px) 16px;
    width: 200px;
  `;

  export const colorItemTemplate = (color: string) => css`
    grid-template-columns: 32px calc(100% - 32px);
    width: 150px;

    > .color-container > .color {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      box-shadow: 1px 1px 5px ${Color.GRAY_4};

      &.background {
        color: ${color === colorMap.black ? Color.GRAY_1 : Color.BLACK};
        background-color: ${color};
      }

      &.font {
        color: ${color};
        background-color: ${Color.WHITE};
        text-shadow: 1px 1px 1px ${Color.GRAY_2};
      }
    }
  `;
}
