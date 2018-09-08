import { Editor } from "codemirror";
import { WidgetCreator } from "./widget";

export function MarkdownCheckbox(editor: Editor, line): void {
  const checkboxRegex = /\-\s\[(x| )?\]\s/;
  const widgetCreator = new WidgetCreator(editor, line);
  widgetCreator.createWidget(
    {
      regex: checkboxRegex,
      matchMany: false,
      allowBreak: false
    },
    (match, range): HTMLElement => {
      const checkbox = document.createElement("input");
      const doc = editor.getDoc();
      const lineNo = line.lineNo();
      checkbox.className = "markdown-checkbox";
      checkbox.type = "checkbox";
      checkbox.onclick = () => {
        const nextState = checkbox.checked ? "x" : " ";
        doc.replaceRange(
          nextState,
          { line: lineNo, ch: range.from + 3 },
          { line: lineNo, ch: range.from + 4 }
        );
      };
      if (match[1] === "x") {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
      return checkbox;
    }
  );
}
