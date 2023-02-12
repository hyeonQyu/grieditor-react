import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { MenuSectionProps } from '@components/menu/components/menuSection';
import { MenuColorItemTemplate, MenuItemTemplate } from '@components/tableditor/components/menu/itemTemplate';
import { PaintBucketIcon } from '@icons/PaintBucketIcon';
import { backgroundColorMap, fontColorMap, TableditorColorName } from '@components/tableditor/defines';
import { PencilIcon } from '@icons/PencilIcon';
import { EraserIcon } from '@icons/EraserIcon';

export interface UseColumnMenuParams {
  ref: RefObject<MenuRef>;
}

export interface UseColumnMenu {
  menuSections: MenuSectionProps[];
}

export default function useColumnMenu(params: UseColumnMenuParams): UseColumnMenu {
  const { ref } = params;

  const menuSections: MenuSectionProps[] = [
    {
      label: 'Edit column',
      items: [
        {
          node: <MenuItemTemplate icon={<PaintBucketIcon />} label={'Background colors'} hasChildMenu />,
          sections: [
            {
              label: 'Background colors',
              items: (Object.keys(backgroundColorMap) as TableditorColorName[]).map((colorName) => ({
                node: <MenuColorItemTemplate colorName={colorName} type={'background'} />,
                onEvent() {},
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
                onEvent() {},
              })),
            },
          ],
        },
        {
          node: <MenuItemTemplate icon={<EraserIcon />} label={'Clear content'} />,
          onEvent(e) {
            ref.current?.close(e);
          },
        },
      ],
    },
  ];

  return {
    menuSections,
  };
}
