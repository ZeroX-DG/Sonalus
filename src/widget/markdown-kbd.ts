import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownKBD(editor: Editor, line): void {
  const kbdRegex = /\<kbd\>(\w+?)\<\/kbd\>/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: kbdRegex,
      matchMany: true,
      allowBreak: true,
      breakOffset: 5
    },
    (match): HTMLElement => {
      const span = document.createElement("kbd");
      span.innerText = match[1] || match[2];
      return span;
    }
  );
}
