import { MenuSectionProps } from '@components/menu/components/menuSection';
import { MenuColorItemTemplate, MenuItemTemplate } from '@components/tableditor/components/menu/itemTemplate';
import { ArrowIcon, EraserIcon, HorizontalIcon, PaintBucketIcon, PencilIcon, VerticalIcon } from '@icons/index';
import { backgroundColorMap, fontColorMap, RowColumn, TableditorColorName } from '@components/tableditor/defines';
import { RefObject } from 'react';
import { MenuRef } from '@components/menu/defines';
import { useCellContext } from '@components/tableditor/components/cell/contexts/CellContext';

export interface UseCellMenuParams {
  ref: RefObject<MenuRef>;
}

export interface UseCellMenu {
  menuSections: MenuSectionProps[];
}

export function useCellMenu(params: UseCellMenuParams): UseCellMenu {
  const { ref } = params;
  const {
    row,
    column,
    rowMenuRef,
    onClickCellMenuChangeBackgroundColor,
    onClickCellMenuChangeFontColor,
    onClickCellMenuClearContent,
    onClickCellMenuAddRowAbove,
    onClickCellMenuAddRowBelow,
    onClickCellMenuAddColumnLeft,
    onClickCellMenuAddColumnRight,
    onClickCellMenuSelectRow,
    onClickCellMenuSelectColumn,
  } = useCellContext();
  const rowColumn: RowColumn = { row, column };

  const menuSections: MenuSectionProps[] = [
    {
      label: 'Edit cell',
      items: [
        {
          node: <MenuItemTemplate icon={<PaintBucketIcon />} label={'Background colors'} hasChildMenu />,
          sections: [
            {
              label: 'Background colors',
              items: (Object.keys(backgroundColorMap) as TableditorColorName[]).map((colorName) => ({
                node: <MenuColorItemTemplate colorName={colorName} type={'background'} />,
                onEvent() {
                  onClickCellMenuChangeBackgroundColor({ rowColumn, color: backgroundColorMap[colorName] });
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
                  onClickCellMenuChangeFontColor({ rowColumn, color: fontColorMap[colorName] });
                },
              })),
            },
          ],
        },
        {
          node: <MenuItemTemplate icon={<EraserIcon />} label={'Clear content'} />,
          onEvent(e) {
            onClickCellMenuClearContent({ rowColumn });
            ref.current?.close(e);
          },
        },
      ],
    },
    {
      label: 'Edit table',
      items: [
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'up'} />} label={'Add row above'} />,
          onEvent(e) {
            onClickCellMenuAddRowAbove({ rowColumn });
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'down'} />} label={'Add row below'} />,
          onEvent(e) {
            onClickCellMenuAddRowBelow({ rowColumn });
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'left'} />} label={'Add column to left'} />,
          onEvent(e) {
            onClickCellMenuAddColumnLeft({ rowColumn });
            ref.current?.close(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<ArrowIcon direction={'right'} />} label={'Add column to right'} />,
          onEvent(e) {
            onClickCellMenuAddColumnRight({ rowColumn });
            ref.current?.close(e);
          },
        },
      ],
    },
    {
      label: 'Select',
      items: [
        {
          node: <MenuItemTemplate icon={<HorizontalIcon />} label={'Select row'} />,
          onEvent(e) {
            onClickCellMenuSelectRow({ rowColumn });
            ref.current?.close(e);
            rowMenuRef.current?.open(e);
          },
        },
        {
          node: <MenuItemTemplate icon={<VerticalIcon />} label={'Select column'} />,
          onEvent(e) {
            onClickCellMenuSelectColumn({ rowColumn });
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
