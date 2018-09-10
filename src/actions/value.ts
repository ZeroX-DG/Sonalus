export function value(Sonalus) {
  Sonalus.prototype.setValue = function(value: string) {
    const editor = <CodeMirror.Editor>this.editor;
    editor.setValue(value);
  };

  Sonalus.prototype.getValue = function(value: string) {
    const editor = <CodeMirror.Editor>this.editor;
    return editor.getValue();
  };

  Sonalus.prototype.clear = function() {
    const editor = <CodeMirror.Editor>this.editor;
    editor.setValue('')
  }
}
