import { Editor } from "codemirror";

export function MarkdownCheckbox(editor: Editor, line): void {
  const checkboxRegex = /\-\s\[(x| )?\]\s/;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  if (!line.text.match(checkboxRegex)) {
    return;
  }
  let match = checkboxRegex.exec(line.text);
  if (
    match &&
    (cursor.ch < match.index || cursor.ch > match.index + match[0].length)
  ) {
    const range = {
      from: match.index,
      to: match.index + match[0].length
    };
    const checkbox = document.createElement("input");
    checkbox.className = "markdown-checkbox";
    checkbox.type = "checkbox";
    if (match[1] === "x") {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    const lineNo = line.lineNo();
    doc.markText(
      { line: lineNo, ch: range.from },
      { line: lineNo, ch: range.to },
      { replacedWith: checkbox, clearOnEnter: true }
    );
  }
}
