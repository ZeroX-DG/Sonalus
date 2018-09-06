import { Editor } from "codemirror";

export function MarkdownItalic(editor: Editor, line): void {
  const italicRegex = /\*(.+?)\*/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  if (!line.text.match(italicRegex)) {
    return;
  }
  let match = null;
  while ((match = italicRegex.exec(line.text))) {
    if (
      match &&
      (cursor.ch < match.index || cursor.ch > match.index + match[0].length) &&
      line.text[match.index - 1] !== "*" &&
      line.text[match.index + match[0].length] !== "*"
    ) {
      const range = {
        from: match.index,
        to: match.index + match[0].length
      };
      const span = document.createElement("span");
      span.className = `cm-em`;
      span.innerText = match[1];
      const lineNo = line.lineNo();
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}