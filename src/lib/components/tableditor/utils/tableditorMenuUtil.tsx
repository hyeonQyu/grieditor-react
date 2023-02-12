import { MenuSectionProps } from '@components/menu/components/menuSection';
import { CustomEventHandler } from '@defines/types';
import { backgroundColorMap, fontColorMap, TableditorColor, TableditorColorName } from '@components/tableditor/defines';
import { MenuColorItemTemplate, MenuItemTemplate } from '@components/tableditor/components/menu/itemTemplate';
import { PaintBucketIcon } from '@icons/PaintBucketIcon';
import { PencilIcon } from '@icons/PencilIcon';
import { EraserIcon } from '@icons/EraserIcon';
import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';

export namespace TableditorMenuUtil {
  export const getCommonTableditorMenuSection = ({
    ref,
    editLabel,
    onClickChangeBackgroundColor,
    onClickChangeFontColor,
    onClickClearContent,
  }: {
    ref: RefObject<MenuRef>;
    editLabel: string;
    onClickChangeBackgroundColor: CustomEventHandler<TableditorColor>;
    onClickChangeFontColor: CustomEventHandler<TableditorColor>;
    onClickClearContent: () => void;
  }): MenuSectionProps => {
    return {
      label: editLabel,

      items: [
        {
          node: <MenuItemTemplate icon={<PaintBucketIcon />} label={'Background colors'} hasChildMenu />,
          sections: [
            {
              label: 'Background colors',
              items: (Object.keys(backgroundColorMap) as TableditorColorName[]).map((colorName) => ({
                node: <MenuColorItemTemplate colorName={colorName} type={'background'} />,
                onEvent() {
                  onClickChangeBackgroundColor(backgroundColorMap[colorName]);
                },
              })),
            },
          ],
        },

        {
          node: <MenuItemTemplate icon={<PencilIcon />} label={'Font colors'} hasChildMenu />,
          sections: [
            {
              label: 'Font colors',
              items: (Object.keys(fontColorMap) as TableditorColorName[]).map((colorName) => ({
                node: <MenuColorItemTemplate colorName={colorName} type={'font'} />,
                onEvent() {
                  onClickChangeFontColor(fontColorMap[colorName]);
                },
              })),
            },
          ],
        },

        {
          node: <MenuItemTemplate icon={<EraserIcon />} label={'Clear content'} />,
          onEvent(e) {
            onClickClearContent();
            ref.current?.close(e);
          },
        },
      ],
    };
  };
}
