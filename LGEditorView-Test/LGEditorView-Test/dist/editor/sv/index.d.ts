/// <reference types="./types" />
declare class Editor {
    range: Range;
    element: HTMLPreElement;
    composingLock: boolean;
    processTimeoutId: number;
    hlToolbarTimeoutId: number;
    preventInput: boolean;
    constructor(vditor: LGEditor);
    private copy;
    private bindEvent;
}
export { Editor };
