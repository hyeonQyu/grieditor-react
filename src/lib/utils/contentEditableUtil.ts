export namespace ContentEditableUtil {
  /**
   * Check the caret is positioned at the far right of the cell
   */
  export function getIsMovableToRight() {
    const selection = window.getSelection();
    const length = selection?.focusNode?.textContent?.length ?? 0;
    const offset = selection?.focusOffset;
    return length === offset;
  }

  /**
   * Check the caret is positioned at the far left of the cell
   */
  export function getIsMovableToLeft() {
    const selection = window.getSelection();
    const offset = selection?.focusOffset;
    return offset === 0;
  }
}
