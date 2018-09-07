import * as CodeMirror from "codemirror";
import { initWidget } from "./widget";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/continuelist";
import "./styles/widget.sass";
import "./styles/lineClass.sass";
import { initActions } from "./actions";
import "./mode/sonalus";
import "codemirror/mode/javascript/javascript";

export class Sonalus {
  private root: HTMLElement = null;
  private options: Object = null;
  private editor: CodeMirror.Editor = null;

  constructor(element: HTMLElement, options: Object) {
    this.root = element;
    this.options = options;
    this.init();
  }

  init() {
    this.editor = CodeMirror(this.root, {
      mode: "sonalus",
      extraKeys: { Enter: "newlineAndIndentContinueMarkdownList" }
    });

    this.editor.setSize("100%", "100%");
    (<any>this.editor).widgets = [];

    this.editor.on("cursorActivity", () => {
      this.editor.operation(() => {
        initWidget(this.editor);
      });
    });

    this.editor.on("renderLine", (cm, line: LineHandle, elt) => {
      const imageRegex = /!\[(.*?)\]\((.*?)\)/;
      const listRegex = /-\s(.*?)/;
      if (line.text.match(imageRegex)) {
        elt.classList.add("cm-image-url");
      } else if (line.text.match(listRegex)) {
        elt.classList.add("cm-list-item");
      }
    });
  }
}

initActions(Sonalus);
