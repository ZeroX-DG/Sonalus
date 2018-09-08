import * as CodeMirror from "codemirror";
import "codemirror/mode/gfm/gfm";
import "codemirror/addon/mode/overlay";

CodeMirror.defineMode("sonalus", function(config, parserConfig) {
  let codeDepth = 0;
  const overlay = {
    token: function(stream: CodeMirror.StringStream, state) {
      if (stream.sol()) {
        if (stream.peek() === ">") {
          stream.skipToEnd();
          return "line-quote";
        } else if (stream.next() === "-" && stream.peek() === " ") {
          stream.skipToEnd();
          return "list-item";
        }
      }
      stream.next();
      return null;
    }
  };
  return CodeMirror.overlayMode(
    CodeMirror.getMode(config, "text/x-gfm"),
    overlay
  );
});
