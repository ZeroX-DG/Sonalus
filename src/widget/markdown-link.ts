import { Editor } from "codemirror";

export function MarkdownLink(editor: Editor, line): void {
  const linkRegex = /\[(.*?)\]\((.*?)\)/;
  const match = line.text.match(linkRegex);
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const lineNo = line.lineNo();
  if (
    match &&
    line.text[match.index - 1] !== "!" &&
    (cursor.ch < match.index ||
      cursor.ch > match.index + match[0].length ||
      cursor.line !== lineNo)
  ) {
    const range = {
      from: match.index,
      to: match.index + match[0].length
    };
    const link = document.createElement("a");
    const span = document.createElement("span");
    span.className = "link-icon";
    span.innerText = "🔗";
    link.appendChild(span);
    link.appendChild(document.createTextNode(match[1]));
    link.href = match[2];
    link.className = "link-button";
    doc.markText(
      { line: lineNo, ch: range.from },
      { line: lineNo, ch: range.to },
      { replacedWith: link, clearOnEnter: true }
    );
  }
}
