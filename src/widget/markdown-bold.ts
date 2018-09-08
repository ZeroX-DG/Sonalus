import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownBold(editor: Editor, line): void {
  const boldRegex = /(?<!\*)\*\*(?!\*)(.+?)(?<!\*)\*\*(?!\*)|(?<!\_)\_\_(?!\_)(.+?)(?<!\_)\_\_(?!\_)/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: boldRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 2
    },
    (match): HTMLElement => {
      const span = document.createElement("span");
      span.className = `cm-strong`;
      span.innerText = match[1] || match[2];
      return span;
    }
  );
}
