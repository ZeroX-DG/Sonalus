import { Sonalus } from "..";

export function initActions(Sonalus) {
  Sonalus.prototype.setFontSize = function(size) {
    const editor = <CodeMirror.Editor>this.editor;
    const element = editor.getWrapperElement();
    element.style.fontSize = `${size}px`;
    element.style.lineHeight = "1.5em";
    editor.refresh();
  };
}
