/// <reference types="./types" />
export declare const renderToc: (vditor: LGEditor) => void;
export declare const clickToc: (event: MouseEvent & {
    target: HTMLElement;
}, vditor: LGEditor) => void;
export declare const keydownToc: (blockElement: HTMLElement, vditor: LGEditor, event: KeyboardEvent, range: Range) => boolean;
