import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownStrikethrough(editor: Editor, line): void {
  const strikethroughRegex = /~~(.*?)~~/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: strikethroughRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 2
    },
    (match): HTMLElement => {
      const span = document.createElement("span");
      span.className = `cm-strikethrough`;
      span.innerText = match[1];
      return span;
    }
  );
}
