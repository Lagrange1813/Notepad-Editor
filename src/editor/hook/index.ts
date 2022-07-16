import { setEditorMode } from "./setEditorMode";

export class Hook {
  private neditor: LGEditor;

  constructor(neditor: LGEditor) {
    this.neditor = neditor;
  }

  public setEditorMode(type: string) {
    setEditorMode(this.neditor, type);
  }
}
