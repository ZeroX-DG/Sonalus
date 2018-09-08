import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownImage(editor: Editor, line): void {
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: imageRegex,
      matchMany: true,
      allowBreak: false
    },
    (match): HTMLElement => {
      const img = document.createElement("img");
      img.src = match[2];
      return img;
    }
  );
}
