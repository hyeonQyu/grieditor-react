/** @jsxImportSource @emotion/react */
import { TableExtenderProps } from '@components/tableditor/components/tableExtender/TableExtender';
import { TableditorStyle } from '@components/tableditor/styles';
import { TABLE_EXTENDER_MARGIN } from '@components/tableditor/defines';

export interface TableColumnAddExtenderProps extends TableExtenderProps {}

export function TableColumnAddExtender(props: TableColumnAddExtenderProps) {
  const { rowAddExtender, columnAddExtender, onClick } = props;

  return (
    <button
      onClick={onClick}
      css={[TableditorStyle.extender(columnAddExtender.visible), TableditorStyle.columnAddExtender()]}
      style={{ ...columnAddExtender.size, left: rowAddExtender.size.width + TABLE_EXTENDER_MARGIN }}
    >
      +
    </button>
  );
}
