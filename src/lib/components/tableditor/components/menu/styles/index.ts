import { css } from '@emotion/react';
import { Color } from '@defines/constants';

export namespace TableditorMenuStyle {
  export const itemTemplate = () => css`
    display: grid;
    grid-template-columns: 26px calc(100% - 42px) 16px;
    align-items: center;
    width: 200px;
    height: 20px;

    > .icon-container {
    }

    > .label {
      color: ${Color.BLACK};
    }

    > .more {
    }
  `;
}
