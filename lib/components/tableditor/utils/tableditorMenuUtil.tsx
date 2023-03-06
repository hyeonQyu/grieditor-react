import { MenuSectionProps } from '@lib/components/menu/components/menuSection';
import { CustomEventHandler } from '@lib/defines/types';
import { backgroundColorMap, fontColorMap, TableditorColor, TableditorColorName } from '@lib/components/tableditor/defines';
import { MenuColorItemTemplate, MenuItemTemplate } from '@lib/components/tableditor/components/menu/itemTemplate';
import { PaintBucketIcon } from '@lib/icons/PaintBucketIcon';
import { PencilIcon } from '@lib/icons/PencilIcon';
import { EraserIcon } from '@lib/icons/EraserIcon';
import { RefObject } from 'react';
import { MenuRef } from '@lib/components/menu/defines';

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
