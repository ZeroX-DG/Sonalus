export function commands(Sonalus) {
  Sonalus.prototype.execTextCommand = function(command) {
    const editor = <CodeMirror.Editor>this.editor;
    const doc = editor.getDoc();
    const selection = doc.getSelection();
    if (!selection) {
      return;
    }
    switch (command) {
      case "bold":
        doc.replaceSelection(`**${selection}**`);
        break;
      case "italic":
        doc.replaceSelection(`*${selection}*`);
        break;
    }
  };
}
