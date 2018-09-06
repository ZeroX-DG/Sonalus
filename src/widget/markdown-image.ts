import { Editor } from "codemirror";

export function MarkdownImage(editor: Editor, line): void {
  const imageRegex = /^!\[(.*?)\]\((.*?)\)$/;
  const match = line.text.match(imageRegex);
  if (match) {
    const image = document.createElement("img");
    image.className = "markdown-image";
    image.src = match[2];
    (<any>editor).widgets.push(editor.addLineWidget(line, image));
  }
}
