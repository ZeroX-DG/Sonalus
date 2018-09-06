import * as emojiList from "emojis-list";
import * as emojiKeywords from "emojis-keywords";

export function MarkdownEmoji(editor: CodeMirror.Editor, line): void {
  const emojiRegex = /:([A-Za-z]*?):/g;
  const doc = editor.getDoc();
  if (line.text.match(emojiRegex)) {
    let match;
    while ((match = emojiRegex.exec(line.text))) {
      const lineNo = line.lineNo();
      const char = match.index;
      const emojiSpan = document.createElement("span");
      const emojiIndex = emojiKeywords.indexOf(match[0]);
      if (emojiIndex !== -1) {
        const emojiChar = emojiList[emojiIndex];
        emojiSpan.innerText = emojiChar;
        doc.markText(
          { line: lineNo, ch: char },
          { line: lineNo, ch: char + match[0].length },
          { replacedWith: emojiSpan }
        );
      }
    }
  }
}
