import { Editor } from "codemirror";
import { MarkdownImage } from "./markdown-image";
import { MarkdownEmoji } from "./markdown-emoji";
import { MarkdownLink } from "./markdown-link";
import { MarkdownStrikethrough } from "./markdown-strikethrough";

export function initWidget(editor: Editor): void {
  const doc = editor.getDoc();
  doc.eachLine(line => {
    MarkdownImage(editor, line);
    MarkdownEmoji(editor, line);
    MarkdownLink(editor, line);
    MarkdownStrikethrough(editor, line);
  });
}
