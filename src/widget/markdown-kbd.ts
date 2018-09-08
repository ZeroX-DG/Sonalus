import { Editor } from "codemirror";
import { allowBreakMark } from "./utils";

export function MarkdownKBD(editor: Editor, line): void {
  const kbdRegex = /\<kbd\>(\w+?)\<\/kbd\>/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = line.lineNo();
  if (!line.text.match(kbdRegex)) {
    return;
  }
  let match = null;
  while ((match = kbdRegex.exec(line.text))) {
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
      const span = document.createElement("kbd");
      span.innerText = match[1] || match[2];
      allowBreakMark(editor, lineNo, range, span, 5);
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}
