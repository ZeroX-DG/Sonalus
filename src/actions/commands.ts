export function commands(Sonalus) {
  Sonalus.prototype.execTextCommand = function(command, args) {
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
      case "code":
        doc.replaceSelection(`\`${selection}\``);
        break;
      case "link":
        doc.replaceSelection(`[${args}](${selection})`);
        break;
      case "header":
        doc.replaceSelection(`${"#".repeat(args)}${selection}`);
        break;
      case "linethrough":
        doc.replaceSelection(`~~${selection}~~`);
        break;
    }
  };
}
