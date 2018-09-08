import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownLink(editor: Editor, line): void {
  const linkRegex = /(?<!\!)\[(.*?)\]\((.*?)\)/g;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: linkRegex,
      matchMany: true,
      allowBreak: false
    },
    (match): HTMLElement => {
      const link = document.createElement("a");
      const span = document.createElement("span");
      span.className = "link-icon";
      span.innerText = "🔗";
      link.appendChild(span);
      link.appendChild(document.createTextNode(match[1]));
      link.href = match[2];
      link.className = "link-button";
      return link;
    }
  );
}
