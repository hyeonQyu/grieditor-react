/** @jsxImportSource @emotion/react */
import { TableditorMenuStyle } from '@components/tableditor/components/menu/styles';
import { backgroundColorMap, colorMap, fontColorMap, TableditorColorName } from '@components/tableditor/defines';

export interface MenuColorItemTemplateProps {
  colorName: TableditorColorName;
  type: 'background' | 'font';
}

const colorMapByColorType = {
  background: backgroundColorMap,
  font: fontColorMap,
};

export function MenuColorItemTemplate(props: MenuColorItemTemplateProps) {
  const { colorName, type } = props;
  const colorKey = colorMapByColorType[type][colorName];
  const color = colorMap[colorKey];

  return (
    <div css={[TableditorMenuStyle.commonItemTemplate(), TableditorMenuStyle.colorItemTemplate(color)]}>
      <div className={'color-container'}>
        <div className={`color ${type}`}>T</div>
      </div>
      <div className={'label'}>{colorName}</div>
    </div>
  );
}
