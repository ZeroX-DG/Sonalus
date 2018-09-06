import { Editor } from "codemirror";
import { MarkdownImage } from "./markdown-image";
import { MarkdownEmoji } from "./markdown-emoji";

export function initWidget(editor: Editor): void {
  const doc = editor.getDoc();
  doc.eachLine(line => {
    if (MarkdownImage(editor, line)) {
      return;
    } else if (MarkdownEmoji(doc, line)) {
      return;
    }
  });
}
