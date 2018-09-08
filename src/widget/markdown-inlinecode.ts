import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownInlineCode(editor: Editor, line): void {
  const codeRegex = /(?<!\`)`(?!\`)(.+?)(?<!\`)`(?!\`)/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: codeRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 1
    },
    (match): HTMLElement => {
      const span = document.createElement("span");
      span.className = `inline-code`;
      span.innerText = match[1];
      return span;
    }
  );
}
