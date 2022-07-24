import {setEditorMode} from "./setEditorMode";
import {getMarkdown} from "../markdown/getMarkdown";
import {insertTable} from "./insertTable";
import {setTheme} from "../ui/setTheme";
import {setContentTheme} from "../ui/setContentTheme";
import {setCodeTheme} from "../ui/setCodeTheme";

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
    (window as any).webkit.messageHandlers.adjustHeight.postMessage(document.body.scrollHeight);
  }

  public setTheme(mode: string) {
    if (mode == 'dark') {
      this.neditor.options.theme = "dark";
      setTheme(this.neditor);
      this.neditor.options.preview.theme.current = "dark";
      setContentTheme("dark", this.neditor.options.preview.theme.path);
      this.neditor.options.preview.hljs.style = "solarized-dark256";
      setCodeTheme("solarized-dark256");
    }
    else if (mode == 'light') {
      this.neditor.options.theme = "classic";
      setTheme(this.neditor);
      this.neditor.options.preview.theme.current = "light";
      setContentTheme("light", this.neditor.options.preview.theme.path);
      this.neditor.options.preview.hljs.style = "github";
      setCodeTheme("github");
    }
  }

  public setBackground(color: string) {
    document.body.style.backgroundColor = color;
  }
}
