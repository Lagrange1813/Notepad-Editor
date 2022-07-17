/// <reference types="./types" />
declare class Undo {
    private stackSize;
    private dmp;
    private ir;
    private sv;
    constructor();
    clearStack(vditor: LGEditor): void;
    resetIcon(vditor: LGEditor): void;
    undo(vditor: LGEditor): void;
    redo(vditor: LGEditor): void;
    recordFirstPosition(vditor: LGEditor, event: KeyboardEvent): void;
    addToUndoStack(vditor: LGEditor): void;
    private renderDiff;
    private resetStack;
    private addCaret;
}
export { Undo };
