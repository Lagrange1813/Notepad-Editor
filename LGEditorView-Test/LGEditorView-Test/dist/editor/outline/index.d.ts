/// <reference types="./types" />
export declare class Outline {
    element: HTMLElement;
    constructor(outlineLabel: string);
    render(vditor: LGEditor): string;
    toggle(vditor: LGEditor, show?: boolean): void;
}
