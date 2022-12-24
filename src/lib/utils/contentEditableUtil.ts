import { CaretPosition } from '@constants/types';

export namespace ContentEditableUtil {
  /**
   * Check the caret is positioned at the far right of the cell
   * @param element: the element which has the attribute contenteditable=true
   */
  export function getIsMovableToRight(element: HTMLElement): boolean {
    return getIsCaretAtEnd(element);
  }

  /**
   * Check the caret is positioned at the far left of the cell
   * @param element: the element which has the attribute contenteditable=true
   */
  export function getIsMovableToLeft(element: HTMLElement): boolean {
    return getIsCaretAtStart(element);
  }

  /**
   * Check the caret is positioned at the first line of the cell
   * @param element: the element which has the attribute contenteditable=true
   */
  export function getIsMovableToUp(element: HTMLElement): boolean {
    return getIsCaretOnFirstLine(element);
  }

  /**
   * Check the caret is positioned at the last line of the cell
   * @param element: the element which has the attribute contenteditable=true
   */
  export function getIsMovableToDown(element: HTMLElement) {
    return getIsCaretOnLastLine(element);
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
   * REFERENCE: https://gist.github.com/loilo/f873a88631e660c59a1d5ab757ca9b1e
   * LICENSE: https://gist.github.com/loilo/3860e53e4aa4010d36a4c08a3da67419
   */

  /**
   * Get the number of characters in an element
   */
  export function getTextLength(element: HTMLElement): number {
    const range = element.ownerDocument.createRange();
    range.selectNodeContents(element);

    return range.toString().length;
  }

  /**
   * Get the character offset the caret is currently at
   */
  export function getCaretOffset(element: HTMLElement): number {
    const selection = element.ownerDocument.defaultView?.getSelection();

    if (!selection || selection.rangeCount === 0) return 0;

    const range = element.ownerDocument.defaultView?.getSelection()?.getRangeAt(0);

    if (!range) return 0;

    const preCaretRange = range.cloneRange();

    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    return preCaretRange.toString().length;
  }

  /**
   * Check if the caret is at the start of an element
   * Returns `false` when the caret is part of a selection
   */
  export function getIsCaretAtStart(element: HTMLElement) {
    if (element.ownerDocument.activeElement !== element) return false;
    console.log(getCaretOffset(element), getTextLength(element));
    return getCaretOffset(element) === 0;
  }

  /**
   * Check if the caret is at the end of an element
   * Returns `false` when the caret is part of a selection
   */
  export function getIsCaretAtEnd(element: HTMLElement) {
    if (element.ownerDocument.activeElement !== element) return false;
    console.log(getCaretOffset(element), getTextLength(element));
    return getCaretOffset(element) === getTextLength(element);
  }

  /**
   * Check if the caret is on the first line of an element
   * Returns `false` when the caret is part of a selection
   */
  export function getIsCaretOnFirstLine(element: HTMLElement) {
    if (element.ownerDocument.activeElement !== element) return false;

    // Get the client rect of the current selection
    const selection = element.ownerDocument.defaultView?.getSelection();
    if (!selection || selection.rangeCount === 0) return false;

    const originalCaretRange = selection.getRangeAt(0);

    // Bail if there is text selected
    if (originalCaretRange.toString().length > 0) return false;

    const originalCaretRect = originalCaretRange.getBoundingClientRect();

    // Create a range at the end of the last text node
    let startOfElementRange = element.ownerDocument.createRange();
    startOfElementRange.selectNodeContents(element);

    // The endContainer might not be an actual text node,
    // try to find the last text node inside
    let startContainer = startOfElementRange.endContainer;
    let startOffset = 0;

    while (startContainer.hasChildNodes() && !(startContainer instanceof Text)) {
      if (!startContainer.firstChild) continue;

      startContainer = startContainer.firstChild;
    }

    startOfElementRange.setStart(startContainer, startOffset);
    startOfElementRange.setEnd(startContainer, startOffset);
    const endOfElementRect = startOfElementRange.getBoundingClientRect();

    return originalCaretRect.top === endOfElementRect.top;
  }

  /**
   * Check if the caret is on the last line of an element
   * Returns `false` when the caret is part of a selection
   */
  export function getIsCaretOnLastLine(element: HTMLElement) {
    if (element.ownerDocument.activeElement !== element) return false;

    // Get the client rect of the current selection
    const window = element.ownerDocument.defaultView;

    if (!window) return false;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return false;

    const originalCaretRange = selection.getRangeAt(0);

    // Bail if there is a selection
    if (originalCaretRange.toString().length > 0) return false;

    const originalCaretRect = originalCaretRange.getBoundingClientRect();

    // Create a range at the end of the last text node
    let endOfElementRange = document.createRange();
    endOfElementRange.selectNodeContents(element);

    // The endContainer might not be an actual text node,
    // try to find the last text node inside
    let endContainer = endOfElementRange.endContainer;
    let endOffset = 0;

    while (endContainer.hasChildNodes() && !(endContainer instanceof Text)) {
      if (!endContainer.lastChild) continue;

      endContainer = endContainer.lastChild;
      endOffset = (endContainer as Text).length ?? 0;
    }

    endOfElementRange.setEnd(endContainer, endOffset);
    endOfElementRange.setStart(endContainer, endOffset);
    const endOfElementRect = endOfElementRange.getBoundingClientRect();

    return originalCaretRect.bottom === endOfElementRect.bottom;
  }
}
