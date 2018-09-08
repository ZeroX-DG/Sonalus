import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownHighlight(editor: Editor, line): void {
  const highlightRegex = /\<mark\>(.+?)\<\/mark\>/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: highlightRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 6
    },
    (match): HTMLElement => {
      const span = document.createElement("span");
      span.className = `cm-mark`;
      span.innerText = match[1];
      return span;
    }
  );
}
