/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { TableditorMenuStyle } from '@components/tableditor/components/menu/styles';
import { ChevronIcon } from '@icons/ChevronIcon';
import { Color } from '@defines/constants';

export interface MenuItemTemplateProps {
  icon: ReactNode;
  label: string;
  hasChildMenu?: boolean;
}

export function MenuItemTemplate(props: MenuItemTemplateProps) {
  const { icon, label, hasChildMenu } = props;

  return (
    <div css={TableditorMenuStyle.itemTemplate()}>
      <div className={'icon-container'}>{icon}</div>
      <div className={'label'}>{label}</div>
      <div className={'more'}>{hasChildMenu && <ChevronIcon direction={'right'} color={Color.GRAY_6} />}</div>
    </div>
  );
}
