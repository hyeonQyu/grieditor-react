/** @jsxImportSource @emotion/react */
import { MenuItem, MenuItemProps } from '@components/menu/components/menuItem';

export interface MenuSectionProps {
  label?: string;
  items: MenuItemProps[];
}

export function MenuSection(props: MenuSectionProps) {
  const { label, items } = props;

  return (
    <li>
      <ul>
        {items.map((item, i) => (
          <MenuItem key={i} {...item} />
        ))}
      </ul>
    </li>
  );
}
