import { Editor } from "codemirror";

export function MarkdownLink(editor: Editor, line): boolean {
  const imageRegex = /\[(.*?)\]\((.*?)\)/;
  const match = line.text.match(imageRegex);
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  console.log(line.text);
  if (
    match &&
    line.text[match.index] !== "!" &&
    (cursor.ch < match.index || cursor.ch > match.index + match[0].length)
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
    const lineNo = line.lineNo();
    doc.markText(
      { line: lineNo, ch: range.from },
      { line: lineNo, ch: range.to },
      { replacedWith: link, clearOnEnter: true }
    );
    return true;
  }
}
