import { CaretPosition } from '@constants/types';
import { StringUtil } from '@utils/stringUtil';

export namespace ContentEditableUtil {
  /**
   * Check the caret is positioned at the far right of the cell
   */
  export function getIsMovableToRight(): boolean {
    const selection = window.getSelection();
    const length = selection?.focusNode?.textContent?.length ?? 0;
    const offset = selection?.focusOffset;
    return length === offset;
  }

  /**
   * Check the caret is positioned at the far left of the cell
   */
  export function getIsMovableToLeft(): boolean {
    const selection = window.getSelection();
    const offset = selection?.focusOffset;
    return offset === 0;
  }

  /**
   * Check the caret is positioned at the first line of the cell
   */
  export function getIsMovableToUp() {
    const selection = window.getSelection();
    const currentOffset = selection!.focusOffset;
    const content = selection!.focusNode!.textContent!;

    const line = getContentOffsetLine(currentOffset, content);
    return line === 0;
  }

  /**
   * Check the caret is positioned at the last line of the cell
   */
  export function getIsMovableToDown() {
    const selection = window.getSelection();
    const currentOffset = selection!.focusOffset;
    const content = selection!.focusNode!.textContent!;

    const line = getContentOffsetLine(currentOffset, content);
    return line === content.split('\n').length - 1;
  }

  /**
   * Insert newline character ('\n') to content
   * @param content
   */
  export function insertNewlineToContent(content: string): string {
    const offset = window.getSelection()?.focusOffset ?? 0;
    return StringUtil.insertAt(content, '\n', offset);
  }

  /**
   * Move the position of caret by direction
   * @param node
   * @param direction
   */
  export function moveCaret(node: Node, direction?: CaretPosition) {
    switch (direction) {
      case 'head':
        moveCaretToHead(node);
        break;

      case 'tail':
        moveCaretToTail(node);
        break;
    }
  }

  /**
   * Move the caret to first offset of the node
   * @param node
   */
  function moveCaretToHead(node: Node) {
    const selection = window.getSelection();
    selection?.setBaseAndExtent(node, 0, node, 0);
  }

  /**
   * Move the caret to last offset of the node
   * @param node
   */
  function moveCaretToTail(node: Node) {
    const selection = window.getSelection();
    const newRange = document.createRange();
    newRange.selectNodeContents(node);
    newRange.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
    selection?.collapseToEnd();
  }

  /**
   * Get the line number from the position of offset in the content
   * @param offset
   * @param content
   * @private
   */
  function getContentOffsetLine(offset: number, content: string): number {
    const splitByNewlineContents: string[] = content.split('\n');
    const length = splitByNewlineContents.length;

    let acc = 0;
    for (let i = 0; i < splitByNewlineContents.length; i++) {
      const subContent = splitByNewlineContents[i];
      acc += subContent.length + 1;
      if (acc > offset) {
        return i;
      }
    }

    return length - 1;
  }
}
