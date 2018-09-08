import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownBoldItalic(editor: Editor, line): void {
  const boldItalicRegex = /(?<!\*)\*\*\*(?!\*)(.+?)(?<!\*)\*\*\*(?!\*)/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: boldItalicRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 3
    },
    (match): HTMLElement => {
      const span = document.createElement("span");
      span.className = `cm-strong cm-em`;
      span.innerText = match[1];
      return span;
    }
  );
}
