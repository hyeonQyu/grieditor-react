/** @jsxImportSource @emotion/react */
import { TableditorMenuStyle } from '@components/tableditor/components/menu/styles';
import { BACKGROUND_COLOR_MAP, COLOR_MAP, FONT_COLOR_MAP, TableditorColorName } from '@components/tableditor/defines';

export interface MenuColorItemTemplateProps {
  colorName: TableditorColorName;
  type: 'background' | 'font';
}

const colorMap = {
  background: BACKGROUND_COLOR_MAP,
  font: FONT_COLOR_MAP,
};

export function MenuColorItemTemplate(props: MenuColorItemTemplateProps) {
  const { colorName, type } = props;
  const colorKey = colorMap[type][colorName];
  const color = COLOR_MAP[colorKey];

  return (
    <div css={[TableditorMenuStyle.commonItemTemplate(), TableditorMenuStyle.colorItemTemplate(color)]}>
      <div className={'color-container'}>
        <div className={`color ${type}`}>T</div>
      </div>
      <div className={'label'}>{colorName}</div>
    </div>
  );
}
