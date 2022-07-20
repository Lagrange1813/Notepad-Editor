import {setEditorMode} from "./setEditorMode";
import {getMarkdown} from "../markdown/getMarkdown";
import {insertTable} from "./insertTable";

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

  public blur() {
    this.neditor.toolbar.element.querySelectorAll(".vditor-hint").forEach((item: HTMLElement) => {
      item.style.display = "none";
    });

    if (this.neditor.toolbar.elements.emoji) {
      (this.neditor.toolbar.elements.emoji.lastElementChild as HTMLElement).style.display = "none";
    }

    this.neditor.hint.element.style.display = "none";
    this.neditor.wysiwyg.popover.style.display = "none";
  }

  public insertTable() {
    insertTable(this.neditor);
    (window as any).webkit.messageHandlers.disableBarButtons.postMessage(["table"])
  }

  public syncHeight() {
    (window as any).webkit.messageHandlers.sizeNotification.postMessage(document.body.scrollHeight);
  }
}
