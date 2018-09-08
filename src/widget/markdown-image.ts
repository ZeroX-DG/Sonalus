import { Editor } from "codemirror";

export function MarkdownImage(editor: Editor, line): void {
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = line.lineNo();
  if (!line.text.match(imageRegex)) {
    return;
  }
  let match = null;
  while ((match = imageRegex.exec(line.text))) {
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
      const img = document.createElement("img");
      img.src = match[2];
      doc.markText(
        { line: lineNo, ch: range.from },
        { line: lineNo, ch: range.to },
        { replacedWith: img, clearOnEnter: true }
      );
    }
  }
}
