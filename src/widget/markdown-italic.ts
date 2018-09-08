import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownItalic(editor: Editor, line): void {
  const italicRegex = /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!\_)\_(?!\_)(.+?)(?<!\_)\_(?!\_)/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: italicRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 1
    },
    (match): HTMLElement => {
      const span = document.createElement("span");
      span.className = `cm-em`;
      span.innerText = match[1] || match[2];
      return span;
    }
  );
}
