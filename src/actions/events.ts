export function events(Sonalus) {
  Sonalus.prototype.onChange = function(fn) {
    const editor = <CodeMirror.Editor>this.editor;
    editor.on("change", fn);
  };
}
