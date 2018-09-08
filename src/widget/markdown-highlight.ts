import { Editor } from "codemirror";
import { allowBreakMark } from "./utils";

export function MarkdownHighlight(editor: Editor, line): void {
  const highlightRegex = /\[mark\](.+?)\[endmark\]/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = line.lineNo();
  if (!line.text.match(highlightRegex)) {
    return;
  }
  let match = null;
  while ((match = highlightRegex.exec(line.text))) {
    if (
      match &&
      (cursor.ch < match.index ||
        cursor.ch > match.index + match[0].length ||
        cursor.line !== lineNo)
    ) {
      const range = {
        from: match.index,
        to: match.index + match[0].length
      };
      const span = document.createElement("span");
      span.className = `cm-mark`;
      span.innerText = match[1];
      allowBreakMark(editor, lineNo, range, span, 6);
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}
