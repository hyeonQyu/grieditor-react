/** @jsxImportSource @emotion/react */
import { TableExtenderProps } from '@lib/components/tableditor/components/tableExtender/index';
import { TableditorStyle } from '@lib/components/tableditor/styles';

export interface TableRowAddExtenderProps extends TableExtenderProps {}

export function TableRowAddExtender(props: TableRowAddExtenderProps) {
  const { rowAddExtender, onClick } = props;

  return (
    <button
      onClick={onClick}
      css={[TableditorStyle.extender(rowAddExtender.visible), TableditorStyle.rowAddExtender()]}
      style={{ ...rowAddExtender.size, bottom: 0 }}
    >
      +
    </button>
  );
}
