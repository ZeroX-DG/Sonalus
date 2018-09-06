import { Editor } from "codemirror";

export function MarkdownTextEffect(editor: Editor, line): void {
  const strikethroughRegex = /~~(.*?)~~/;
  const boldRegex = /\*\*(.*?)\*\*/;
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  let match = null;
  let effectType = "strikethrough";
  if (line.text.match(strikethroughRegex)) {
    match = line.text.match(strikethroughRegex);
    effectType = "strikethrough";
  } else if (line.text.match(boldRegex)) {
    match = line.text.match(boldRegex);
    effectType = "strong";
  }
  if (
    match &&
    line.text[match.index] !== "!" &&
    (cursor.ch < match.index || cursor.ch > match.index + match[0].length)
  ) {
    const range = {
      from: match.index,
      to: match.index + match[0].length
    };
    const span = document.createElement("span");
    span.className = `cm-${effectType}`;
    span.innerText = match[1];
    const lineNo = line.lineNo();
    doc.markText(
      { line: lineNo, ch: range.from },
      { line: lineNo, ch: range.to },
      { replacedWith: span, clearOnEnter: true }
    );
  }
}
