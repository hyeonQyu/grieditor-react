import { RenderingCellData } from '@components/tableditor/constants';
import { Direction } from '@constants/types';

export namespace TableditorUtil {
  export function getCellCaretOffsetFromDirection(cell: RenderingCellData, direction?: Direction): number {
    switch (direction) {
      case 'up':
      case 'left':
      case 'down':
        return cell.content.length;

      case 'right':
        return 0;

      default:
        return cell.caretOffset;
    }
  }
}
