import { MIN_TABLE_EXTENDER_SIZE, ResizeEvent, RESIZER_WIDTH, TABLE_EXTENDER_MARGIN } from '@components/tableditor/defines';
import { css } from '@emotion/react';
import { Color } from '@defines/index';

export namespace TableditorStyle {
  export const container = (resizeEvent?: ResizeEvent) => css`
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 0 ${MIN_TABLE_EXTENDER_SIZE + TABLE_EXTENDER_MARGIN}px;
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

  export const tableData = () => css`
    border: 1px solid ${Color.GRAY_1};
    position: relative;
    white-space: pre-wrap;
    word-break: break-word;

    :hover .highlighting {
      border: 1px solid ${Color.CYAN_0};
    }
    :hover button.more-options {
      visibility: visible;
    }
  `;

  export const content = (isResizing: boolean, hasContent: boolean) => css`
    padding: 8px;
    outline: none;
    line-height: 1.2;
    min-height: 100%;
    height: 100%;
    cursor: ${isResizing ? 'col-resize' : 'default'};

    :focus {
      cursor: text;

      ~ .highlighting {
        border: 2px solid ${Color.CYAN_3} !important;
      }

      ~ button.more-options:not(:hover) {
        opacity: ${hasContent ? 0.7 : 1};
      }
    }
  `;

  export const moreOptions = () => css`
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 2px;
    background-color: ${Color.WHITE};
    cursor: pointer;
    transition: background-color 0.2s, opacity 0.2s;
    box-shadow: 1px 1px 5px ${Color.GRAY_3};
    border-radius: 4px;
    visibility: hidden;

    :hover {
      background-color: ${Color.GRAY_0};
    }
  `;

  export const highlighting = () => css`
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    height: 100%;
  `;

  export const resizerController = () => css`
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

  export const extender = (visible: boolean) => css`
    background-color: ${visible ? Color.GRAY_0 : 'transparent'};
    color: ${visible ? Color.GRAY_6 : 'transparent'};
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;
    position: absolute;

    &:hover {
      background-color: ${Color.GRAY_1};
      color: ${Color.GRAY_6};
    }

    &:active {
      background-color: ${Color.GRAY_2};
      color: ${Color.GRAY_1};
      transition: none;
    }
  `;

  export const rowAddExtender = () => css`
    height: 24px;
    left: 0;
  `;

  export const columnAddExtender = () => css`
    width: 24px;
    top: 0;
  `;
}
