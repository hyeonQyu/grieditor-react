/** @jsxImportSource @emotion/react */
import { MenuItem, MenuItemProps } from '@lib/components/menu/components/menuItem';
import { MenuStyle } from '@lib/components/menu/styles';

export interface MenuSectionProps {
  label?: string;
  items: MenuItemProps[];
}

export function MenuSection(props: MenuSectionProps) {
  const { label, items } = props;

  return (
    <li css={MenuStyle.section()}>
      <ul>
        {label && <div className={'label'}>{label}</div>}
        {items.map((item, i) => (
          <MenuItem key={i} {...item} />
        ))}
      </ul>
    </li>
  );
}
