import { Editor } from "codemirror";
import { allowBreakMark } from "./utils";

export function MarkdownBoldItalic(editor: Editor, line): void {
  const boldItalicRegex = /(?<!\*)\*\*\*(?!\*)(.+?)(?<!\*)\*\*\*(?!\*)/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  if (!line.text.match(boldItalicRegex)) {
    return;
  }
  let match = null;
  while ((match = boldItalicRegex.exec(line.text))) {
    if (
      match &&
      (cursor.ch < match.index || cursor.ch > match.index + match[0].length)
    ) {
      const range = {
        from: match.index,
        to: match.index + match[0].length
      };
      const span = document.createElement("span");
      span.className = `cm-strong cm-em`;
      span.innerText = match[1];
      const lineNo = line.lineNo();
      allowBreakMark(editor, lineNo, range, span, 3);
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}
