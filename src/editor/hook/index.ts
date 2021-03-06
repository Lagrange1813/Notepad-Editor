import { setEditorMode } from "./setEditorMode";
import { getMarkdown } from "../markdown/getMarkdown";

export class Hook {
  private neditor: LGEditor;

  constructor(neditor: LGEditor) {
    this.neditor = neditor;
  }

  public setEditorMode(type: string) {
    setEditorMode(this.neditor, type);
  }

  public getText() {
    // (window as any).webkit.messageHandlers.getText.postMessage(getMarkdown(this.neditor))
    return getMarkdown(this.neditor);
  }


}
