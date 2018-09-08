import { Editor } from "codemirror";

export function MarkdownStrikethrough(editor: Editor, line): void {
  const strikethroughRegex = /~~(.*?)~~/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = line.lineNo();
  if (!line.text.match(strikethroughRegex)) {
    return;
  }
  let match = null;
  while ((match = strikethroughRegex.exec(line.text))) {
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
      span.className = `cm-strikethrough`;
      span.innerText = match[1];
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: span, clearOnEnter: true }
      );
    }
  }
}
