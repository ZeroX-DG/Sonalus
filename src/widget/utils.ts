export function getCaretPos(el: HTMLElement): number {
  if (window.getSelection) {
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode === el) {
        return range.endOffset;
      }
    }
  }
  return 0;
}
