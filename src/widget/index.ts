import { Editor } from "codemirror";
import { MarkdownImage } from "./markdown-image";
import { MarkdownEmoji } from "./markdown-emoji";
import { MarkdownLink } from "./markdown-link";
import { MarkdownStrikethrough } from "./markdown-strikethrough";
import { MarkdownItalic } from "./markdown-italic";
import { MarkdownBold } from "./markdown-bold";
import { MarkdownBoldItalic } from "./markdown-bold-italic";
import { MarkdownCheckbox } from "./markdown-checkbox";
import { MarkdownInlineCode } from "./markdown-inlinecode";
import { MarkdownHighlight } from "./markdown-highlight";

export function initWidget(editor: Editor): void {
  const doc = editor.getDoc();
  doc.eachLine(line => {
    MarkdownImage(editor, line);
    MarkdownEmoji(editor, line);
    MarkdownLink(editor, line);
    MarkdownStrikethrough(editor, line);
    MarkdownBoldItalic(editor, line);
    MarkdownBold(editor, line);
    MarkdownItalic(editor, line);
    MarkdownCheckbox(editor, line);
    MarkdownInlineCode(editor, line);
    MarkdownHighlight(editor, line);
  });
}
