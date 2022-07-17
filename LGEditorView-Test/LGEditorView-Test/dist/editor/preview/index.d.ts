/// <reference types="./types" />
export declare class Preview {
    element: HTMLElement;
    private mdTimeoutId;
    constructor(vditor: LGEditor);
    render(vditor: LGEditor, value?: string): void;
    private afterRender;
    private copyToX;
}
