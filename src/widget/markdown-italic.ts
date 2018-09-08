import { Editor } from "codemirror";
import { getCaretPos } from "./utils";

export function MarkdownItalic(editor: Editor, line): void {
  const italicRegex = /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!\_)\_(?!\_)(.+?)(?<!\_)\_(?!\_)/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  if (!line.text.match(italicRegex)) {
    return;
  }
  let match = null;
  while ((match = italicRegex.exec(line.text))) {
    if (
      match &&
      (cursor.ch < match.index || cursor.ch > match.index + match[0].length)
    ) {
      const range = {
        from: match.index,
        to: match.index + match[0].length
      };
      const span = document.createElement("span");
      span.className = `cm-em`;
      span.contentEditable = "true"; // allow us to find caret position
      span.onclick = () => {
        const caretPos = getCaretPos(span) + 2; // 2 is the generated *
        doc.setCursor({ line: lineNo, ch: caretPos });
        editor.focus();
      };
      span.innerText = match[1] || match[2];
      const lineNo = line.lineNo();
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}
