import * as CodeMirror from "codemirror";
import { initWidget } from "./widget";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import "./styles/widget.sass";
import "./styles/lineClass.sass";
import { initActions } from "./actions";

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
      mode: "gfm"
    });

    this.editor.setSize("100%", "100%");
    (<any>this.editor).widgets = [];
    this.editor.on("change", () => {
      this.editor.operation(() => {
        (<any>this.editor).widgets.forEach(widget => {
          widget.clear();
        });
        initWidget(this.editor);
      });
    });

    this.editor.on("renderLine", (cm, line: LineHandle, elt) => {
      const imageRegex = /!\[(.*?)\]\((.*?)\)/;
      if (line.text.match(imageRegex)) {
        elt.classList.add("cm-image-url");
      }
    });
  }
}

initActions(Sonalus);
