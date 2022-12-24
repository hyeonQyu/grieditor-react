import { ResizeEvent, RESIZER_WIDTH } from '@components/tableditor/constants';
import { css } from '@emotion/react';
import { Color } from '@constants/index';

export namespace TableditorStyle {
  export const container = (resizeEvent?: ResizeEvent) => css`
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px 0 8px;
    cursor: ${resizeEvent ? 'col-resize' : 'default'};
    position: relative;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background-color: ${Color.GRAY_0};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${Color.GRAY_2};

      &:hover {
        background-color: ${Color.GRAY_3};
      }
    }
  `;

  export const tableData = css`
    border: 1px solid ${Color.GRAY_1};
    position: relative;
    white-space: pre-wrap;
    word-break: break-word;

    :hover .highlighting {
      border: 1px solid ${Color.CYAN_0};
    }
  `;

  export const content = (isResizing: boolean) => css`
    padding: 8px;
    outline: none;
    line-height: 1.2;
    min-height: 100%;
    height: 100%;
    cursor: ${isResizing ? 'col-resize' : 'default'};

    :focus {
      cursor: text;

      + .highlighting {
        border: 2px solid ${Color.CYAN_3} !important;
      }
    }
  `;

  export const resizerController = css`
    position: absolute;
    display: flex;
    justify-content: center;
    width: ${RESIZER_WIDTH}px;
    height: 100%;
    top: 0;
    right: -4px;
    z-index: 10;
    cursor: col-resize;
  `;

  export const resizer = (resizerHovered: boolean) => css`
    width: 3px;
    height: calc(100% + 2px);
    background-color: ${resizerHovered ? Color.CYAN_3 : 'transparent'};
    transition: background-color 0.2s;
  `;
}
