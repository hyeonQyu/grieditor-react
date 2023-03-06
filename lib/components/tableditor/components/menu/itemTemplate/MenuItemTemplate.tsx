/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { TableditorMenuStyle } from '@lib/components/tableditor/components/menu/styles';
import { ChevronIcon } from '@lib/icons/ChevronIcon';
import { Color } from '@lib/defines/constants';

export interface MenuItemTemplateProps {
  icon: ReactNode;
  label: string;
  hasChildMenu?: boolean;
}

export function MenuItemTemplate(props: MenuItemTemplateProps) {
  const { icon, label, hasChildMenu } = props;

  return (
    <div css={[TableditorMenuStyle.commonItemTemplate(), TableditorMenuStyle.itemTemplate()]}>
      <div>{icon}</div>
      <div className={'label'}>{label}</div>
      <div>{hasChildMenu && <ChevronIcon direction={'right'} color={Color.GRAY_6} />}</div>
    </div>
  );
}
