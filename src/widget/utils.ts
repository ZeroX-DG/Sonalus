import { Editor } from "codemirror";

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

export function allowBreakMark(
  editor: Editor,
  lineNo: number,
  range: any,
  el: HTMLElement,
  offset: number
) {
  const doc = editor.getDoc();
  el.contentEditable = "true"; // allow us to find caret position
  el.onclick = () => {
    const caretPos = getCaretPos(el) + offset;
    doc.setCursor({ line: lineNo, ch: range.from + caretPos });
    editor.focus();
  };
}
