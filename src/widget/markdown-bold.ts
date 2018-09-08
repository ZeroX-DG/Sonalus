import { Editor } from "codemirror";
import { allowBreakMark } from "./utils";

export function MarkdownBold(editor: Editor, line): void {
  const boldRegex = /(?<!\*)\*\*(?!\*)(.+?)(?<!\*)\*\*(?!\*)|(?<!\_)\_\_(?!\_)(.+?)(?<!\_)\_\_(?!\_)/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = line.lineNo();
  if (!line.text.match(boldRegex)) {
    return;
  }
  let match = null;
  while ((match = boldRegex.exec(line.text))) {
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
      span.className = `cm-strong`;
      allowBreakMark(editor, lineNo, range, span, 2);
      span.innerText = match[1] || match[2];
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}
