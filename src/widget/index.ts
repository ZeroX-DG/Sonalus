import { Editor } from "codemirror";
import { MarkdownImage } from "./markdown-image";
import { MarkdownEmoji } from "./markdown-emoji";
import { MarkdownLink } from "./markdown-link";

export function initWidget(editor: Editor): void {
  const doc = editor.getDoc();
  doc.eachLine(line => {
    MarkdownImage(editor, line);
    MarkdownEmoji(doc, line);
    MarkdownLink(editor, line);
  });
}
