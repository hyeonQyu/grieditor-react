import { TableExtender } from '@lib/components/tableditor/defines';
import { MouseEventHandler } from 'react';

export interface TableExtenderProps {
  rowAddExtender: TableExtender;
  columnAddExtender: TableExtender;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
