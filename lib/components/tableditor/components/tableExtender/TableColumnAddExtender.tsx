/** @jsxImportSource @emotion/react */
import { TableExtenderProps } from '@lib/components/tableditor/components/tableExtender/index';
import { TableditorStyle } from '@lib/components/tableditor/styles';
import { TABLE_EXTENDER_MARGIN } from '@lib/components/tableditor/defines';

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
