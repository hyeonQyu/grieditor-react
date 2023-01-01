/** @jsxImportSource @emotion/react */
import { TableExtenderProps } from '@components/tableditor/components/tableExtender/TableExtender';
import { TableditorStyle } from '@components/tableditor/styles';

export interface TableRowAddExtenderProps extends TableExtenderProps {}

export function TableRowAddExtender(props: TableRowAddExtenderProps) {
  const { rowAddExtender } = props;

  return (
    <button css={[TableditorStyle.extender(rowAddExtender.visible), TableditorStyle.rowAddExtender()]} style={{ ...rowAddExtender.size, bottom: 0 }}>
      +
    </button>
  );
}
