export function font(Sonalus) {
  Sonalus.prototype.setFontSize = function(size: number) {
    const editor = <CodeMirror.Editor>this.editor;
    const element = editor.getWrapperElement();
    element.style.fontSize = `${size}px`;
    element.style.lineHeight = "1.5em";
    editor.refresh();
  };

  Sonalus.prototype.setFontFamily = function(fontFamily: string) {
    const editor = <CodeMirror.Editor>this.editor;
    const element = editor.getWrapperElement();
    element.style.fontFamily = fontFamily;
    editor.refresh();
  };
}
