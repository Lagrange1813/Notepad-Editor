/// <reference types="./types" />
declare class IR {
    range: Range;
    element: HTMLPreElement;
    processTimeoutId: number;
    hlToolbarTimeoutId: number;
    composingLock: boolean;
    preventInput: boolean;
    constructor(vditor: LGEditor);
    private copy;
    private bindEvent;
}
export { IR };
