/** @jsxImportSource @emotion/react */
import { TableExtenderProps } from '@components/tableditor/components/tableExtender/TableExtender';
import { TableditorStyle } from '@components/tableditor/styles';

export interface TableColumnAddExtenderProps extends TableExtenderProps {}

export function TableColumnAddExtender(props: TableColumnAddExtenderProps) {
  const { rowAddExtender, columnAddExtender } = props;

  return (
    <button
      css={[TableditorStyle.extender(columnAddExtender.visible), TableditorStyle.columnAddExtender()]}
      style={{ ...columnAddExtender.size, left: rowAddExtender.size.width }}
    >
      +
    </button>
  );
}
